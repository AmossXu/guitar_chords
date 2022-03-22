import { is } from "../../type"
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
    constructor(toneStr: ToneStringItem = ToneString.DO, string?: number, fret?: number) {
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
            string: string ?? 0, // 第几弦
            fret: fret ?? 0// 第几品格
        };
    }
    // 获取某个音在音程上的位置
    findKeyIndex(keyString: ToneStringItem) {
        return this.keyMap.findIndex((item) => {
            if (is(item)('Array')) {
                return item.includes(keyString);
            } else if (item === keyString) {
                return true;
            } else {
                return false;
            }
        });
    }
    // 音高增减，num为增或减的半音数量
    step(num: number) {
        let keyString = this.flat + this.sharp + this.key;
        let len = this.keyMap.length;
        let index = this.findKeyIndex(keyString as ToneStringItem) as number;
        if (index > -1) {
            num = +num;
            // 计算改变音高后的音在音程上的位置
            let nextIndex = parseInt(String(index) + num, 0);
            let octave = this.octave;
            if (nextIndex >= len) {
                let index_gap = nextIndex - len;
                octave += Math.floor(index_gap / len) + 1;
                nextIndex = index_gap % len;
            } else if (nextIndex < 0) {
                let index_gap = nextIndex;
                octave += Math.floor(index_gap / len);
                nextIndex = index_gap % len + len;
            }
            let nextKey = this.keyMap[nextIndex];
            // 计算并添加高低八度的记号
            let octaveString = new Array(Math.abs(octave)).fill('.').join('');
            let toneString = '';
            if (!is(nextKey)('Array')) {
                toneString = (octave < 0 ? octaveString : '') + nextKey + (octave > 0 ? octaveString : '');
                return new Tone(toneString as ToneStringItem, this.position.string, this.position.fret + num);
            } else {
                // 可能得到两个音高一样但标记方式不一样的音
                return (nextKey as ToneStringItem[]).map((key) => {
                    return new Tone((octave < 0 ? octaveString : '') + key + (octave > 0 ? octaveString : '') as ToneStringItem, this.position.string, this.position.fret + num);
                });
            }
        } else {
            return null;
        }
    }
}

export default Tone