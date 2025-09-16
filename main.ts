//////////////////////
//##################//
//##              ##//
//##  general.ts  ##//
//##              ##//
//##################//
//////////////////////

let GROUP = 1
let WAVE = false
let WAVEWAIT = 1000

type handler = () => void
type msghandler = (value: number) => void

let messageHandler: msghandler
function onMessage(code: msghandler) {
    messageHandler = code;
}

let displayHandler: handler
function onDisplay(code: handler) {
    displayHandler = code;
}

let stopHandler: handler
function onStop(code: handler) {
    stopHandler = code;
}

let resetHandler: handler
function onReset(code: handler) {
    resetHandler = code;
}

function displayGroup() {
    basic.showNumber(GROUP)
    basic.pause(500)
    if (displayHandler) displayHandler()
    else basic.showIcon(IconNames.Yes)
}

displayGroup()

radio.onReceivedNumber(function (value: number) {
    if (WAVE) basic.pause(WAVEWAIT)
    if (messageHandler) messageHandler(value)
})

const EVENTID = 200 + Math.randomRange(0, 100); // semi-unique
let EVENTCNT = 0

control.onEvent(EVENTID, 0, function () {
    control.inBackground(() => {
        EVENTCNT++
        basic.showNumber(GROUP)
        let tm = control.millis() + 1000
        while (tm > control.millis()) basic.pause(1)
        EVENTCNT--
        if (!EVENTCNT) displayGroup()
    })
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    GROUP++
    if (GROUP > 9) GROUP = 1
    radio.setGroup(GROUP)
    control.raiseEvent(EVENTID, 0)
})

enum Digital {
    //% block="low"
    //% block.loc.nl="laag"
    Low,
    //% block="high"
    //% block.loc.nl="hoog"
    High,
}

enum Move {
    //% block="forward"
    //% block.loc.nl="vooruit"
    Forward,
    //% block="backward"
    //% block.loc.nl="achteruit"
    Backward,
}

enum Rotate {
    //% block="clockwise"
    //% block.loc.nl="rechtsom"
    Clockwise,
    //% block="anticlockwise"
    //% block.loc.nl="linksom"
    AntiClockwise,
}

enum Pace {
    //% block="fast"
    //% block.loc.nl="snelle"
    Fast,
    //% block="normal"
    //% block.loc.nl="normale"
    Normal,
    //% block="slow"
    //% block.loc.nl="langzame"
    Slow,
}

enum State {
    //% block="off"
    //% block.loc.nl="uit"
    Off,
    //% block="on"
    //% block.loc.nl="aan"
    On,
}

//% color="#61CBF4" icon="\uf075"
//% block="General"
//% block.loc.nl="Algemeen"
namespace General {

    //% color="#008800"
    //% block="comment: %dummy"
    //% block.loc.nl="uitleg: %dummy"
    //% dummy.defl="schrijf hier je uitleg"
    export function comment(dummy: string) {
    }

    //% block="turn %state the wave"
    //% block.loc.nl="zet de wave %state"
    export function waveOn(state: State) {
        WAVE = (state == State.On);
    }

    //% block="wave after %sec seconds"
    //% block.loc.nl="wave na %sec seconden"
    export function setWave(delay: number) {
        WAVEWAIT = delay * 1000
    }

    //% block="a number from %min upto %max"
    //% block.loc.nl="een getal van %min t/m %max"
    //% min.defl=0 max.defl=10
    export function randomInt(min: number, max: number): number {
        let i = 0
        if (min > max) {
            i = min
            min = max
            max = i
        }
        i = max - min + 1
        i = min + Math.floor(Math.random() * i)
        return i
    }

    //% block="wait %sec seconds"
    //% block.loc.nl="wacht %sec seconden"
    export function wait(sec: number) {
        basic.pause(sec * 1000)
    }
}

////////////////////
//################//
//##            ##//
//##  color.ts  ##//
//##            ##//
//################//
////////////////////

