//8687e8971829197f061e37697a1c7a831fab1701
enum conn {
    CON1,
    CON2,
    CON3,
    CON4,
    CON5,
    CON6,
    CON7,
    CON8
}
enum DireccionMotor {
    //% block="adelante"
    Adelante,
    //% block="atras"
    Atras
}
enum Motores {
    //% block="motor 1"
    Motor1,
    //% block="motor 2"
    Motor2
}
enum Colores {
    //% block=rojo
    Red1 = 0xFF0000,
    //% block=naranja
    Orange1 = 0xFFA500,
    //% block=amarillo
    Yellow1 = 0xFFFF00,
    //% block=verde
    Green1 = 0x00FF00,
    //% block=azul
    Blue1 = 0x0000FF,
    //% block=violeta
    Violet1 = 0x8a2be2,
    //% block=purpura
    Purple1 = 0xFF00FF,
    //% block=blanco
    White1 = 0xFFFFFF,
    //% block=negro
    Black1 = 0x000000
}

//% weight=5 color=#ff8000 icon="\uf2db"
//% groups="['NeoPixel', 'Kitronik','Music']"
namespace probot {

    export class TiraDeLeds {
        buf: Buffer;
        pin: DigitalPin;
        // TODO: encode as bytes instead of 32bit
        brightness: number;
        start: number; // start offset in LED strip
        _length: number; // number of LEDs
        _mode: 0;

        //%block="%tira_de_leds| mostrar color %rgb=colores_probot"
        //% group="NeoPixel"
        showColor(rgb: number) {
            rgb = rgb >> 0;
            this.setAllRGB(rgb);
            this.mostrar();
        }
        //%block="%tira_de_leds| mostrar"
        //% group="NeoPixel"
        mostrar() {
            ws2812b.sendBuffer(this.buf, this.pin);
        }

        //%block="%tira_de_leds| limpiar"
        //% group="NeoPixel"
        limpiar() {
            const stride = 3;
            this.buf.fill(0, this.start * stride, this._length * stride);
        }

        //%block="%tira_de_leds|mostrar arcoiris de %startHue|a %endHue"
        //%startHue.defl=1
        //%endHue.defl=300
        //% group="NeoPixel"
        mostrarArcoiris(startHue: number, endHue: number) {
            if (this._length <= 0) return;

            startHue = startHue >> 0;
            endHue = endHue >> 0;
            const saturation = 100;
            const luminance = 50;
            const steps = this._length;
            const direction = HueInterpolationDirection.Clockwise;

            //hue
            const h1 = startHue;
            const h2 = endHue;
            const hDistCW = ((h2 + 360) - h1) % 360;
            const hStepCW = Math.idiv((hDistCW * 100), steps);
            const hDistCCW = ((h1 + 360) - h2) % 360;
            const hStepCCW = Math.idiv(-(hDistCCW * 100), steps);
            let hStep: number;
            if (direction === HueInterpolationDirection.Clockwise) {
                hStep = hStepCW;
            } else if (direction === HueInterpolationDirection.CounterClockwise) {
                hStep = hStepCCW;
            } else {
                hStep = hDistCW < hDistCCW ? hStepCW : hStepCCW;
            }
            const h1_100 = h1 * 100; //we multiply by 100 so we keep more accurate results while doing interpolation

            //sat
            const s1 = saturation;
            const s2 = saturation;
            const sDist = s2 - s1;
            const sStep = Math.idiv(sDist, steps);
            const s1_100 = s1 * 100;

            //lum
            const l1 = luminance;
            const l2 = luminance;
            const lDist = l2 - l1;
            const lStep = Math.idiv(lDist, steps);
            const l1_100 = l1 * 100

            //interpolate
            if (steps === 1) {
                this.setPixelColor(0, hsl(h1 + hStep, s1 + sStep, l1 + lStep))
            } else {
                this.setPixelColor(0, hsl(startHue, saturation, luminance));
                for (let i = 1; i < steps - 1; i++) {
                    const h = Math.idiv((h1_100 + i * hStep), 100) + 360;
                    const s = Math.idiv((s1_100 + i * sStep), 100);
                    const l = Math.idiv((l1_100 + i * lStep), 100);
                    this.setPixelColor(i, hsl(h, s, l));
                }
                this.setPixelColor(steps - 1, hsl(endHue, saturation, luminance));
            }
            this.mostrar();
        }
        setPixelColor(pixeloffset: number, rgb: number): void {
            this.setPixelRGB(pixeloffset >> 0, rgb >> 0);
        }
        private setPixelRGB(pixeloffset: number, rgb: number): void {
            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            let stride = 3;
            pixeloffset = (pixeloffset + this.start) * stride;

            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            let br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            this.setBufferRGB(pixeloffset, red, green, blue)
        }
        private setAllRGB(rgb: number) {
            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            const br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            const end = this.start + this._length;
            const stride = 3;
            for (let i = this.start; i < end; ++i) {
                this.setBufferRGB(i * stride, red, green, blue)
            }
        }
        private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
            this.buf[offset + 0] = green;
            this.buf[offset + 1] = red;
            this.buf[offset + 2] = blue;
        }

