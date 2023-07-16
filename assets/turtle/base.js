const TAU = Math.PI * 2
export class Turtle {
  constructor(origin={}, options={}) {
    this._origin = {
      name: "origin",
      x: 0,
      y: 0,
      direction: -TAU/4,
      pensize: 1,
      pencolor: 'black',
      movesize: 30,
      turnsize: TAU/6,
      turnsizeNumerator: 1,
      turnsizeDenominator: 6,
      ...origin
    };

    this._options = {
      movesize: Array.from({length:16}, (_,i) => (i+1)*5),
      turnsizeNumerator: [...Array.from({length:16}, (_,i) => i+1)],
      turnsizeDenominator: [...Array.from({length:16}, (_,i) => i+1)],
      ...options
    };

    this.clear();
  }

  get moment() {return {...this._moment};}
  get origin() {return {...this._origin};}
  get options() {return {...this._options};}
  get history() {return [...this._history];}

  clear() {
    this._moment = this.origin;
    this._history = [{
      fn: 'clear',
      beforestate: {},
      state: this.moment
    }];
    return this;
  }

  change(name, params) {
    let beforestate = this.moment;
    let state = this._moment = {
      ...beforestate,
      ...params
    };
    this._history.push({
      fn: name,
      beforestate,
      state
    });
    return this;
  }

  _changeDirection({positive=true}) {
    let beforestate = this.moment;
    let {direction, turnsize} = beforestate;
    let newdirection = (positive)
        ? direction + turnsize
        : direction - turnsize;
    while (newdirection > TAU) {
      newdirection = newdirection - TAU;
    }
    while (newdirection < 0) {
      newdirection = newdirection + TAU;
    }

    return this.change('turn', {direction: newdirection})
  }

  turn() {
    return this._changeDirection({positive:true})
  }

  right() {
    return this._changeDirection({positive:true})
  }

  left () {
    return this._changeDirection({positive:false})
  }

  move() {
    let beforestate = this.moment;
    let {x, y, direction, movesize} = beforestate;
    return this.change('move', {
      x: Math.cos(direction) * movesize + x,
      y: Math.sin(direction) * movesize + y
    })
  }

  nextMovesize() {
    let {movesize} = this.moment;
    let {movesize: options} = this.options
    let idx = options.indexOf(movesize)
    movesize = options[idx+1] || options[0]
    return this.change('nextMovesize', {movesize})
  }

  prevMovesize() {
    let {movesize} = this.moment;
    let {movesize: options} = this.options
    let idx = options.indexOf(movesize)
    movesize = options[idx-1] || options[options.length-1]
    return this.change('prevMovesize', {movesize})
  }

  nextTurnsizeNumerator() {
    let {
      turnsizeNumerator: numerator,
      turnsizeDenominator: denominator
    } = this.moment;
    let {turnsizeNumerator: options} = this.options
    let idx = options.indexOf(numerator)
    let turnsizeNumerator = options[idx+1] || options[0]
    let turnsize = TAU * turnsizeNumerator / denominator;
    return this.change('nextTurnsizeNumerator', {turnsize, turnsizeNumerator})
  }

  nextTurnsizeDenominator() {
    let {
      turnsizeNumerator: numerator,
      turnsizeDenominator: denominator
    } = this.moment;
    let {turnsizeDenominator: options} = this.options
    let idx = options.indexOf(denominator)
    let turnsizeDenominator = options[idx+1] || options[0]
    let turnsize = TAU * numerator / turnsizeDenominator;
    return this.change('nextTurnsizeDenominator', {turnsize, turnsizeDenominator})
  }

  prevTurnsizeNumerator() {
    let {
      turnsizeNumerator: numerator,
      turnsizeDenominator: denominator
    } = this.moment;
    let {turnsizeNumerator: options} = this.options
    let idx = options.indexOf(numerator)
    let turnsizeNumerator = options[idx-1] || options[options.length-1]
    let turnsize = TAU * turnsizeNumerator / denominator;
    return this.change('prevTurnsizeNumerator', {turnsize, turnsizeNumerator})
  }

  prevTurnsizeDenominator() {
    let {
      turnsizeNumerator: numerator,
      turnsizeDenominator: denominator
    } = this.moment;
    let {turnsizeDenominator: options} = this.options
    let idx = options.indexOf(denominator)
    let turnsizeDenominator = options[idx-1] || options[options.length-1]
    let turnsize = TAU * numerator / turnsizeDenominator;
    return this.change('prevTurnsizeDenominator', {turnsize, turnsizeDenominator})
  }

  get boundingBox() {
    let box = this.history.reduce((bounds, {state: {x, y}}) => {
      return {
        Xmin: Math.min(bounds.Xmin, Math.floor(x)),
        Ymin: Math.min(bounds.Ymin, Math.floor(y)),
        Xmax: Math.max(bounds.Xmax, Math.ceil(x)),
        Ymax: Math.max(bounds.Ymax, Math.ceil(y)),
      }
    }, {
      Xmin:Number.MAX_SAFE_INTEGER,
      Ymin:Number.MAX_SAFE_INTEGER,
      Xmax:Number.MIN_SAFE_INTEGER,
      Ymax:Number.MIN_SAFE_INTEGER
    });
    box.width = box.Xmax - box.Xmin;
    box.height = box.Ymax - box.Ymin;
    box.centroid = {
      x: (box.Xmax + box.Xmin)/2,
      y: (box.Ymax + box.Ymin)/2
    };
    return box;
  }
}
