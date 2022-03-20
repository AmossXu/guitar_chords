
enum ToneString {
    DO = '1',
    fDO = '#1',
    bRE = 'b2',
    RE = '2',
    fRE = '#2',
    bMI = 'b3',
    MI = '3',
    fMI = 'f3',
    bFA = 'b4',
    FA = '4',
    fFA = '#4',
    bSOL = 'b5',
    SOL = '5',
    fSOL = '#5',
    bLA = 'b6',
    LA = '6',
    fLA = '#6',
    bSI = 'b7',
    SI = '7',
    fSI = '#7',
}

class Tone {
    private toneString: ToneString
    constructor(toneStr: ToneString = ToneString.DO) {
        this.toneString = toneStr
    }
}

export default Tone