        setPin(pin: DigitalPin): void {
            this.pin = pin;
            pins.digitalWritePin(this.pin, 0);
        }
        setBrightness(brightness: number): void {
            this.brightness = brightness & 0xff;
        }

    }
    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    function unpackG(rgb: number): number {
        let g = (rgb >> 8) & 0xFF;
        return g;
    }
    function unpackB(rgb: number): number {
        let b = (rgb) & 0xFF;
        return b;
    }

    //%block="%col"
    //%blockId="colores_probot"
    //% group="NeoPixel"
    export function colores(col: Colores): number {
        return col;
    }


    //%block="probot en puerto %con| de %leds leds"
    //% leds.defl=24
    //%blockSetVariable=tira_de_leds
    //% group="NeoPixel"
    export function crear(con: conn, leds: number): TiraDeLeds {
        let tira = new TiraDeLeds();
        let stride = 3;
        tira.buf = pins.createBuffer(leds * stride);
        tira.start = 0;
        tira._length = leds;
        tira._mode = 0;
        tira.setBrightness(128);
        tira.setPin(DigitalPin.P0);
        return tira;
    }
    export function hsl(h: number, s: number, l: number): number {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);

        h = h % 360;
        s = Math.clamp(0, 99, s);
        l = Math.clamp(0, 99, l);
        let c = Math.idiv((((100 - Math.abs(2 * l - 100)) * s) << 8), 10000); //chroma, [0,255]
        let h1 = Math.idiv(h, 60);//[0,6]
        let h2 = Math.idiv((h - h1 * 60) * 256, 60);//[0,255]
        let temp = Math.abs((((h1 % 2) << 8) + h2) - 256);
        let x = (c * (256 - (temp))) >> 8;//[0,255], second largest component of this color
        let r$: number;
        let g$: number;
        let b$: number;
        if (h1 == 0) {
            r$ = c; g$ = x; b$ = 0;
        } else if (h1 == 1) {
            r$ = x; g$ = c; b$ = 0;
        } else if (h1 == 2) {
            r$ = 0; g$ = c; b$ = x;
        } else if (h1 == 3) {
            r$ = 0; g$ = x; b$ = c;
        } else if (h1 == 4) {
            r$ = x; g$ = 0; b$ = c;
        } else if (h1 == 5) {
            r$ = c; g$ = 0; b$ = x;
        }
        let m = Math.idiv((Math.idiv((l * 2 << 8), 100) - c), 2);
        let r = r$ + m;
        let g = g$ + m;
        let b = b$ + m;
        return packRGB(r, g, b);
    }
    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }
    export enum HueInterpolationDirection {
        Clockwise,
        CounterClockwise,
        Shortest
    }
    /*************************************************
     * 
     * motores 
     * El motor uno usa el pin 8(analogo) y 12(digital)
     * El motor dos usa el pin 0(analogo) y 16(digital)
     ******************************************************/


    //% block="%motor| con direccion %dir| velocidad %speed"
    //% speed.min=0 speed.max=100
    //% group="Kitronik"
    export function motorOn(motor: Motores, dir: DireccionMotor, speed: number): void {
        let OutputVal = Math.clamp(0, 100, speed) * 10;

        switch (motor) {
            case Motores.Motor1: /*Motor 1 uses Pins 8 and 12*/
                switch (dir) {
                    case DireccionMotor.Adelante:
                        pins.analogWritePin(AnalogPin.P8, OutputVal);
                        pins.digitalWritePin(DigitalPin.P12, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
                        break
                    case DireccionMotor.Atras:
                        pins.analogWritePin(AnalogPin.P12, OutputVal);
                        pins.digitalWritePin(DigitalPin.P8, 0);
                        break
                }

                break;
            case Motores.Motor2: /*Motor 2 uses Pins 0 and 16*/
                switch (dir) {
                    case DireccionMotor.Adelante:
                        pins.analogWritePin(AnalogPin.P0, OutputVal);
                        pins.digitalWritePin(DigitalPin.P16, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
                        break
                    case DireccionMotor.Atras:
                        pins.analogWritePin(AnalogPin.P16, OutputVal);
                        pins.digitalWritePin(DigitalPin.P0, 0);
                        break
                }

                break;
        }
    }

    //%block="apagar motor %motor"
    //% group="Kitronik"
    export function motorOff(motor: Motores): void {
        switch (motor) {
            case Motores.Motor1:
                pins.digitalWritePin(DigitalPin.P8, 0);
                pins.digitalWritePin(DigitalPin.P12, 0);
                break
            case Motores.Motor2:
                pins.digitalWritePin(DigitalPin.P0, 0);
                pins.digitalWritePin(DigitalPin.P16, 0);
                break
        }
    }

    /*****************************************
     * Musica
     *******************************************/
    //% block="reproducir frecuencia %frecuencia|por %duracion|ms"
    //% group="Music"
    export function reproducirTono(frecuencia: number, duracion: number): void {
        pins.analogSetPitchPin(AnalogPin.P0)
        let frequency = frecuencia < 0 ? 0 : frecuencia;
        let duration = duracion < 0 ? 0 : duracion;
        pins.analogPitch(frequency, duration)
    }

}
