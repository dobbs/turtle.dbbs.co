import {Turtle} from "./base.js"

export function addTurtle(pathElement) {
  const turtle = new Turtle({movesize: 5})
  turtle.draw = () => {
    const digits = 4
    const d = turtle.history.reduce((d, {fn, state: {x, y}}) => {
      if (fn === 'clear') {
        return `M${x.toFixed(digits)},${y.toFixed(digits)}`
      } else if (fn === 'move') {
        return `${d} ${x.toFixed(digits)},${y.toFixed(digits)}`
      }
      return d
    }, "")
    pathElement.attributes.d.value = d
    return turtle
  }
  Object.assign(pathElement, {turtle})
}
