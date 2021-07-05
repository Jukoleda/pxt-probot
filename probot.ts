//conexiones
enum conn {
    CON1 = 1,//p8 p0
    CON2,//p12 p1
    CON3,//p16 p2
    CON4,//p6 p3
    CON5,//p7 p4
    CON6,//p9 p10
    CON7,//p13 p14
    CON8//p15 p11
};


enum Names_rgb {
    //% block="Red"
    Red = 0,
    //% block="Green"
    Green,
    //% block="Blue"
    Blue
};

enum Names_colors {
    //% block="White"
    White = 0,
    //% block="Brown"
    Brown,
    //% block="Red"
    Red,
    //% block="Green"
    Green,
    //% block="Blue"
    Blue,
    //% block="Violet"
    Violet,
    //% block="Yellow"
    Yellow,
    //% block="Gray"
    Gray,
    //% block="Black"
    Black,
    //% block="Other"
    Other
}

let valueColors: number [][] = [
    [0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0]
];

//conexiones
/*enum conn_a {
    CON1 = 1,//p8 p0
    CON2,//p12 p1
    CON3,//p16 p2
    CON4,//p6 p3
    CON5,//p7 p4
    CON6,//p9 p10
}*/
//Comentario 1
//puertos de conexion para la interfaz de misladrillos
//si se necesitan analogicos usar getAnalogPin(DP)
// hola estoy haciendo un update......
let digitalCon: any = {
    1: { P0: DigitalPin.P8, P1: DigitalPin.P0 },
    2: { P0: DigitalPin.P12, P1: DigitalPin.P1 },
    3: { P0: DigitalPin.P16, P1: DigitalPin.P2 },
    4: { P0: DigitalPin.P6, P1: DigitalPin.P3 },
    5: { P0: DigitalPin.P7, P1: DigitalPin.P4 },
    6: { P0: DigitalPin.P9, P1: DigitalPin.P10 },
    7: { P0: DigitalPin.P13, P1: DigitalPin.P14 },
    8: { P0: DigitalPin.P15, P1: DigitalPin.P11 }
}

//Analog connectors 1, 2, 3, 4, 5, 6
/*let analogCon: any = {
    1: {P0: AnalogPin.P0}
    ,2: {P0: AnalogPin.P1}
    ,3: {P0: AnalogPin.P2}
    ,4: {P0: AnalogPin.P3}
    ,5: {P0: AnalogPin.P4}
    ,6: {P0: AnalogPin.P10}
}
*/
/*
//puertos de conexion para el gigglebot
let digitalCon: any = {//11 16 10 7
    1: { P0: DigitalPin.P12, P1: DigitalPin.P8 },
    2: { P0: DigitalPin.P16, P1: DigitalPin.P0 }
};
*/
enum DireccionMotor {
    //% block="forward"
    Adelante,
    //% block="backward"
    Atras
}

enum Estados_bicolor {
    //% block="Red"
    Red = 1,
    //% block="Yellow"
    Yellow,
    //% block="Green"
    Green,
    //% block="Turn off"
    Black
}

enum Colors {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}

enum Colors_rgb {
    //% block=red
    Red = 0,
    //% block=green
    Green,
    //% block=blue
    Blue,
    //% block=orange
    Orange,
    //% block=violet
    Violet,
    //% block=cyan
    Cyan,
    //% block=white
    White,
    //% block=black
    Black
}

/**
* Different modes for RGB or RGB+W NeoPixel strips
*/
enum NeoPixelMode {
   // block="RGB (GRB format)"
   RGB = 1,
   // block="RGB+W"
   RGBW = 2,
   // block="RGB (RGB format)"
   RGB_RGB = 3
}
enum HueInterpolationDirection {
       Clockwise,
       CounterClockwise,
       Shortest
}
//% weight=5 color=#ff8000 icon="\uf2db"
//% groups="['Miscellaneous','Leds', 'Motors','Buzzer','Sensors', 'Actuators']"
namespace probots {

    /*************************************************
     * Motors 
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
        //% block="%motor| on direction %dir| speed %speed"
        //% speed.min=0 speed.max=100
        //% group="Motors"
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
        //%block="%motor|turn off"
        //% group="Motors"
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

    //%block="Probot on %cone=conexiones_ret"
    //%blockSetVariable=motor
    //% group="Motors"
    //% weight=100
    export function createMotor(cone: any): Motor {
        let motor = new Motor();
        motor.setpins(cone.P0, cone.P1);
        motor.setVelocity(0);
        return motor;
    }

   



    /*****************************************
     * Music
     *******************************************/
    

    //%block="Play frecuency $frecuencia|by %duracion|ms on %cone=conexiones_ret"
    //%group="Buzzer"
    //% frecuencia.shadow="note_freq"
    export function reproducirTono(frecuencia: number, duracion: number, cone: any): void {
        pins.analogSetPitchPin(cone.P1)
        let frequency = frecuencia < 0 ? 0 : frecuencia;
        let duration = duracion < 0 ? 0 : duracion;
        pins.analogPitch(frequency, duration)
    }

