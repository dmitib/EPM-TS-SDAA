import { Weapon } from "./Weapon";

export class Sword extends Weapon {

  constructor(defaultName = "sword", baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(defaultName, baseDamage, baseDurability, value, weight);
  }

  public polish(): void {
    if(this.getBaseDamage() * 1.25 > this.getDamage() ) {
      this.setDamageModifier(this.getDamageModifier() + Weapon.MODIFIER_CHANGE_RATE);
    }
  }
}