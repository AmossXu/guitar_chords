
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

type ToneStringItem = '1' | '#1' | 'b2' | '2' | '#2' | 'b3' | '3' | '4' | '#4' | 'b5' | '5' | '#5' | 'b6' | '6' | '#6' | 'b7' | '7'

type SyllableItem = 'do' | 're' | 'mi' | 'fa' | 'sol' | 'la' | 'si'

type IntervalItem = 'C' | '#C' | 'bD' | 'D' | '#D' | 'bE' | 'E' | 'F' | '#F' | 'bG' | 'G' | '#G' | 'bA' | 'A' | '#A' | 'bB' | 'B'

interface GuitarPosition {
    string: number
    fret: number
}

export {
    ToneString
}

export type { GuitarPosition }

export type { ToneStringItem, SyllableItem, IntervalItem }