    //%block="Play melody %melodyArray=devuelveMelodia on %cone=conexiones_ret"
    //%group="Buzzer"
    export function beginMelody(melodyArray: string[], cone: any) {
        pins.analogSetPitchPin(cone.P1)
        music.beginMelody(melodyArray, MelodyOptions.Once)
    }
    


    /**
     * 
     * INFRARROJO
     * 
     */
    //%block="Infrared on %cone=conexiones_ret"
    //%group="Sensors"
    // nota* cada conexion tiene dos pines en este caso se lee el de uno solo
    export function infrarrojo(cone: any): number {
        return pins.digitalReadPin(cone.P0);
    }

    
    /*
        LED BICOLOR
    */
    //%block="LED  bicolor on %cone=conexiones_ret| show as %est"
    //%group="Leds"
    export function bicolor(cone: any, est: Estados_bicolor) {
        switch (est) {
            case Estados_bicolor.Black:
                pins.digitalWritePin(cone.P0, 0);
                pins.digitalWritePin(cone.P1, 0);
                break;
            case Estados_bicolor.Red:
                pins.digitalWritePin(cone.P0, 1);
                pins.digitalWritePin(cone.P1, 0);
                break;
            case Estados_bicolor.Yellow:
                pins.digitalWritePin(cone.P0, 1);
                pins.digitalWritePin(cone.P1, 1);
                break;
            case Estados_bicolor.Green:
                pins.digitalWritePin(cone.P0, 0);
                pins.digitalWritePin(cone.P1, 1);
                break;
        }
    }

    

    //%block="Probot on $pin=conexiones_ret| of $cantidad_leds|leds"
    //%cantidad_leds.defl=8
    //%blockSetVariable=leds_neopixel
    //%group="Leds"
    //% weight=100
   export function newStripNeopixel(pin: any, cantidad_leds: number): Strip {
//        export function create(pin: DigitalPin, numleds: number, mode: NeoPixelMode): Strip {
       let strip = new Strip();
       let stride = 3;
       strip.buf = pins.createBuffer(cantidad_leds * stride);
       strip.start = 0;
       strip._length = cantidad_leds;
       strip._mode = NeoPixelMode.RGB || NeoPixelMode.RGB;
       strip._matrixWidth = 0;
       strip.setBrightness(128)
       strip.setPin(pin.P0)
       return strip;
       
   }
  //% block="$leds=variables_get(leds_neopixel)|show color %rgb=Colores" 
   //% group="Leds"
   //% weight=80
   export function showColor(leds: Strip, rgb: Colors) {
       rgb = rgb >> 0;
       setAllRGB(leds, rgb);
       leds.show();
   }
     
    function setAllRGB(leds: Strip, rgb: number) {
        let red = unpackR(rgb);
        let green = unpackG(rgb);
        let blue = unpackB(rgb);

        const br = leds.brightness;
        if (br < 255) {
            red = (red * br) >> 8;
            green = (green * br) >> 8;
            blue = (blue * br) >> 8;
        }
        const end = leds.start + leds._length;
        const stride = leds._mode === NeoPixelMode.RGBW ? 4 : 3;
        for (let i = leds.start; i < end; ++i) {
            setBufferRGB(leds, i * stride, red, green, blue)
        }
    }
    function setBufferRGB(leds: Strip, offset: number, red: number, green: number, blue: number): void {
        if (leds._mode === NeoPixelMode.RGB_RGB) {
            leds.buf[offset + 0] = red;
            leds.buf[offset + 1] = green;
        } else {
            leds.buf[offset + 0] = green;
            leds.buf[offset + 1] = red;
        }
        leds.buf[offset + 2] = blue;
    }
    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
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

    // block="Potentiometer on $con=conexiones_ret"
    // group="Sensors"
    export function potenciometro(con: any): number {
        return pins.analogReadPin(getAnalogPin(con.P1))
    }


    //% block="Light on $con=conexiones_ret"
    //% group="Sensors"
    export function sensorLuz(con: any): number {
        return pins.analogReadPin(getAnalogPin(con.P1))
    }

    //% block="Read $times| times the light on $con=conexiones_ret"
    //% group="Sensors"
    //% times.defl=10
    export function sensorLuz_cantidad(times: number, con: any): number {
        let temp = 0.0;
        let a = 0;
        for(a = 0; a < times; a++){
            temp += pins.analogReadPin(getAnalogPin(con.P1));
        }
        temp /= times;
        return Math.round(temp);
    }


    // block="Buzzer en $con=conexiones_ret"
    export function sensorSonido(con: any): number {
        return pins.analogReadPin(getAnalogPin(con.P1))
    }
    /******************ULTRASONIDO
     */
    //% blockId=sonar_ping block="Ultrasound on %cone=conexiones_ret"
    //% group="Sensors"
    //% inlineInputMode=inline

