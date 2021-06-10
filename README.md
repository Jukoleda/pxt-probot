# pxt-probot

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)


## Example Usage

### Show color with #NeoPixel

```blocks
let leds_neopixel = probot.newStripNeopixel(probot.conexiones_ret(conn.CON1), 8)
probot.showColor(leds_neopixel, probot.colors(Colores.Red1))
```

### Execute melodies with #buzzer
```blocks
probot.beginMelody(probot.devuelveMelodia(Melodies.Dadadadum), probot.conexiones_ret(conn.CON1))
```
#### Get distance with #ultraSound
Using the ultrasound block you can get the value of distance that it sense.

```blocks
basic.showNumber(probot.ping(probot.conexiones_ret(conn.CON1)))
```
### Use the Color Sensor
Use any I2C Port to connect the APDS-9960 and select the color what do you whant to sense in a IF comparison.
You should use the init block before sense any color.
```blocks
probots.initColorSensor()
if (probots.getSensedColorValue() == probots.colors_ret(Names_colors.White)) {
    basic.showString("WHITE")
}
```

## Supported targets

* for PXT/microbit

## License

MIT License
