

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
}
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

/*
//puertos de conexion para el gigglebot
let digitalCon: any = {//11 16 10 7
    1: { P0: DigitalPin.P12, P1: DigitalPin.P8 },
    2: { P0: DigitalPin.P16, P1: DigitalPin.P0 }
};
*/
enum DireccionMotor {
    //% block="adelante"
    Adelante,
    //% block="atras"
    Atras
}

enum Estados_bicolor {
    Rojo = 1,
    Amarillo,
    Verde,
    Apagado
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
//% groups="['Miscelaneo','Leds', 'Motores','Sonido','Sensores', 'Actuadores']"
namespace probots {

    /*************************************************
     * motores 
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

   



    /*****************************************
     * Musica
     *******************************************/
    

    //%block="reproducir frecuencia $frecuencia|por %duracion|ms en %cone=conexiones_ret"
    //%group="Sonido"
    //% frecuencia.shadow="note_freq"
    export function reproducirTono(frecuencia: number, duracion: number, cone: any): void {
        pins.analogSetPitchPin(cone.P1)
        let frequency = frecuencia < 0 ? 0 : frecuencia;
        let duration = duracion < 0 ? 0 : duracion;
        pins.analogPitch(frequency, duration)
    }

    //%block="reproducir melodia %melodyArray=devuelveMelodia en %cone=conexiones_ret"
    //%group="Sonido"
    export function beginMelody(melodyArray: string[], cone: any) {
        pins.analogSetPitchPin(cone.P1)
        music.beginMelody(melodyArray, MelodyOptions.Once)
    }
    


    /**
     * 
     * INFRARROJO
     * 
     */
    //%block="Infrarrojo en %cone=conexiones_ret"
    //%group="Sensores"
    // nota* cada conexion tiene dos pines en este caso se lee el de uno solo
    export function infrarrojo2(cone: any): number {
        return pins.digitalReadPin(cone.P0);
    }

    /*
        LED BICOLOR
    */
    //%block="LED  bicolor en %cone=conexiones_ret| mostrar como %est"
    //%group="Leds"
    export function bicolor(cone: any, est: Estados_bicolor) {
        switch (est) {
            case Estados_bicolor.Apagado:
                pins.digitalWritePin(cone.P0, 0);
                pins.digitalWritePin(cone.P1, 0);
                break;
            case Estados_bicolor.Rojo:
                pins.digitalWritePin(cone.P0, 1);
                pins.digitalWritePin(cone.P1, 0);
                break;
            case Estados_bicolor.Amarillo:
                pins.digitalWritePin(cone.P0, 1);
                pins.digitalWritePin(cone.P1, 1);
                break;
            case Estados_bicolor.Verde:
                pins.digitalWritePin(cone.P0, 0);
                pins.digitalWritePin(cone.P1, 1);
                break;
        }
    }

    

    //%block="Probot en $pin=conexiones_ret| de $cantidad_leds|leds"
    //%cantidad_leds.defl=8
    //%blockSetVariable=leds_neopixel
    //%group="Leds"
    //% weight=100
    export function newStripNeopixel(pin: any, cantidad_leds: number): neopixel.Strip {
        return neopixel.create(pin.P0, cantidad_leds, NeoPixelMode.RGB)
    }
   //% block="$leds=variables_get(leds_neopixel)|mostrar color %rgb=colores_probot" 
    //% group="Leds"
    //% weight=80
    export function showColor(leds: neopixel.Strip, rgb: number) {
        rgb = rgb >> 0;
        setAllRGB(leds, rgb);
        leds.show();
    }

   
    function setAllRGB(leds: neopixel.Strip, rgb: number) {
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
    function setBufferRGB(leds: neopixel.Strip, offset: number, red: number, green: number, blue: number): void {
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

    // block="Potenciometro en $con=conexiones_ret"
    // group="Sensores"
    export function potenciometro(con: any): number {
        return pins.analogReadPin(getAnalogPin(con.P1))
    }


    // block="Luz en $con=conexiones_ret"
    // group="Sensores"

    export function sensorLuz(con: any): number {
        return pins.analogReadPin(getAnalogPin(con.P1))
    }

    // block="Sonido en $con=conexiones_ret"
    export function sensorSonido(con: any): number {
        return pins.analogReadPin(getAnalogPin(con.P1))
    }
    /******************ULTRASONIDO
     */
    //% blockId=sonar_ping block="Ultrasonido en %cone=conexiones_ret"
    //% group="Sensores"
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

    // block="Servo $con=conexiones_ret|grados |%grados"
    // group="Motores"
    // grados.min=0 grados.max=180
    export function servoProbot(con: any, grados: number) {
        return pins.servoWritePin(getAnalogPin(con.P0), grados)
    }

     /*
     * 
     * PULSADOR
     * 
     */
    //%block="Pulsador en %cone=conexiones_ret"
    //%group="Actuadores"
    // nota* cada conexion tiene dos pines en este caso se lee el de uno solo
    export function pulsador(cone: any): number {
        return pins.digitalReadPin(cone.P0);
    }
    
     /*
     * 
     * LASER
     * 
     
    //%block="LASER en %cone=conexiones_ret"
    //%group="Leds"
    // nota* cada conexion tiene dos pines en este caso se lee el de uno solo
    export function laser(cone: any, estado: Estados_laser): number {
        return pins.digitalWritePin(cone.P0, estado);
    }*/

     //%block="%col"
    //%blockId="conexiones_ret"
    //% group="Miscelaneo"
    //% weight=1
    export function conexiones_ret(col: conn): any {
        return digitalCon[col];
    }

     //% blockId="colores_probot" block="%color"
    //% group="Miscelaneo"
    //% weight=2
    export function colors(color: Colores): number {
        return color;
    }

    //%block="Matriz de leds activada $val"
    //%val.shadow="toggleYesNo"
    //%group="Miscelaneo"
    //% weight=5
    export function activate_leds(val: boolean): void {
        val ? led.enable(true) : led.enable(false)
    }

    //%block="melodia %melodia=Melodies"
    //%blockId=devuelveMelodia
    //%group="Miscelaneo"
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
    //% group="Miscelaneo"
    //% weight=4
    export function noteFreq(nota: Note): number {
        return nota;
    }
}