    export function ping(cone: any): number {
        // send pulse
        let maxCmDistance = 500;
        pins.setPull(cone.P1, PinPullMode.PullNone);
        pins.digitalWritePin(cone.P1, 0);
        control.waitMicros(2);
        pins.digitalWritePin(cone.P1, 1);
        control.waitMicros(10);
        pins.digitalWritePin(cone.P1, 0);
        // read pulse
        const d = pins.pulseIn(cone.P0, PulseValue.High, maxCmDistance * 58);
        return Math.idiv(d, 58);
    }

    //% block="Servo $con=conexiones_ret|degrees |%grados"
    //% group="Motors"
    //% grados.min=0 grados.max=180
    export function servoProbot(con: any, grados: number) {
        return pins.servoWritePin(getAnalogPin(con.P0), grados)
    }

     /*
     * 
     * PULSADOR
     * 
     */
    //%block="Button on %cone=conexiones_ret"
    //%group="Actuators"
    // nota* cada conexion tiene dos pines en este caso se lee el de uno solo
    export function pulsador(cone: any): number {
        return pins.digitalReadPin(cone.P0);
    }
    
     /*
     * 
     * LASER
     * 
     
    //block="LASER en %cone=conexiones_ret"
    //group="Leds"
    // nota* cada conexion tiene dos pines en este caso se lee el de uno solo
    export function laser(cone: any, estado: Estados_laser): number {
        return pins.digitalWritePin(cone.P0, estado);
    }*/

    //% block="%col"
    //% blockId="conexiones_ret"
    //% group="Miscellaneous"
    //% weight=1
    export function conexiones_ret(col: conn): any {
        return digitalCon[col];
    }

    // block="%col"
    // blockId="conexiones_ret_a"
    // group="Miscellaneous"
    // weight=1
    /*export function conexiones_ret_a(col: conn_a): any {
        return analogCon[col];
    }*/

    // blockId="colores_probot" block="%color"
    // group="Miscellaneous"
    // weight=2
    export function colors(color: Colors): number {
        return color;
    }

    //%block="Enable matrix of leds $val"
    //%val.shadow="toggleYesNo"
    //%group="Miscellaneous"
    //% weight=5
    export function activate_leds(val: boolean): void {
        val ? led.enable(true) : led.enable(false)
    }

    //%block="Melody %melodia=Melodies"
    //%blockId=devuelveMelodia
    //%group="Miscellaneous"
    //% weight=3
    export function devuelveMelodia(melodia: Melodies): string[] {
        return music.builtInMelody(melodia)
    }

