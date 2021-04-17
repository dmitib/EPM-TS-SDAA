import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
  private numberOfSlices: number;
  private slicesEaten: number;

  constructor(numberOfSlices: number, spoiled: boolean) {
    const defaultName = "pizza";
    super(defaultName, 20, 30, spoiled);
    this.numberOfSlices = numberOfSlices;
    this.slicesEaten = 0;
  }

  eat(): string {
    switch (true) {
      case this.slicesEaten < this.numberOfSlices:
        this.slicesEaten++;
        if (this.slicesEaten >= this.numberOfSlices) this.setConsumed(true);
        return "You eat a slice of the pizza.";
        break;
      default:
        return "";
        break;
    }
  }
}