enum Color {
    //% block="none"
    //% block.loc.nl="geen"
    None,
    //% block="red"
    //% block.loc.nl="rood"
    Red,
    //% block="green"
    //% block.loc.nl="groen"
    Green,
    //% block="blue"
    //% block.loc.nl="blauw"
    Blue,
    //% block="yellow"
    //% block.loc.nl="geel"
    Yellow,
    //% block="cyan"
    //% block.loc.nl="cyaan"
    Cyan,
    //% block="magenta"
    //% block.loc.nl="magenta"
    Magenta,
    //% block="black"
    //% block.loc.nl="zwart"
    Black,
    //% block="dark grey"
    //% block.loc.nl="donkergrijs"
    DarkGrey,
    //% block="grey"
    //% block.loc.nl="grijs"
    Grey,
    //% block="light grey"
    //% block.loc.nl="lichtgrijs"
    LightGrey,
    //% block="white"
    //% block.loc.nl="wit"
    White,
    //% block="orange"
    //% block.loc.nl="oranje"
    Orange,
    //% block="brown"
    //% block.loc.nl="bruin"
    Brown,
    //% block="pink"
    //% block.loc.nl="roze"
    Pink,
    //% block="indigo"
    //% block.loc.nl="indigo"
    Indigo,
    //% block="violet"
    //% block.loc.nl="violet"
    Violet,
    //% block="purple"
    //% block.loc.nl="paars"
    Purple
}

function fromColor(color: Color): number {
    let val = 0
    switch (color) {
        case Color.Red: val = 0xFF0000; break;
        case Color.Green: val = 0x00FF00; break;
        case Color.Blue: val = 0x0000FF; break;
        case Color.Yellow: val = 0xFFFF00; break;
        case Color.Cyan: val = 0x00FFFF; break;
        case Color.Magenta: val = 0xFF00FF; break;
        case Color.Black: val = 0x000000; break;
        case Color.DarkGrey: val = 0xA9A9A9; break;
        case Color.Grey: val = 0x808080; break;
        case Color.LightGrey: val = 0xD3D3D3; break;
        case Color.White: val = 0xFFFFFF; break;
        case Color.Orange: val = 0xFFA500; break;
        case Color.Brown: val = 0xA52A2A; break;
        case Color.Pink: val = 0xFFC0CB; break;
        case Color.Indigo: val = 0x4b0082; break;
        case Color.Violet: val = 0x8a2be2; break;
        case Color.Purple: val = 0x800080; break;
    }
    return val
}

function fromRgb(red: number, green: number, blue: number): number {
    let rgb = ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF)
    return rgb;
}

function redValue(rgb: number): number {
    let r = (rgb >> 16) & 0xFF;
    return r;
}

function greenValue(rgb: number): number {
    let g = (rgb >> 8) & 0xFF;
    return g;
}

function blueValue(rgb: number): number {
    let b = (rgb) & 0xFF;
    return b;
}

///////////////////////
//###################//
//##               ##//
//##  px-color.ts  ##//
//##               ##//
//###################//
///////////////////////

/*
The code below is a refactoring of:
- the ElecFreaks 'pxt-PlanetX' library:
  https://github.com/elecfreaks/pxt-PlanetX/blob/master/basic.ts
Both under MIT-license.
*/

namespace PxColor {

    function rgb2color(color_r: number, color_g: number, color_b: number): Color {
        let R = color_r / 255;
        let G = color_g / 255;
        let B = color_b / 255;
        let max = -1
        let min = -1
        let hue = 0

        if (R > G && R > B) max = R
        if (G > R && G > B) max = G
        if (B > R && B > G) max = B
        if (R < G && R < B) min = R
        if (G < R && G < B) min = G
        if (B < R && B < G) min = B

        if (R == max) hue = (0 + (G - B) / (max - min)) * 60
        if (G == max) hue = (2 + (B - R) / (max - min)) * 60
        if (B == max) hue = (4 + (R - G) / (max - min)) * 60

        if (hue < 0) hue += 360

        // translate hue to color
        if (hue == 0) return Color.White
        if (hue < 5) return Color.Orange
        if (hue < 30) return Color.Brown
        if (hue < 100) return Color.Yellow
        if (hue < 190) return Color.Green
        if (hue < 206) return Color.Cyan
        if (hue < 213) return Color.Blue
        if (hue < 217) return Color.Black
        if (hue < 230) return Color.Indigo
        if (hue < 255) return Color.Purple
        if (hue < 272) return Color.Pink
        if (hue < 300) return Color.Magenta
        return Color.Red
    }