    //% block="$nota"
    //% blockId=note_freq
    //% shim=TD_ID
    //% color="#ffffff" colorSecondary="#ffffff" colorTertiary="#D83B01"
    //% nota.fieldEditor="note" note.defl="262"
    //% nota.fieldOptions.decompileLiterals=true
    //% useEnumVal=1
    //% group="Miscellaneous"
    //% weight=4
    export function noteFreq(nota: Note): number {
        return nota;
    }
    //based on neopixel extension
    class Strip {
       buf: Buffer;
       pin: DigitalPin;
       // TODO: encode as bytes instead of 32bit
       brightness: number;
       start: number; // start offset in LED strip
       _length: number; // number of LEDs
       _mode: NeoPixelMode;
       _matrixWidth: number; // number of leds in a matrix - if any
       /**
        * Shows all LEDs to a given color (range 0-255 for r, g, b).
        * @param rgb RGB color of the LED
        */
       // blockId="neopixel_set_strip_color" block="%strip|show color %rgb=neopixel_colors"
       // strip.defl=strip
       // weight=85 blockGap=8
       // parts="neopixel"
       showColor(rgb: number) {
           rgb = rgb >> 0;
           this.setAllRGB(rgb);
           this.show();
       }
       /**
        * Shows a rainbow pattern on all LEDs.
        * @param startHue the start hue value for the rainbow, eg: 1
        * @param endHue the end hue value for the rainbow, eg: 360
        */
       // blockId="neopixel_set_strip_rainbow" block="%strip|show rainbow from %startHue|to %endHue"
       // strip.defl=strip
       // weight=85 blockGap=8
       // parts="neopixel"
       showRainbow(startHue: number = 1, endHue: number = 360) {
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
           this.show();
       }
       /**
        * Displays a vertical bar graph based on the `value` and `high` value.
        * If `high` is 0, the chart gets adjusted automatically.
        * @param value current value to plot
        * @param high maximum value, eg: 255
        */
       // weight=84
       // blockId=neopixel_show_bar_graph block="%strip|show bar graph of %value|up to %high"
       // strip.defl=strip
       // icon="\uf080"
       // parts="neopixel"
       showBarGraph(value: number, high: number): void {
           if (high <= 0) {
               this.clear();
               this.setPixelColor(0, Colors.Yellow);
               this.show();
               return;
           }
           value = Math.abs(value);
           const n = this._length;
           const n1 = n - 1;
           let v = Math.idiv((value * n), high);
           if (v == 0) {
               this.setPixelColor(0, 0x666600);
               for (let i = 1; i < n; ++i)
                   this.setPixelColor(i, 0);
           } else {
               for (let i = 0; i < n; ++i) {
                   if (i <= v) {
                       const b = Math.idiv(i * 255, n1);
                       this.setPixelColor(i, rgb(b, 0, 255 - b));
                   }
                   else this.setPixelColor(i, 0);
               }
           }
           this.show();
       }
       /**
        * Set LED to a given color (range 0-255 for r, g, b).
        * You need to call ``show`` to make the changes visible.
        * @param pixeloffset position of the NeoPixel in the strip
        * @param rgb RGB color of the LED
        */
       // blockId="neopixel_set_pixel_color" block="%strip|set pixel color at %pixeloffset|to %rgb=neopixel_colors"
       // strip.defl=strip
       // blockGap=8
       // weight=80
       // parts="neopixel" advanced=true
       setPixelColor(pixeloffset: number, rgb: number): void {
           this.setPixelRGB(pixeloffset >> 0, rgb >> 0);
       }
       /**
        * Sets the number of pixels in a matrix shaped strip
        * @param width number of pixels in a row
        */
       // blockId=neopixel_set_matrix_width block="%strip|set matrix width %width"
       // strip.defl=strip
       // blockGap=8
       // weight=5
       // parts="neopixel" advanced=true
       setMatrixWidth(width: number) {
           this._matrixWidth = Math.min(this._length, width >> 0);
       }
       /**
        * Set LED to a given color (range 0-255 for r, g, b) in a matrix shaped strip
        * You need to call ``show`` to make the changes visible.
        * @param x horizontal position
        * @param y horizontal position
        * @param rgb RGB color of the LED
        */
       // blockId="neopixel_set_matrix_color" block="%strip|set matrix color at x %x|y %y|to %rgb=neopixel_colors"
       // strip.defl=strip
       // weight=4
       // parts="neopixel" advanced=true
       setMatrixColor(x: number, y: number, rgb: number) {
           if (this._matrixWidth <= 0) return; // not a matrix, ignore
           x = x >> 0;
           y = y >> 0;
           rgb = rgb >> 0;
           const cols = Math.idiv(this._length, this._matrixWidth);
           if (x < 0 || x >= this._matrixWidth || y < 0 || y >= cols) return;
           let i = x + y * this._matrixWidth;
           this.setPixelColor(i, rgb);
       }
       /**
        * For NeoPixels with RGB+W LEDs, set the white LED brightness. This only works for RGB+W NeoPixels.
        * @param pixeloffset position of the LED in the strip
        * @param white brightness of the white LED
        */
       // blockId="neopixel_set_pixel_white" block="%strip|set pixel white LED at %pixeloffset|to %white"
       // strip.defl=strip
       // blockGap=8
       // weight=80
       // parts="neopixel" advanced=true
       setPixelWhiteLED(pixeloffset: number, white: number): void {
           if (this._mode === NeoPixelMode.RGBW) {
               this.setPixelW(pixeloffset >> 0, white >> 0);
           }
       }
       /**
        * Send all the changes to the strip.
        */
       // blockId="neopixel_show" block="%strip|show" blockGap=8
       // strip.defl=strip
       // weight=79
       // parts="neopixel"
       show() {
           // only supported in beta
           // ws2812b.setBufferMode(this.pin, this._mode);
           ws2812b.sendBuffer(this.buf, this.pin);
       }
       /**
        * Turn off all LEDs.
        * You need to call ``show`` to make the changes visible.
        */
       // blockId="neopixel_clear" block="%strip|clear"
       // strip.defl=strip
       // weight=76
       // parts="neopixel"
       clear(): void {
           const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
           this.buf.fill(0, this.start * stride, this._length * stride);
       }
       /**
        * Gets the number of pixels declared on the strip
        */
       // blockId="neopixel_length" block="%strip|length" blockGap=8
       // strip.defl=strip
       // weight=60 advanced=true
       length() {
           return this._length;
       }
       /**
        * Set the brightness of the strip. This flag only applies to future operation.
        * @param brightness a measure of LED brightness in 0-255. eg: 255
        */
       // blockId="neopixel_set_brightness" block="%strip|set brightness %brightness" blockGap=8
       // strip.defl=strip
       // weight=59
       // parts="neopixel" advanced=true
       setBrightness(brightness: number): void {
           this.brightness = brightness & 0xff;
       }
       /**
        * Apply brightness to current colors using a quadratic easing function.
        **/
       // blockId="neopixel_each_brightness" block="%strip|ease brightness" blockGap=8
       // strip.defl=strip
       // weight=58
       // parts="neopixel" advanced=true
       easeBrightness(): void {
           const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
           const br = this.brightness;
           const buf = this.buf;
           const end = this.start + this._length;
           const mid = Math.idiv(this._length, 2);
           for (let i = this.start; i < end; ++i) {
               const k = i - this.start;
               const ledoffset = i * stride;
               const br = k > mid
                   ? Math.idiv(255 * (this._length - 1 - k) * (this._length - 1 - k), (mid * mid))
                   : Math.idiv(255 * k * k, (mid * mid));
               const r = (buf[ledoffset + 0] * br) >> 8; buf[ledoffset + 0] = r;
               const g = (buf[ledoffset + 1] * br) >> 8; buf[ledoffset + 1] = g;
               const b = (buf[ledoffset + 2] * br) >> 8; buf[ledoffset + 2] = b;
               if (stride == 4) {
                   const w = (buf[ledoffset + 3] * br) >> 8; buf[ledoffset + 3] = w;
               }
           }
       }
       /**
        * Create a range of LEDs.
        * @param start offset in the LED strip to start the range
        * @param length number of LEDs in the range. eg: 4
        */
       // weight=89
       // blockId="neopixel_range" block="%strip|range from %start|with %length|leds"
       // strip.defl=strip
       // parts="neopixel"
       // blockSetVariable=range
       range(start: number, length: number): Strip {
           start = start >> 0;
           length = length >> 0;
           let strip = new Strip();
           strip.buf = this.buf;
           strip.pin = this.pin;
           strip.brightness = this.brightness;
           strip.start = this.start + Math.clamp(0, this._length - 1, start);
           strip._length = Math.clamp(0, this._length - (strip.start - this.start), length);
           strip._matrixWidth = 0;
           strip._mode = this._mode;
           return strip;
       }
       /**
        * Shift LEDs forward and clear with zeros.
        * You need to call ``show`` to make the changes visible.
        * @param offset number of pixels to shift forward, eg: 1
        */
       // blockId="neopixel_shift" block="%strip|shift pixels by %offset" blockGap=8
       // strip.defl=strip
       // weight=40
       // parts="neopixel"
       shift(offset: number = 1): void {
           offset = offset >> 0;
           const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
           this.buf.shift(-offset * stride, this.start * stride, this._length * stride)
       }
       /**
        * Rotate LEDs forward.
        * You need to call ``show`` to make the changes visible.
        * @param offset number of pixels to rotate forward, eg: 1
        */
       // blockId="neopixel_rotate" block="%strip|rotate pixels by %offset" blockGap=8
       // strip.defl=strip
       // weight=39
       // parts="neopixel"
       rotate(offset: number = 1): void {
           offset = offset >> 0;
           const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
           this.buf.rotate(-offset * stride, this.start * stride, this._length * stride)
       }
       /**
        * Set the pin where the neopixel is connected, defaults to P0.
        */
       // weight=10
       // parts="neopixel" advanced=true
       setPin(pin: DigitalPin): void {
           this.pin = pin;
           pins.digitalWritePin(this.pin, 0);
           // don't yield to avoid races on initialization
       }
       /**
        * Estimates the electrical current (mA) consumed by the current light configuration.
        */
       // weight=9 blockId=neopixel_power block="%strip|power (mA)"
       // strip.defl=strip
       // advanced=true
       power(): number {
           const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
           const end = this.start + this._length;
           let p = 0;
           for (let i = this.start; i < end; ++i) {
               const ledoffset = i * stride;
               for (let j = 0; j < stride; ++j) {
                   p += this.buf[i + j];
               }
           }
           return Math.idiv(this.length() * 7, 10) /* 0.7mA per neopixel */
               + Math.idiv(p * 480, 10000); /* rought approximation */
       }
       private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
           if (this._mode === NeoPixelMode.RGB_RGB) {
               this.buf[offset + 0] = red;
               this.buf[offset + 1] = green;
           } else {
               this.buf[offset + 0] = green;
               this.buf[offset + 1] = red;
           }
           this.buf[offset + 2] = blue;
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
           const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
           for (let i = this.start; i < end; ++i) {
               this.setBufferRGB(i * stride, red, green, blue)
           }
       }
       private setAllW(white: number) {
           if (this._mode !== NeoPixelMode.RGBW)
               return;
           let br = this.brightness;
           if (br < 255) {
               white = (white * br) >> 8;
           }
           let buf = this.buf;
           let end = this.start + this._length;
           for (let i = this.start; i < end; ++i) {
               let ledoffset = i * 4;
               buf[ledoffset + 3] = white;
           }
       }
       private setPixelRGB(pixeloffset: number, rgb: number): void {
           if (pixeloffset < 0
               || pixeloffset >= this._length)
               return;
           let stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
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
       private setPixelW(pixeloffset: number, white: number): void {
           if (this._mode !== NeoPixelMode.RGBW)
               return;
           if (pixeloffset < 0
               || pixeloffset >= this._length)
               return;
           pixeloffset = (pixeloffset + this.start) * 4;
           let br = this.brightness;
           if (br < 255) {
               white = (white * br) >> 8;
           }
           let buf = this.buf;
           buf[pixeloffset + 3] = white;
       }
   }
   function hsl(h: number, s: number, l: number): number {
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
   function rgb(red: number, green: number, blue: number): number {
       return packRGB(red, green, blue);
   }
    
   
    /*
     * 
     * RGB LED
     * 
     */
    //% block="RGB LED on CONN 7 show color %color=colores_rgb"
    //% group="Sensors"
    // nota* cada conexion tiene dos pines en este caso se lee el de uno solo
    export function rgb_led(color: Colors_rgb) {
        switch(color){
            case Colors_rgb.Black: 
                pins.digitalWritePin(DigitalPin.P15, 0);
                pins.digitalWritePin(DigitalPin.P14, 0);
                pins.digitalWritePin(DigitalPin.P13, 0);
                break;
            case Colors_rgb.White: 
                pins.digitalWritePin(DigitalPin.P15, 1);
                pins.digitalWritePin(DigitalPin.P14, 1);
                pins.digitalWritePin(DigitalPin.P13, 1);
                break;
            case Colors_rgb.Red: 
                pins.digitalWritePin(DigitalPin.P15, 1);
                pins.digitalWritePin(DigitalPin.P14, 0);
                pins.digitalWritePin(DigitalPin.P13, 0);
                break;
            case Colors_rgb.Green: 
                pins.digitalWritePin(DigitalPin.P15, 0);
                pins.digitalWritePin(DigitalPin.P14, 1);
                pins.digitalWritePin(DigitalPin.P13, 0);
                break;
            case Colors_rgb.Blue: 
                pins.digitalWritePin(DigitalPin.P15, 0);
                pins.digitalWritePin(DigitalPin.P14, 0);
                pins.digitalWritePin(DigitalPin.P13, 1);
                break;
            case Colors_rgb.Orange: 
                pins.digitalWritePin(DigitalPin.P15, 1);
                pins.digitalWritePin(DigitalPin.P14, 1);
                pins.digitalWritePin(DigitalPin.P13, 0);
                break;
            case Colors_rgb.Violet: 
                pins.digitalWritePin(DigitalPin.P15, 1);
                pins.digitalWritePin(DigitalPin.P14, 0);
                pins.digitalWritePin(DigitalPin.P13, 1);
                break;
            case Colors_rgb.Cyan: 
                pins.digitalWritePin(DigitalPin.P15, 0);
                pins.digitalWritePin(DigitalPin.P14, 1);
                pins.digitalWritePin(DigitalPin.P13, 1);
                break;
            default: break;
        }
        return
    }

    /*
     * 
     * RGB LED
     * 
     */
    //% block="RGB LED on CONN 7 show color %color=colores_rgb by %duracion|ms"
    //% group="Sensors"
    // nota* cada conexion tiene dos pines en este caso se lee el de uno solo
    export function rgb_led_time(color: Colors_rgb, duracion: number) {
        switch(color){
            case Colors_rgb.Black: 
                pins.digitalWritePin(DigitalPin.P15, 0);
                pins.digitalWritePin(DigitalPin.P14, 0);
                pins.digitalWritePin(DigitalPin.P13, 0);
                break;
            case Colors_rgb.White: 
                pins.digitalWritePin(DigitalPin.P15, 1);
                pins.digitalWritePin(DigitalPin.P14, 1);
                pins.digitalWritePin(DigitalPin.P13, 1);
                break;
            case Colors_rgb.Red: 
                pins.digitalWritePin(DigitalPin.P15, 1);
                pins.digitalWritePin(DigitalPin.P14, 0);
                pins.digitalWritePin(DigitalPin.P13, 0);
                break;
            case Colors_rgb.Green: 
                pins.digitalWritePin(DigitalPin.P15, 0);
                pins.digitalWritePin(DigitalPin.P14, 1);
                pins.digitalWritePin(DigitalPin.P13, 0);
                break;
            case Colors_rgb.Blue: 
                pins.digitalWritePin(DigitalPin.P15, 0);
                pins.digitalWritePin(DigitalPin.P14, 0);
                pins.digitalWritePin(DigitalPin.P13, 1);
                break;
            case Colors_rgb.Orange: 
                pins.digitalWritePin(DigitalPin.P15, 1);
                pins.digitalWritePin(DigitalPin.P14, 1);
                pins.digitalWritePin(DigitalPin.P13, 0);
                break;
            case Colors_rgb.Violet: 
                pins.digitalWritePin(DigitalPin.P15, 1);
                pins.digitalWritePin(DigitalPin.P14, 0);
                pins.digitalWritePin(DigitalPin.P13, 1);
                break;
            case Colors_rgb.Cyan: 
                pins.digitalWritePin(DigitalPin.P15, 0);
                pins.digitalWritePin(DigitalPin.P14, 1);
                pins.digitalWritePin(DigitalPin.P13, 1);
                break;
            default: break;
        }
        basic.pause(duracion);
        return
    }

    function isInRange(toEval: number, centralValue: number, offset: number): boolean{
        return ((toEval < centralValue + offset) && (toEval > centralValue - offset));
    }




    function getColorString(color: number): string{
        switch(color){
            case 8: return "Black"; break;
            case 4: return "Blue"; break;
            case 1: return "Brown"; break;
            case 0: return "White"; break;
            case 5: return "Violet"; break;
            case 2: return "Red"; break;
            case 3: return "Green"; break;
            case 7: return "Gray"; break;
            case 6: return "Yellow"; break;
            default: return "N"; break;
        }
    }
  

    const ADDR = 0x39;
    const APDS9960_ENABLE = 0x80;
    const APDS9960_ATIME = 0x81;
    const APDS9960_CONTROL = 0x8F;
    const APDS9960_STATUS = 0x93;
    const APDS9960_CDATAL = 0x94;
    const APDS9960_RDATAL = 0x96;
    const APDS9960_GDATAL = 0x98;
    const APDS9960_BDATAL = 0x9A;
    const APDS9960_GCONF4 = 0xAB;
    const APDS9960_AICLEAR = 0xE7;


    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }
    
