

//conexiones
enum conn {
    CON1 = 1,//p11 p16
    CON2,//p10 p7
    CON3,//p13 p5
    CON4,//p8 p6
    CON5,//p9 p0
    CON6,//p15 p4
    CON7,//p3 p1
    CON8//p2 p14
}
/*

//puertos de conexion para la interfaz de misladrillos
//si se necesitan analogicos usar getAnalogPin(DP)
let digitalCon:any = {
    1: { P0: DigitalPin.P11, P1: DigitalPin.P16 },
    2: { P0: DigitalPin.P10, P1: DigitalPin.P7 },
    3: { P0: DigitalPin.P13, P1: DigitalPin.P5 },
    4: { P0: DigitalPin.P8, P1: DigitalPin.P6 },
    5: { P0: DigitalPin.P9, P1: DigitalPin.P0 },
    6: { P0: DigitalPin.P15, P1: DigitalPin.P4 },
    7: { P0: DigitalPin.P3, P1: DigitalPin.P1 },
    8: { P0: DigitalPin.P2, P1: DigitalPin.P14 }
}
*/

//puertos de conexion para el gigglebot
let digitalCon: any = {//11 16 10 7
    1: { P0: DigitalPin.P12, P1: DigitalPin.P8 },
    2: { P0: DigitalPin.P16, P1: DigitalPin.P0 }
};
enum DireccionMotor {
    //% block="adelante"
    Adelante,
    //% block="atras"
    Atras
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
//% groups="['Miscelaneo','Leds', 'Motores','Buzzer','Ultrasonido']"
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
        //% group="Leds"
        showColor(rgb: number) {
            rgb = rgb >> 0;
            this.setAllRGB(rgb);
            this.mostrar();
        }
        //%block="%tira_de_leds| mostrar"
        //% group="Leds"
        mostrar() {
            ws2812bj.sendBuffer(this.buf, this.pin);
        }

        //%block="%tira_de_leds| limpiar"
        //% group="Leds"
        limpiar() {
            const stride = 3;
            this.buf.fill(0, this.start * stride, this._length * stride);
        }

        //%block="%tira_de_leds|mostrar arcoiris de %startHue|a %endHue"
        //%startHue.defl=1
        //%endHue.defl=300
        //% group="Leds"
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
    //% group="Leds"
    export function colores(col: Colores): number {
        return col;
    }


    //%block="probot con conexion en el pin %pin| de %leds leds"
    //% leds.defl=8
    //%blockSetVariable=tira_de_leds
    //% group="Leds"
    export function crear(pin: DigitalPin, leds: number): TiraDeLeds {
        let tira = new TiraDeLeds();
        let stride = 3;
        tira.buf = pins.createBuffer(leds * stride);
        tira.start = 0;
        tira._length = leds;
        tira._mode = 0;
        tira.setBrightness(128);
        tira.setPin(pin);
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


    export class Motor {
        pin1: DigitalPin;
        pina1: AnalogPin;
        pin2: DigitalPin;
        pina2: AnalogPin;
        velocity: number;
        setVelocity(vel: number): void {
            let OutputVal = Math.clamp(0, 100, vel) * 10;
            this.velocity = OutputVal;
        }
        setpins(pin1: DigitalPin, pin2: DigitalPin): void {
            this.pin1 = pin1;
            this.pina1 = getAnalogPin(pin1);
            this.pin2 = pin2;
            this.pina2 = getAnalogPin(pin2);
        }

        //% weight=50
        //% block="%motor| con direccion %dir| velocidad %speed"
        //% speed.min=0 speed.max=100
        //% group="Motores"
        motorOn(dir: DireccionMotor, speed: number): void {
            this.setVelocity(speed);
            switch (dir) {
                case DireccionMotor.Adelante:
                    pins.analogWritePin(this.pina1, this.velocity);
                    pins.digitalWritePin(this.pin2, 0);
                    break
                case DireccionMotor.Atras:
                    pins.analogWritePin(this.pina2, this.velocity);
                    pins.digitalWritePin(this.pin1, 0);
                    break
            }


        }
        //%block="%motor|apagar"
        //% group="Motores"
        //% weight=20
        motorOff(): void {
            pins.digitalWritePin(this.pin1, 0);
            pins.digitalWritePin(this.pin2, 0);
        }
    }
    function getAnalogPin(pin: DigitalPin): any {
        switch (pin) {
            case DigitalPin.P0:
                return AnalogPin.P0;
                break;
            case DigitalPin.P1:
                return AnalogPin.P1;
                break;
            case DigitalPin.P2:
                return AnalogPin.P2;
                break;
            case DigitalPin.P3:
                return AnalogPin.P3;
                break;
            case DigitalPin.P4:
                return AnalogPin.P4;
                break;
            case DigitalPin.P5:
                return AnalogPin.P5;
                break;
            case DigitalPin.P6:
                return AnalogPin.P6;
                break;
            case DigitalPin.P7:
                return AnalogPin.P7;
                break;
            case DigitalPin.P8:
                return AnalogPin.P8;
                break;
            case DigitalPin.P9:
                return AnalogPin.P9;
                break;
            case DigitalPin.P10:
                return AnalogPin.P10;
                break;
            case DigitalPin.P11:
                return AnalogPin.P11;
                break;
            case DigitalPin.P12:
                return AnalogPin.P12;
                break;
            case DigitalPin.P13:
                return AnalogPin.P13;
                break;
            case DigitalPin.P14:
                return AnalogPin.P14;
                break;
            case DigitalPin.P15:
                return AnalogPin.P15;
                break;
            case DigitalPin.P16:
                return AnalogPin.P16;
                break;
            case DigitalPin.P19:
                return AnalogPin.P19;
                break;
            case DigitalPin.P20:
                return AnalogPin.P20;
                break;
        }
    }

    //%block="Probot en %cone=conexiones_ret"
    //%blockSetVariable=motor
    //% group="Motores"
    //% weight=100
    export function createMotor(cone: any): Motor {
        let motor = new Motor();
        motor.setpins(cone.P0, cone.P1);
        motor.setVelocity(0);
        return motor;
    }

    //%block="%col"
    //%blockId="conexiones_ret"
    //% group="Motores"
    export function conexiones_ret(col: conn): any {
        return digitalCon[col];
    }





    /*****************************************
     * Musica
     *******************************************/
    //% block="reproducir frecuencia %frecuencia|por %duracion|ms"
    //% group="Buzzer"
    export function reproducirTono(frecuencia: number, duracion: number): void {
        pins.analogSetPitchPin(AnalogPin.P0)
        let frequency = frecuencia < 0 ? 0 : frecuencia;
        let duration = duracion < 0 ? 0 : duracion;
        pins.analogPitch(frequency, duration)
    }
    enum PingUnit {
        //% block="μs"
        MicroSeconds,
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches
    }

    //******************ULTRASONIDO
    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId=sonar_ping block="ping trig %trig|echo %echo|unit %unit"
    //% group="Ultrasonido"
    //% inlineInputMode=inline
    //%blockSetVariable=distancia
    export function ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d;
        }
    }

}
