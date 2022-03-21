import { GuitarPosition, IntervalItem, SyllableItem, ToneString, ToneStringItem } from "./definition"

class Tone {
    private toneString: ToneStringItem
    private syllableMap: SyllableItem[]
    private keyMap: (ToneStringItem | ToneStringItem[])[]
    private intervalMap: (IntervalItem | IntervalItem[])[]
    private toneNormal: string
    private key: string
    private syllableName: SyllableItem
    private flat: 'b' | ''
    private sharp: '#' | ''
    private octave: number
    private position: GuitarPosition
    constructor(toneStr: ToneStringItem = ToneString.DO, string: number, fret: number) {
        this.toneString = toneStr
        this.syllableMap = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si']; // 所有唱名数组
        this.keyMap = ['1', ['#1', 'b2'], '2', ['#2', 'b3'], '3', '4', ['#4', 'b5'], '5', ['#5', 'b6'], '6', ['#6', 'b7'], '7']; // 音程
        this.intervalMap = ['C', ['#C', 'bD'], 'D', ['#D', 'bE'], 'E', 'F', ['#F', 'bG'], 'G', ['#G', 'bA'], 'A', ['#A', 'bB'], 'B']; //所有调名
        this.toneString = toneStr; // 单音的字符串表示
        this.toneNormal = toneStr.replace(/\./g, ''); // 单音的字符串表示（去除八度标记）
        this.key = toneStr.replace(/\.|b|#/g, ''); // 数字音
        this.syllableName = this.syllableMap[+this.key - 1]; // 唱名
        this.flat = toneStr.match('b') ? 'b' : ''; // 降半调标记
        this.sharp = toneStr.match('#') ? '#' : ''; // 升半调标记
        let octave_arr = toneStr.split(this.key);
        let octave_flat = octave_arr[0].toString().match(/\./g);
        let octave_sharp = octave_arr[1].toString().match(/\./g);
        this.octave = (octave_sharp ? octave_sharp.length : 0) - (octave_flat ? octave_flat.length : 0); // 八度度数
        // 吉他按弦位置
        this.position = {
            string: string, // 第几弦
            fret: fret // 第几品格
        };
    }
}

export default Tone