    function rgb2hue(r: number, g: number, b: number): number {
        // no float support for pxt ts
        r = (r * 100) / 255;
        g = (g * 100) / 255;
        b = (b * 100) / 255;
        let max = Math.max(r, Math.max(g, b));
        let min = Math.min(r, Math.min(g, b));
        
        if(min == max) return 0;

        let c = (max - min);
        let segment;
        let hue;
        switch (max) {
            case r:
                segment = (g - b) * 100 / c;
                hue = segment;
                break;
            case g:
                segment = (b - r) * 100 / c;
                hue = segment + 200;
                break;
            case b:
                segment = (r - g) * 100 / c;
                hue = segment + 400;
                break;
        }

        
        hue = hue * 60;
        hue = hue < 0 ? 360 - hue : hue;
        return hue / 100;
    }

    //% blockId=apds9960_init block="Init Color Sensor on %pin=conexiones_ret"
    //% group="Sensors"
    export function initColorSensor(pin: any): void {
        //init ws2812b rgb led
        let strip = new Strip();
        strip.buf = pins.createBuffer(3);
        strip.start = 0;
        strip._length = 1;
        strip._mode = NeoPixelMode.RGB || NeoPixelMode.RGB;
        strip._matrixWidth = 0;
        strip.setBrightness(32);
        strip.setPin(pin.P0);

        setAllRGB(strip, 0xFFFFFF >> 0);
        strip.show();



        i2cwrite(ADDR, APDS9960_ATIME, 252) // default inte time 4x2.78ms
        i2cwrite(ADDR, APDS9960_CONTROL, 0x03) // todo: make gain adjustable
        i2cwrite(ADDR, APDS9960_ENABLE, 0x00) // put everything off
        i2cwrite(ADDR, APDS9960_GCONF4, 0x00) // disable gesture mode
        i2cwrite(ADDR, APDS9960_AICLEAR, 0x00) // clear all interrupt
        // power on
        i2cwrite(ADDR, APDS9960_ENABLE, 0x01) // clear all interrupt
        let tmp = i2cread(ADDR, APDS9960_ENABLE) | 0x2;
        i2cwrite(ADDR, APDS9960_ENABLE, tmp);
    }



