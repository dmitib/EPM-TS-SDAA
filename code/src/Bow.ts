import { Weapon } from "./Weapon";

export class Bow extends Weapon {
  constructor(defaultName = "bow", baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(defaultName, baseDamage, baseDurability, value, weight);
  }

  public polish(): void {
    if (this.getDurability() < 1) {
      this.setDurabilityModifier(this.getDurabilityModifier() + Weapon.MODIFIER_CHANGE_RATE);
    } else {
      this.setDurability(1);
    }
  }
}