import { Item } from "./Item";

export abstract class Consumable extends Item {
  private consumed: boolean = false;
  private spoiled: boolean;
  public defaultMessage: string;
  public sickMessage: string;

  constructor(name: string, value: number, weight: number, spoiled: boolean) {
    super(name, value, weight);
    this.spoiled = spoiled;
    this.defaultMessage = `You eat the ${this.getName}.`;
    this.sickMessage = "You feel sick.";
  }

  use(): string {
    if (!this.consumed && !this.spoiled) {
      return this.eat();
    } else if (this.spoiled) {
      return `${this.eat()} ${this.sickMessage}`;
    } else if (this.consumed) {
      return `There is nothing left of the ${this.getName} to consume.`;
    }
  }

  eat(): string {
    return this.defaultMessage;
  }

  public get isConsumed(): boolean {
    return this.consumed;
  }

  public setConsumed(consumed: boolean) {
    if (this.consumed) {
      return `There is nothing left of the ${this.getName} to consume.`;
    } else {
      this.consumed = consumed;
    }
  }

  public get isSpoiled(): boolean {
    return this.spoiled;
  }

  public set setSpoiled(spoiled) {
    this.spoiled = spoiled;
  }

  toString(): string {
    return "";
  }
}