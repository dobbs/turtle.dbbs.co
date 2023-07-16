import { assert, assertEquals, assertArrayIncludes } from "https://deno.land/std/testing/asserts.ts";
import { Turtle } from "./base.js"

Deno.test("defaults", () => {
  const turtle = new Turtle()
  assertEquals(turtle.moment.movesize, 30)
  assertEquals(turtle.moment.turnsizeNumerator, 1)
  assertEquals(turtle.moment.turnsizeDenominator, 6)
  assertArrayIncludes(turtle.options.movesize, turtle.moment.movesize)
})

Deno.test("options", () => {
  const bTurtle = new Turtle({movesize:2}, {movesize:[1,2,3]})
  assertEquals(bTurtle.moment.movesize, 2)
  assertEquals(bTurtle.moment.turnsizeNumerator, 1)
  assertEquals(bTurtle.moment.turnsizeDenominator, 6)
})

Deno.test("nextMovesize", async (t) => {
  const turtle = new Turtle()
  const start = turtle.options.movesize.indexOf(turtle.moment.movesize)
  turtle.nextMovesize()
  const end = turtle.options.movesize.indexOf(turtle.moment.movesize)
  assert(start < end)
  await t.step("wrap around boundary", async () => {
    const bTurtle = new Turtle({movesize:2}, {movesize:[1,2,3]})
    bTurtle.nextMovesize()
    assertEquals(bTurtle.moment.movesize, 3)
    bTurtle.nextMovesize()
    assertEquals(bTurtle.moment.movesize, 1)
  })
})

Deno.test("prevMovesize", async (t) => {
  const turtle = new Turtle()
  const start = turtle.options.movesize.indexOf(turtle.moment.movesize)
  turtle.prevMovesize()
  const end = turtle.options.movesize.indexOf(turtle.moment.movesize)
  assert(start > end)
  await t.step("wrap around boundary", async () => {
    const bTurtle = new Turtle({movesize:2}, {movesize:[1,2,3]})
    bTurtle.prevMovesize()
    assertEquals(bTurtle.moment.movesize, 1)
    bTurtle.prevMovesize()
    assertEquals(bTurtle.moment.movesize, 3)
  })
})

Deno.test("nextTurnsizeNumerator", async (t) => {
  const turtle = new Turtle()
  const start = turtle.options.turnsizeNumerator.indexOf(turtle.moment.turnsizeNumerator)
  turtle.nextTurnsizeNumerator()
  const end = turtle.options.turnsizeNumerator.indexOf(turtle.moment.turnsizeNumerator)
  assert(start < end)
  await t.step("wrap around boundary", async () => {
    const bTurtle = new Turtle({turnsizeNumerator:2}, {turnsizeNumerator:[1,2,3]})
    bTurtle.nextTurnsizeNumerator()
    assertEquals(bTurtle.moment.turnsizeNumerator, 3)
    bTurtle.nextTurnsizeNumerator()
    assertEquals(bTurtle.moment.turnsizeNumerator, 1)
  })
})

Deno.test("prevTurnsizeNumerator", async (t) => {
  const turtle = new Turtle({turnsizeNumerator:3})
  const start = turtle.options.turnsizeNumerator.indexOf(turtle.moment.turnsizeNumerator)
  turtle.prevTurnsizeNumerator()
  const end = turtle.options.turnsizeNumerator.indexOf(turtle.moment.turnsizeNumerator)
  assert(start > end)
  await t.step("wrap around boundary", async () => {
    const bTurtle = new Turtle({turnsizeNumerator:2}, {turnsizeNumerator:[1,2,3]})
    bTurtle.prevTurnsizeNumerator()
    assertEquals(bTurtle.moment.turnsizeNumerator, 1)
    bTurtle.prevTurnsizeNumerator()
    assertEquals(bTurtle.moment.turnsizeNumerator, 3)
  })
})

Deno.test("nextTurnsizeDenominator", async (t) => {
  const turtle = new Turtle()
  const start = turtle.options.turnsizeDenominator.indexOf(turtle.moment.turnsizeDenominator)
  turtle.nextTurnsizeDenominator()
  const end = turtle.options.turnsizeDenominator.indexOf(turtle.moment.turnsizeDenominator)
  assert(start < end)
  await t.step("wrap around boundary", async () => {
    const bTurtle = new Turtle({turnsizeDenominator:2}, {turnsizeDenominator:[1,2,3]})
    bTurtle.nextTurnsizeDenominator()
    assertEquals(bTurtle.moment.turnsizeDenominator, 3)
    bTurtle.nextTurnsizeDenominator()
    assertEquals(bTurtle.moment.turnsizeDenominator, 1)
  })
})

Deno.test("prevTurnsizeDenominator", async (t) => {
  const turtle = new Turtle()
  const start = turtle.options.turnsizeDenominator.indexOf(turtle.moment.turnsizeDenominator)
  turtle.prevTurnsizeDenominator()
  const end = turtle.options.turnsizeDenominator.indexOf(turtle.moment.turnsizeDenominator)
  assert(start > end)
  await t.step("wrap around boundary", async () => {
    const bTurtle = new Turtle({turnsizeDenominator:2}, {turnsizeDenominator:[1,2,3]})
    bTurtle.prevTurnsizeDenominator()
    assertEquals(bTurtle.moment.turnsizeDenominator, 1)
    bTurtle.prevTurnsizeDenominator()
    assertEquals(bTurtle.moment.turnsizeDenominator, 3)
  })
})
