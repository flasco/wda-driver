export type IChainOperation =
  | ITap
  | IPress
  | IMoveTo
  | ILongPress
  | IRelease
  | IWait;

export interface ITap {
  action: 'tap';
  options: {
    x: number;
    y: number;
  };
}

export interface IPress {
  action: 'press';
  options: {
    x: number;
    y: number;
  };
}

export interface IMoveTo {
  action: 'moveTo';
  options: {
    x: number;
    y: number;
  };
}

export interface IWait {
  action: 'wait';
  options: {
    ms: number;
  };
}

export interface ILongPress {
  action: 'longPress';
  options: {
    x: number;
    y: number;
    duration: number;
  };
}

export interface IRelease {
  action: 'release';
}
