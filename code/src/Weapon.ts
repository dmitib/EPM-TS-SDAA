import { Item } from "./Item";

export abstract class Weapon extends Item {
  static MODIFIER_CHANGE_RATE: number = 0.05;

  public effectiveDamage: number;
  public effectiveDurability: number;

  private baseDamage: number;
  private baseDurability: number;
  private durabilityModifier: number = Weapon.MODIFIER_CHANGE_RATE;
  private damageModifier: number = Weapon.MODIFIER_CHANGE_RATE;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);

    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
    this.effectiveDamage = this.baseDamage + this.damageModifier;
    this.effectiveDurability = this.baseDurability + this.durabilityModifier;
  }

  abstract polish(): void;

  public use(): string {
    this.effectiveDurability = this.baseDurability + this.durabilityModifier;
    this.baseDurability -= Weapon.MODIFIER_CHANGE_RATE;
    
    const baseMessage = `You use the ${this.getName}, dealing ${this.floor(this.effectiveDamage)} points of damage.`;

    if (this.effectiveDurability < Weapon.MODIFIER_CHANGE_RATE && this.effectiveDurability > 0) {
      return `${baseMessage} The ${this.getName} breaks.`;
    } else if (this.effectiveDurability <= 0) {
      return `You can't use the ${this.getName}, it is broken.`;
    }
    return baseMessage;
  }

  public getDamage(): number {
    return this.baseDamage + this.damageModifier;
  }

  public getDurability(): number {
    return this.baseDurability + this.durabilityModifier;
  }

  public getDamageModifier(): number {
    return this.damageModifier;
  }

  public getBaseDamage() {
    return this.baseDamage;
  }

  public setDamage(damage) {
    this.baseDamage = damage;
  }

  public setDurability(durability) {
    this.baseDurability = durability;
  }

  public setDamageModifier (modifier) {
    this.damageModifier = modifier;
  }

  public getDurabilityModifier(): number {
    return this.durabilityModifier;
  }

  public setDurabilityModifier(durability: number) {
    this.durabilityModifier = durability;
  }

  public toString(): string {
    return `${this.getName} - Value: ${this.getValue}, Weight: ${this.floor(this.getWeight)}, Damage: ${this.floor(this.effectiveDamage)}, Durability: ${this.effectiveDurability *100}%`;
  }

  private floor(num: number): number {
    return Math.floor(num * 100) / 100;
  }
}