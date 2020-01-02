

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
//Comentario 1
//puertos de conexion para la interfaz de misladrillos
//si se necesitan analogicos usar getAnalogPin(DP)
let digitalCon: any = {
    1: { P0: DigitalPin.P11, P1: DigitalPin.P16 },
    2: { P0: DigitalPin.P10, P1: DigitalPin.P7 },
    3: { P0: DigitalPin.P13, P1: DigitalPin.P5 },
    4: { P0: DigitalPin.P8, P1: DigitalPin.P6 },
    5: { P0: DigitalPin.P9, P1: DigitalPin.P0 },
    6: { P0: DigitalPin.P15, P1: DigitalPin.P4 },
    7: { P0: DigitalPin.P3, P1: DigitalPin.P1 },
    8: { P0: DigitalPin.P2, P1: DigitalPin.P14 }
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
//sadasdasd
//% weight=5 color=#ff8000 icon="\uf2db"
//% groups="['Miscelaneo','Leds', 'Motores','Buzzer','Sensores']"
namespace probot {

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

    //%block="%col"
    //%blockId="conexiones_ret"
    //% group="Miscelaneo"
    export function conexiones_ret(col: conn): any {
        return digitalCon[col];
    }




    /*****************************************
     * Musica
     *******************************************/
    //% block="$nota"
    //% blockId=note_freq
    //% shim=TD_ID
    //% color="#ffffff" colorSecondary="#ffffff" colorTertiary="#D83B01"
    //% nota.fieldEditor="note" note.defl="262"
    //% nota.fieldOptions.decompileLiterals=true
    //% useEnumVal=1
    //% group="Miscelaneo"
    export function noteFreq(nota: Note): number {
        return nota;
    }

    //%block="reproducir frecuencia $frecuencia|por %duracion|ms en %cone=conexiones_ret"
    //%group="Buzzer"
    //% frecuencia.shadow="note_freq"
    export function reproducirTono(frecuencia: number, duracion: number, cone: any): void {
        pins.analogSetPitchPin(cone.P1)
        let frequency = frecuencia < 0 ? 0 : frecuencia;
        let duration = duracion < 0 ? 0 : duracion;
        pins.analogPitch(frequency, duration)
    }

    //%block="reproducir melodia %melodyArray=devuelveMelodia en %cone=conexiones_ret"
    //%group="Buzzer"
    export function beginMelody(melodyArray: string[], cone: any) {
        pins.analogSetPitchPin(cone.P1)
        music.beginMelody(melodyArray, MelodyOptions.Once)
    }
    //%block="melodia %melodia=Melodies"
    //%blockId=devuelveMelodia
    //%group="Miscelaneo"
    export function devuelveMelodia(melodia: Melodies): string[] {
        return music.builtInMelody(melodia)
    }


    /**
     * 
     * INFRARROJO
     * 
     */
    //%block="InfrarrojoP1 en %cone=conexiones_ret"
    //%group="Sensores"
    // nota* cada conexion tiene dos pines en este caso se lee el de uno solo
    export function infrarrojo(cone: any): number {
        return pins.digitalReadPin(cone.P1);
    }
    /**
     * 
     * INFRARROJO
     * 
     */
    //%block="InfrarrojoP0 en %cone=conexiones_ret"
    //%group="Sensores"
    // nota* cada conexion tiene dos pines en este caso se lee el de uno solo
    export function infrarrojo2(cone: any): number {
        return pins.digitalReadPin(cone.P0);
    }

    /*
        LED BICOLOR
    */
    //%block="LED en %cone=conexiones_ret| mostrar como %est"
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

    //%block="Matriz de leds activada $val"
    //%val.shadow="toggleYesNo"
    //%group="Miscelaneo"
    export function activate_leds(val: boolean): void {
        val ? led.enable(true) : led.enable(false)
    }

    //%block="Probot en $pin=conexiones_ret| de $cantidad_leds|leds"
    //%cantidad_leds.defl=8
    //%blockSetVariable=leds_neopixel
    //%group="Leds"
    export function newStripNeopixel(pin: any, cantidad_leds: number): neopixel.Strip {
        return neopixel.create(pin.P0, cantidad_leds, NeoPixelMode.RGB)
    }

   
    //%block="Potenciometro en $con=conexiones_ret"
    export function potenciometro(con: any): number {
        return pins.analogReadPin(getAnalogPin(con.P1))
    }


    //%block="Luz en $con=conexiones_ret"
    export function sensorLuz(con: any): number {
        return pins.analogReadPin(getAnalogPin(con.P1))
    }

    //%block="Sonido en $con=conexiones_ret"
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

    //%block="ServoP1 $con=conexiones_ret|grados$grados"
    export function servoProbot0(con: any, grados: number){
        let num = grados < 0 ? 0 : grados > 180 ? 180 : grados
        pins.servoWritePin(con.P1, num);

    }
    //%block="ServoP0 $con=conexiones_ret|grados$grados"
    export function servoProbot1(con: any, grados: number) {
        let num = grados < 0 ? 0 : grados > 180 ? 180 : grados
        pins.servoWritePin(con.P0, num);

    }
 /*
    export class ServoProbot{
        con: AnalogPin
        microSecInASecond: any
        distancePerSec: any 
        numberOfDegreesPerSec: any 

        constructor(cony: any){
            this.con = getAnalogPin(cony.P0)
            this.microSecInASecond = 1000000
            this.distancePerSec = 100
            this.numberOfDegreesPerSec = 200
        }

        // block="%servo_motor mover hacia $dir"
        //group="Motores"
        mover(dir: DireccionMotor): void {
            switch (dir) {
                case DireccionMotor.Adelante:
                    pins.servoWritePin(this.con, 180);
                    break
                case DireccionMotor.Atras:
                    pins.servoWritePin(this.con, 0);
                    break
            }

  
        }


        // block="%servo_motor stop"
        //group="Motores"
        stop(): void {
            pins.analogWritePin(this.con, 0);
        }

  
        // block="%servo_motor goto neutral position"
        //group="Motores"
        neutral(): void {
            pins.servoWritePin(this.con, 90);
        }

        // block="%servo_motor move $deg"
        //group="Motores"
        move(deg: number): void {
            pins.servoWritePin(this.con, deg);
        }

        //block="%servo_motor drive forwards %howFar|distance hacia $dir"
        //group="Motores"
        driveForwards(howFar: number, dir: DireccionMotor): void {
            let timeToWait = (howFar * this.microSecInASecond) / this.distancePerSec; // calculation done this way round to avoid zero rounding
            switch (dir) {
                case DireccionMotor.Adelante:
                    this.mover(DireccionMotor.Adelante);
                    break
                case DireccionMotor.Atras:
                    this.mover(DireccionMotor.Atras);
                    break
            }

            control.waitMicros(timeToWait);
            this.stop();
        }


        // block="%servo_motor turn right %deg|degrees"
        //group="Motores"
        turnRight(deg: number): void {
            let timeToWait = (deg * this.microSecInASecond) / this.numberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
            pins.servoWritePin(AnalogPin.P1, 130);
            pins.servoWritePin(AnalogPin.P2, 130);
            control.waitMicros(timeToWait);
            this.stop();
        }

        // block="%servo_motor turn left %deg|degrees"
        //group="Motores"
        turnLeft(deg: number): void {
            let timeToWait = (deg * this.microSecInASecond) / this.numberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
            pins.servoWritePin(AnalogPin.P1, 50);
            pins.servoWritePin(AnalogPin.P2, 50);
            control.waitMicros(timeToWait);
            this.stop()
        }

        // block="%servo_motor calibrate turn speed to %DegPerSec|degrees per second"
        //group="Motores"
        setDegreesPerSecond(degPerSec: number): void {
            this.numberOfDegreesPerSec = degPerSec
        }

        // block="%servo_motor calibrate forward speed to %DistPerSec|mm per second"
        //group="Motores"
        setDistancePerSecond(distPerSec: number): void {
            this.distancePerSec = distPerSec
        }

        
    }

    //block="Probot en $con=conexiones_ret"
    //blockSetVariable=servo_motor
    //group="Motores"
    export function setServoMotor(con: any):ServoProbot {
        return new ServoProbot(con)
    }


    
    */


}
