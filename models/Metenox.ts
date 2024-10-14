import { Structure } from 'app/models/Structure'

class Metenox {
  readonly structure: Structure
  readonly fuel: number
  readonly gas: number

  constructor (structure: Structure, fuel: number, gas: number) {
    this.structure = structure
    this.fuel = fuel
    this.gas = gas
  }

  // Hours of fuel left
  leftFuel (): number {
    return Math.round(this.fuel / 5)
  }

  // Hours of gas left
  leftGas (): number {
    return Math.round(this.gas / 88)
  }
}

export { Metenox }
