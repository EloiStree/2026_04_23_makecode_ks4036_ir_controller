function car_control () {
    if (data == "F") {
        Speed_buffer()
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 200)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 200)
    } else if (data == "B") {
        MiniCar.motor(Motorlist.M1, Direction1.Backward, 200)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 200)
    } else if (data == "L") {
        MiniCar.motor(Motorlist.M1, Direction1.Backward, 100)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 100)
    } else if (data == "R") {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 100)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 100)
    } else if (data == "S") {
        MiniCar.motor(Motorlist.M1, Direction1.Backward, 0)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 0)
    }
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Heart)
    connected = 1
    while (connected == 1) {
        data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        car_control()
        LED_RGB()
        music2()
    }
})
function Light_Follow () {
    basic.clearScreen()
    ldr_l = MiniCar.PH1()
    ldr_r = MiniCar.PH2()
    if (ldr_l > 650 && ldr_r > 650) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 100)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 100)
    } else if (ldr_l > 650 && ldr_r <= 650) {
        MiniCar.motor(Motorlist.M1, Direction1.Backward, 100)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 100)
    } else if (ldr_l <= 650 && ldr_r > 650) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 100)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 100)
    } else {
        MiniCar.motor(Motorlist.M1, Direction1.Backward, 0)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 0)
    }
}
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
function Tracking_Smart () {
    value = MiniCar.LineTracking()
    if (value == 1) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 70)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 70)
    } else if (value == 2) {
        MiniCar.motor(Motorlist.M1, Direction1.Backward, 70)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 70)
    } else if (value == 3) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 70)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 70)
    } else {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 0)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 0)
    }
}
function Ultrasonic_Follow () {
    distance = MiniCar.ultra()
    if (distance >= 10 && distance <= 30) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 100)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 100)
    } else if (distance <= 6) {
        MiniCar.motor(Motorlist.M1, Direction1.Backward, 100)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 100)
    } else if (distance < 10 && distance > 6 || distance > 30) {
        MiniCar.motor(Motorlist.M1, Direction1.Backward, 0)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 0)
        basic.pause(200)
    }
}
function avoid () {
    distance = MiniCar.ultra()
    if (distance > 10) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 70)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 70)
    } else {
        MiniCar.motor(Motorlist.M1, Direction1.Backward, 70)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 70)
        basic.pause(200)
    }
}
function music2 () {
    if (data == "1") {
        music.ringTone(262)
    } else if (data == "2") {
        music.ringTone(294)
    } else if (data == "3") {
        music.ringTone(330)
    } else if (data == "4") {
        music.ringTone(349)
    } else if (data == "5") {
        music.ringTone(392)
    } else if (data == "6") {
        music.ringTone(440)
    } else if (data == "7") {
        music.ringTone(494)
    } else if (data == "8") {
        music.ringTone(523)
    } else if (data == "9") {
        music.rest(music.beat(BeatFraction.Half))
    }
}
function Speed_buffer () {
    MiniCar.motor(Motorlist.M1, Direction1.Forward, 50)
    MiniCar.motor(Motorlist.M2, Direction1.Forward, 50)
    basic.pause(100)
    MiniCar.motor(Motorlist.M1, Direction1.Forward, 80)
    MiniCar.motor(Motorlist.M2, Direction1.Forward, 80)
    basic.pause(100)
    MiniCar.motor(Motorlist.M1, Direction1.Forward, 110)
    MiniCar.motor(Motorlist.M2, Direction1.Forward, 110)
    basic.pause(100)
}
function LED_RGB () {
    if (data == "r") {
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.red1)
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.red1)
    } else if (data == "g") {
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.green1)
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.green1)
    } else if (data == "b") {
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.blue1)
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.blue1)
    } else if (data == "y") {
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.yellow)
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.yellow)
    } else if (data == "c") {
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.cyan)
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.cyan)
    } else if (data == "p") {
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.purple)
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.purple)
    } else if (data == "x") {
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.black)
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.black)
    }
}
let distance = 0
let value = 0
let ldr_r = 0
let ldr_l = 0
let connected = 0
let data = ""
MiniCar.LED_OFF()
irRemote.connectInfrared(DigitalPin.P16)
basic.forever(function () {
    if (data == "Q") {
        avoid()
    } else if (data == "W") {
        Ultrasonic_Follow()
    } else if (data == "E") {
        Tracking_Smart()
    } else if (data == "T") {
        Light_Follow()
    } else if (data == "A") {
        basic.showIcon(IconNames.Heart)
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 0)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 0)
    }
})
basic.forever(function () {
	
})
basic.forever(function () {
    value = irRemote.returnIrButton()
    if (value == 70) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 255)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 255)
    } else if (value == 68) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 0)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 255)
    } else if (value == 67) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 255)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 0)
    } else if (value == 21) {
        MiniCar.motor(Motorlist.M1, Direction1.Backward, 255)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 255)
    } else if (value == 64) {
        MiniCar.motor(Motorlist.M1, Direction1.Backward, 0)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 0)
    } else if (value == irRemote.irButton(IrButton.Number_1)) {
        basic.showLeds(`
            # . . . .
            # . . . .
            # # . . .
            . . . . .
            . . . . .
            `)
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.red1)
        MiniCar.motor(Motorlist.M1, Direction1.Backward, 255)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 255)
    } else if (value == irRemote.irButton(IrButton.Number_3)) {
        basic.showLeds(`
            . . . . #
            . . . . #
            . . . # #
            . . . . .
            . . . . .
            `)
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.red1)
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 255)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 255)
    } else if (value == irRemote.irButton(IrButton.Number_6)) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 255)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 125)
    } else if (value == irRemote.irButton(IrButton.Number_9)) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 255)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 45)
    } else if (value == irRemote.irButton(IrButton.Number_4)) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 125)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 255)
    } else if (value == irRemote.irButton(IrButton.Number_7)) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 45)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 255)
    } else if (value == irRemote.irButton(IrButton.Number_2)) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 255)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 50)
    } else if (value == irRemote.irButton(IrButton.Number_5)) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 255)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 100)
    } else if (value == irRemote.irButton(IrButton.Number_8)) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 255)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 150)
    } else if (value == irRemote.irButton(IrButton.Star)) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 50)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 255)
    } else if (value == irRemote.irButton(IrButton.Number_0)) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 50)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 150)
    } else if (value == irRemote.irButton(IrButton.Hash)) {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 50)
        MiniCar.motor(Motorlist.M2, Direction1.Backward, 100)
    } else {
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.black)
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.black)
    }
})
