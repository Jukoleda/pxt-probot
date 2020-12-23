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

## Supported targets

* for PXT/microbit

## License

MIT License
