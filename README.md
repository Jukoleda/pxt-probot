# pxt-probot



## TODO

- [ ] Add a reference for your blocks here
- [ ] Add "icon.png" image (300x200) in the root folder
- [ ] Add "- beta" to the GitHub project description if you are still iterating it.
- [ ] Turn on your automated build on https://travis-ci.org
- [ ] Use "pxt bump" to create a tagged release on GitHub
- [ ] On GitHub, create a new file named LICENSE. Select the MIT License template.
- [ ] Get your package reviewed and approved https://makecode.microbit.org/extensions/approval

Read more at https://makecode.microbit.org/extensions

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)


## Example Usage

### Driving around  #driveMillisec
To drive forward and back for 2 seconds each:

```blocks
input.onButtonPressed(Button.A, () => {
    gigglebot.driveMillisec(gigglebotWhichDriveDirection.Forward, 2000)
    gigglebot.driveMillisec(gigglebotWhichDriveDirection.Backward, 2000)
})
```

### Turning, Spinning and Steering
#### Turning happens around a wheel, it's a nice way of going around an obstacle. #turnMillisec
Turning will have the GiggleBot make a sharp turn around one of its wheel. 
This block will get the GiggleBot to turn right for a full second.
```blocks
gigglebot.turnMillisec(gigglebotWhichTurnDirection.Right, 1000)
```
#### Spinning happens on the spot, useful when drawing. #spinMillisec
Using the spin block is useful when drawing because the turns will be around the pen, instead of around a wheel. That way, you can get good corners when drawing.

```blocks
gigglebot.spinMillisec(gigglebotWhichTurnDirection.Left, 1000)
```

#### Steering is up to you, you can use it to orbit around a "sun". #steerMillisec
With steering you control how much turning each wheel can do. 
In this example, the robot will turn towards the right, doing a curve around an object. 
The first number is percent-based. With a value of 0, the robot will not turn at all. 
With a value of 100, you will get the same behavior as the turn block.
```blocks
gigglebot.steerMillisec(20, gigglebotWhichTurnDirection.Right, 1000)
```
### Moving without time constraint 
You can have blocks to drive, turn, spin, and steer, which are not time limited. That way, you can decide when to interrupt the GiggleBot. Maybe it gets dark, or there's an obstacle ahead.

#### Drive #drivestraight 
```blocks
gigglebot.driveStraight(gigglebotWhichDriveDirection.Forward)
```
#### Turn #turn 
```blocks
gigglebot.turn(gigglebotWhichTurnDirection.Right)
```
#### Spin #gigglebotspin 
```blocks
gigglebot.gigglebotSpin(gigglebotWhichTurnDirection.Right)
```
#### Steer #steer
```blocks
gigglebot.steer(20, gigglebotWhichTurnDirection.Right)
```

### STOP #stop
When using blocks that do not have a time limit to them, you will need to stop the robot yourself.
```blocks
gigglebot.stop()
```

### Setting the speed #setspeed
You can set the motors to five different speeds, from slowest to fastest. You can either set one motor, or both at the same time. Be careful, if you set the motors to different speeds, it will not drive straight.

```blocks
gigglebot.setSpeed(gigglebotWhichMotor.Both, gigglebotWhichSpeed.Slowest)
```

### Following a line #linefollow
The GiggleBot comes with two line sensors that allows it to follow either a thick line or a thin line. The thick line is thick enough that both sensors will attempt to be over the line, while the thin line is thin enough to fit between the two sensors and each sensor will attempt to avoid the line.

```blocks
input.onButtonPressed(Button.A, function () {
    gigglebot.lineFollow(gigglebotLineType.Thick)
})
```

### Reading the line sensors #linereadsensor

You can also access the line sensors values directly by using the blocks under the "more..." section. This allows you to write a line follower logic that is tailored to your specific needs.

```blocks
basic.showNumber(gigglebot.lineReadSensor(gigglebotWhichTurnDirection.Right)) 
```

You can use the following code as the basis for your own line follower. First, detect what are good values for detecting your line, then code the appropriate movements.
```blocks
basic.forever(() => {
    if (gigglebot.lineReadSensor(gigglebotWhichTurnDirection.Right) < 200) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.Asleep)
    }
})
```

### Following a light #lightfollow

The GiggleBot comes with two light sensors that allows it to follow a spotlight, a little bit like a cat would.  Shining a flashlight onto one eye will get the GiggleBot to turn in that direction. The robot will go straight if the two sides receive similar lighting conditions. 
```blocks
input.onButtonPressed(Button.A, function () {
    gigglebot.lightFollow()
})
input.onButtonPressed(Button.B, function () {
    gigglebot.stop()
})

```

### Reading the light sensor values #lightreadsensor

You can also read the light sensors values directly in order to implement a different behaviour, like having the GiggleBot fall asleep when it gets dark, and wake up when there's light. The light sensor reading block can be found under the "more..." section.

```blocks
basic.forever(() => {
    if (gigglebot.lightReadSensor(gigglebotWhichTurnDirection.Right) < 200) {
        basic.showIcon(IconNames.Asleep)
    } else {
        basic.showIcon(IconNames.Happy)
    }
})
```


## SERVO MOTORS  #servomove
The GiggleBot comes with two servo connectors. What will you do with them? You can control them one by one, both together (in synchro), or both mirrored, depending on how they are positioned on the robot.
```blocks
gigglebot.servoMove(gigglebotServoAction.Right, 90)
```

### Testing for an obstacle with the distance sensor #distancesensortestforobstacle 

```blocks
if (gigglebot.distanceSensorTestForObstacle(gigglebotInequality.Farther, 100)) {
    gigglebot.driveStraight(gigglebotWhichDriveDirection.Forward)
} else {
    gigglebot.stop()
}
```

## Getting the distance sensor value #distancesensorreadrangecontinuous

You can add a distance sensor to the robot. This distance sensor is not ultrasonic, but laser-based. 

The smile Neopixels will give feedback on the distance sensor readings.
```blocks

basic.forever(function () {
    lights.smileShowGraph(gigglebot.distanceSensorReadRangeContinuous(), 300)
    }
})
```

## Supported targets

* for PXT/microbit

## License

MIT License