    const APDS9960_ADDR = 0x39
    const APDS9960_ENABLE = 0x80
    const APDS9960_ATIME = 0x81
    const APDS9960_CONTROL = 0x8F
    const APDS9960_STATUS = 0x93
    const APDS9960_CDATAL = 0x94
    const APDS9960_CDATAH = 0x95
    const APDS9960_RDATAL = 0x96
    const APDS9960_RDATAH = 0x97
    const APDS9960_GDATAL = 0x98
    const APDS9960_GDATAH = 0x99
    const APDS9960_BDATAL = 0x9A
    const APDS9960_BDATAH = 0x9B
    const APDS9960_GCONF4 = 0xAB
    const APDS9960_AICLEAR = 0xE7

    let color_first_init = false
    let color_new_init = false

    function i2cwrite_color(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread_color(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    export function init() {

        // init module
        i2cwrite_color(APDS9960_ADDR, APDS9960_ATIME, 252)
        i2cwrite_color(APDS9960_ADDR, APDS9960_CONTROL, 0x03)
        i2cwrite_color(APDS9960_ADDR, APDS9960_ENABLE, 0x00)
        i2cwrite_color(APDS9960_ADDR, APDS9960_GCONF4, 0x00)
        i2cwrite_color(APDS9960_ADDR, APDS9960_AICLEAR, 0x00)
        i2cwrite_color(APDS9960_ADDR, APDS9960_ENABLE, 0x01)
        color_first_init = true

        // set to color mode
        let tmp = i2cread_color(APDS9960_ADDR, APDS9960_ENABLE) | 0x2;
        i2cwrite_color(APDS9960_ADDR, APDS9960_ENABLE, tmp);
    }

    export function read(): Color {
        let buf = pins.createBuffer(2)
        let c = 0
        let r = 0
        let g = 0
        let b = 0
        let temp_c = 0
        let temp_r = 0
        let temp_g = 0
        let temp_b = 0
        let temp = 0

        if (color_new_init == false && color_first_init == false) {
            let i = 0;
            while (i++ < 15) {
                buf[0] = 0x81
                buf[1] = 0xCA
                pins.i2cWriteBuffer(0x43, buf)
                buf[0] = 0x80
                buf[1] = 0x17
                pins.i2cWriteBuffer(0x43, buf)
                basic.pause(50);

                if ((i2cread_color(0x43, 0xA4) + i2cread_color(0x43, 0xA5) * 256) != 0) {
                    color_new_init = true
                    break;
                }
            }
        }
        if (color_new_init == true) {
            basic.pause(150);
            c = i2cread_color(0x43, 0xA6) + i2cread_color(0x43, 0xA7) * 256;
            r = i2cread_color(0x43, 0xA0) + i2cread_color(0x43, 0xA1) * 256;
            g = i2cread_color(0x43, 0xA2) + i2cread_color(0x43, 0xA3) * 256;
            b = i2cread_color(0x43, 0xA4) + i2cread_color(0x43, 0xA5) * 256;

            r *= 1.3 * 0.47 * 0.83
            g *= 0.69 * 0.56 * 0.83
            b *= 0.80 * 0.415 * 0.83
            c *= 0.3

            if (r > b && r > g) {
                b *= 1.18;
                g *= 0.95
            }

            temp_c = c
            temp_r = r
            temp_g = g
            temp_b = b

            r = Math.min(r, 4095.9356)
            g = Math.min(g, 4095.9356)
            b = Math.min(b, 4095.9356)
            c = Math.min(c, 4095.9356)

            if (temp_b < temp_g) {
                temp = temp_b
                temp_b = temp_g
                temp_g = temp
            }
        }
        else {
            if (color_first_init == false)
                init()
            let tmp = i2cread_color(APDS9960_ADDR, APDS9960_STATUS) & 0x1;
            while (!tmp) {
                basic.pause(5);
                tmp = i2cread_color(APDS9960_ADDR, APDS9960_STATUS) & 0x1;
            }
            c = i2cread_color(APDS9960_ADDR, APDS9960_CDATAL) + i2cread_color(APDS9960_ADDR, APDS9960_CDATAH) * 256;
            r = i2cread_color(APDS9960_ADDR, APDS9960_RDATAL) + i2cread_color(APDS9960_ADDR, APDS9960_RDATAH) * 256;
            g = i2cread_color(APDS9960_ADDR, APDS9960_GDATAL) + i2cread_color(APDS9960_ADDR, APDS9960_GDATAH) * 256;
            b = i2cread_color(APDS9960_ADDR, APDS9960_BDATAL) + i2cread_color(APDS9960_ADDR, APDS9960_BDATAH) * 256;
        }

        // map to rgb based on clear channel
        let avg = c / 3;
        r = r * 255 / avg;
        g = g * 255 / avg;
        b = b * 255 / avg;

        return rgb2color(r, g, b)
    }
}

PxColor.init()

////////////////////
//################//
//##            ##//
//##  match.ts  ##//
//##            ##//
//################//
////////////////////

/* This is a basic extension for robot matches.
 * The robot-players, goals and arbiter must include
 * it to be able to send and respond to 'Match'-messages.
 * 
 * The radio event handler 'onReceivedNumber' stores
 * the messages in variable 'MATCH' and calls the
 * accompanying handler. Dependent extensions should
 * register the handlers, for example:
 *   //% block="when playing do"
 *   export function onPlay(code: handler) : void   {
 *       playHandler = code;
 *   }
 * or define the handlers, for example:
 *   playHander = () => { ...code... }
 * Of course, a handler needs to be registered only
 * when applicable. An arbiter does not need to
 * register the playHandler.
 * 
 * IMPORTANT NOTE:
 * Dependent extensions should have the following line
 * of code as the first line of EACH loop:
 *   if (!isPlaying()) return;
 * This ensures a quick response to the messages.
 */

enum Role {
    //% block="GREEN"
    //% block.loc.nl="GROENE"
    PlayerGreen,
    //% block="BLUE"
    //% block.loc.nl="BLAUWE"
    PlayerBlue,
}

enum MatchStatus {
    Reset,
    Stop,
    Play,
    GameOver,
    PointGreen,
    PointBlue,
    DisallowGreen,
    DisallowBlue,
    DisqualGreen,
    DisqualBlue
}

let MATCH: MatchStatus = MatchStatus.Reset
let OLDMATCH: MatchStatus = MatchStatus.Reset
let ROLE: Role = Role.PlayerGreen
let POINTSGREEN: number = 0
let POINTSBLUE: number = 0

let playHandler: handler       // (re)starts playing
let pointHandler: handler      // increase points
let winnerHandler: handler     // end of game, player has won

let showPlayerColorHandler: handler
function onShowPlayerColor(code: handler) {
    showPlayerColorHandler = code;
}

function setPlayer() {
    if (PxColor.read() == Color.Green) {
        ROLE = Role.PlayerGreen
        basic.showString("G")
    }
    else {
        ROLE = Role.PlayerBlue
        basic.showString("B")
    }
}
setPlayer()

// Use button A to set the player color manually
input.onButtonPressed(Button.A, function () {
    if (ROLE == Role.PlayerGreen) {
        ROLE = Role.PlayerBlue
        basic.showString("B")
    }
    else {
        ROLE = Role.PlayerGreen
        basic.showString("G")
    }
    if (showPlayerColorHandler) showPlayerColorHandler()
})

// Use button B to read the player color from the color sensor
input.onButtonPressed(Button.B, function () {
    setPlayer()
    if (showPlayerColorHandler) showPlayerColorHandler()
})

basic.forever(function () {
    if ((MATCH == MatchStatus.Play) && playHandler)
        playHandler()
})

function display() {
    basic.pause(1000)
    if (ROLE == Role.PlayerGreen)
        basic.showString("G")
    else
        basic.showString("B")
}

onDisplay(() => {
    display()
})

onMessage((matchstatus: number) => {
    MATCH = matchstatus
    switch (MATCH) {
        case MatchStatus.Reset:
            POINTSGREEN = 0
            POINTSBLUE = 0
            if (stopHandler) stopHandler()
            if (resetHandler) resetHandler()
            break
        case MatchStatus.Stop:
            if (stopHandler) stopHandler()
            break
        // MatchStatus.play is handled above in a forever loop.
        // Furthermore, to ensure quick responses to messages,
        // dependent extension should check the playing status
        // in EACH loop of the onPlay code by inserting the
        // next code as first line:
        //       'if (!isPlaying()) return'
        case MatchStatus.GameOver:
            if (ROLE == Role.PlayerGreen) {
                basic.showNumber(POINTSGREEN)
                if ((POINTSGREEN > POINTSBLUE) && winnerHandler)
                    winnerHandler()
            }
            if (ROLE == Role.PlayerBlue) {
                basic.showNumber(POINTSBLUE)
                if ((POINTSBLUE > POINTSGREEN) && winnerHandler)
                    winnerHandler()
            }
            if (resetHandler) resetHandler()
            break
        case MatchStatus.PointGreen:
            POINTSGREEN += 1
            if (ROLE == Role.PlayerGreen) {
                basic.showNumber(POINTSGREEN)
                if (pointHandler) pointHandler()
            }
            display()
            if (stopHandler) stopHandler()
            break
        case MatchStatus.PointBlue:
            POINTSBLUE += 1
            if (ROLE == Role.PlayerBlue) {
                basic.showNumber(POINTSBLUE)
                if (pointHandler) pointHandler()
            }
            display()
            if (stopHandler) stopHandler()
            break
        case MatchStatus.DisallowGreen:
            POINTSGREEN -= 1
            if (ROLE == Role.PlayerGreen) {
                basic.showNumber(POINTSGREEN)
            }
            display()
            MATCH = OLDMATCH
            break
        case MatchStatus.DisallowBlue:
            POINTSBLUE -= 1
            if (ROLE == Role.PlayerBlue) {
                basic.showNumber(POINTSBLUE)
            }
            display()
            MATCH = OLDMATCH
            break
        case MatchStatus.DisqualGreen:
            POINTSGREEN = 0
            basic.showNumber(POINTSGREEN)
            if (ROLE == Role.PlayerGreen) {
                if ((POINTSGREEN > POINTSBLUE) && winnerHandler)
                    winnerHandler()
            }
            if (ROLE == Role.PlayerBlue) {
                if ((POINTSBLUE > POINTSGREEN) && winnerHandler)
                    winnerHandler()
            }
            if (resetHandler) resetHandler()
            break
        case MatchStatus.DisqualBlue:
            POINTSBLUE = 0
            basic.showNumber(POINTSBLUE)
            if (ROLE == Role.PlayerGreen) {
                if ((POINTSGREEN > POINTSBLUE) && winnerHandler)
                    winnerHandler()
            }
            if (ROLE == Role.PlayerBlue) {
                if ((POINTSBLUE > POINTSGREEN) && winnerHandler)
                    winnerHandler()
            }
            if (resetHandler) resetHandler()
            break
    }
    OLDMATCH = MATCH
})

//% color="#00CC00" icon="\uf091"
//% block="Match"
//% block.loc.nl="Wedstrijd"
namespace Match {

    //% block="be the %role player"
    //% block.loc.nl="wees de %role speler"
    export function setRole(role: Role) {
        ROLE = role
    }

	//% block="this is the %role player"
	//% block.loc.nl="dit is de %role speler"
	export function isPlayer(role: Role): boolean {
        return (ROLE == role)
    }

    //% block="the game is in progress"
    //% block.loc.nl="het spel bezig is"
    export function isPlaying(): boolean {
        return (MATCH == MatchStatus.Play)
    }

    //% color="#FFCC00"
    //% block="code for the winner to celebrat"
    //% block.loc.nl="code om het winnen te vieren"
    export function onWinner(code: () => void): void {
        winnerHandler = code
    }

    //% color="#FFCC00"
    //% block="code for celebrating a goal"
    //% block.loc.nl="code om een doelpunt te vieren"
    export function onPoint(code: () => void): void {
        pointHandler = code
    }

    //% color="#FFCC00"
    //% block="code for playing"
    //% block.loc.nl="code om te voetballen"
    export function onPlay(code: () => void): void {
        playHandler = code;
    }
}