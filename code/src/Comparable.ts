import { Item } from "./Item";

export interface Comparable {
  getId: number;
  getName: string;
  getValue: number;
  getWeight: number;
  compareTo(other: Item): number;
  toString(): string;
  use(): void;
}