    export function hslToString(): string {
        let tmp = i2cread(ADDR, APDS9960_STATUS) & 0x1;
        while(!tmp){
            basic.pause(5);
            tmp = i2cread(ADDR, APDS9960_STATUS) & 0x1;
        }
        return rgbToHsl(i2cread(ADDR, APDS9960_RDATAL), i2cread(ADDR, APDS9960_GDATAL), i2cread(ADDR, APDS9960_BDATAL)) + " C: " + i2cread(ADDR, APDS9960_RDATAL);

    }


    function rgbToHsl(red: number, green: number, blue: number): string{

        red = red / 255;
        green = green / 255;
        blue = blue / 255;

        let max = Math.max(red, Math.max(green, blue));
        let min = Math.min(red, Math.min(green, blue));
        let c = (max - min);
        let h, s, l = (max + min) / 2;
        
        if(min == max){
            h = s = 0;

        return h+"e"+s+"e"+l;
        }



        s = l > 0.5 ? c / (2 - max - min) : c / (max + min);

        switch(max) {
            case red: 
                h = (green - blue) / c + (green < blue ? 6 : 0) ;
                break;
            case green: 
                h = (blue - red) / c + 2;
                break;
            case blue: 
                h = (red- green) / c + 4;
                break;
        }
        h *= 60;
        h = h < 0 ? h + 360 : h;
        s *= 100;
        l *= 100;
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);
        return h+"e"+s+"e"+l;
        }

        // blockId=apds9960_leerColores block="APDS9960 Obtener Color Texto"
        // weight=98
        export function getColorHSL(): string
        {
            let tmp = i2cread(ADDR, APDS9960_STATUS) & 0x1;
            while(!tmp){
                basic.pause(5);
                tmp = i2cread(ADDR, APDS9960_STATUS) & 0x1;
            }
            let hsl = rgbToHsl(i2cread(ADDR, APDS9960_RDATAL), i2cread(ADDR, APDS9960_GDATAL), i2cread(ADDR, APDS9960_BDATAL));
            let hsl_ = hsl.split("e");
            let h = 0, s = 0, l = 0;
            h = +hsl_[0];
            s = +hsl_[1];
            l = +hsl_[2];
            if(l < 10) return "Negro";
            //165 40 70
            if(l < 75 && l > 35 && s < 45 && s > 28 && h < 170 && h > 0) return "Amarillo";
            //221 45 77
            if(l < 82 && l > 60 && s < 50 && s > 30 && h < 226 && h > 208) return "Blanco";
            //350 40 50
            if(l < 55 && l > 18 && s < 45 && s > 35 && h < 355 && h > 340) return "Rojo";
            //157 30 35
            if(l < 40 && l > 10 && s < 40 && s > 25 && h < 170 && h > 152) return "Verde";
            //210 60 60
            if(l < 65 && l > 20 && s < 65 && s > 48 && h < 220 && h > 200) return "Azul";
            //355 15 22
            if(l < 27 && l > 0 && s < 20 && s > 5 && h < 360 && h > 330) return "Marron";
            //340 25 40
            if(l < 45 && l > 10 && s < 30 && s > 20 && h < 345 && h > 320) return "Violeta";
            if(l < 15 && s < 20) return "Gris";
            return "Desconocido";
        }

        function btw(eval: number, min: number, max: number) {
            if(max < min) return (eval <= min && eval >= max);
            return (eval <= max && eval >= min);
        }

        //% blockId=apds9960_readColor block="Read Color (I2C)"
        //% group="Sensors"
        export function getSensedColorValue(): Names_colors
        {
            let tmp = i2cread(ADDR, APDS9960_STATUS) & 0x1;
            while(!tmp){
                basic.pause(5);
                tmp = i2cread(ADDR, APDS9960_STATUS) & 0x1;
            }
            
            //return "R: "+i2cread(ADDR, APDS9960_RDATAL)+", G: "+i2cread(ADDR, APDS9960_GDATAL)+", B: "+i2cread(ADDR, APDS9960_BDATAL);
            //return rgbToHsl(i2cread(ADDR, APDS9960_RDATAL), i2cread(ADDR, APDS9960_GDATAL), i2cread(ADDR, APDS9960_BDATAL));
            let hsl = rgbToHsl(i2cread(ADDR, APDS9960_RDATAL), i2cread(ADDR, APDS9960_GDATAL), i2cread(ADDR, APDS9960_BDATAL));
            let hsl_ = hsl.split("e");
            let h = 0, s = 0, l = 0;
            h = +hsl_[0];
            s = +hsl_[1];
            l = +hsl_[2];
            if((btw(h, 262, 275) && (btw(s, 35, 55) || btw(s, 79, 85)) && btw(l, 84, 95)) || ((btw(h, 125, 135) || (btw(h, 50, 60)) && btw(s, 90, 103) && btw(l, 45, 55)))) return Names_colors.Yellow;
            if(btw(h, 108, 140) && btw(s, 65, 90) && btw(l, 39, 57)) return Names_colors.White;
            if(btw(l, 50, 60) && btw(s, 44, 67) && btw(h, 320, 335)) return Names_colors.Red;
            if(btw(l, 25, 60) && btw(s, 45, 70) && btw(h, 185, 197)) return Names_colors.Green;
            if(btw(l, 36, 47) && btw(s, 50, 60) && btw(h, 129, 157)) return Names_colors.Blue;
            //if(l < 50 && l > 4 && s < 31 && s > 20) return Names_colors.Brown;
            //if(l < 37 && l > 8 && s < 45 && s > 35 && h < 345 && h > 339) return Names_colors.Violet;
            if(((btw(l, 20, 33) || btw(l, 54, 62)) && (btw(s, 36, 46) || btw(s, 57, 73)) && btw(h, 215, 225)) || (btw(h, 90, 102) && (btw(s, 69, 73) || btw(s, 55, 65)) && btw(l, 37, 49))) return Names_colors.Black;
            if((btw(s, 80, 105) && btw(l, 60, 75)) || (btw(s, 60, 80) && btw(l, 45, 60))) return Names_colors.Gray;
            return Names_colors.Other;
        }

    //% block="%col"
    //% blockId="colors_ret"
    //% group="Miscellaneous"
    export function colors_ret(col: Names_colors): any {
        switch(col)
        {
            case Names_colors.White: return Names_colors.White; break;
            case Names_colors.Red: return Names_colors.Red; break;
            case Names_colors.Blue: return Names_colors.Blue; break;
            case Names_colors.Green: return Names_colors.Green; break;
            case Names_colors.Yellow: return Names_colors.Yellow; break;
            case Names_colors.Brown: return Names_colors.Brown; break;
            case Names_colors.Gray: return Names_colors.Gray; break;
            case Names_colors.Violet: return Names_colors.Violet; break;
            default: return Names_colors.Black; break;
        }
    }

}


