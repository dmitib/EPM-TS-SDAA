import { ItemComparator } from "./ItemComparator";
import { Item } from "./Item";

export class Inventory implements ItemComparator {
  private items: Array<Item> = [];

  public addItem(item: Item): void {
    this.items.push(item);
  }

  public compare(first, second): number {
    if (first.value < second.value) return 1;
    if (first.value > second.value) return -1;
  }
  
  public sort(comparator?: ItemComparator): void {
    this.items.sort((a, b) => {
      if (comparator) {
        return comparator.compare(a, b);
      } else {
        const valueA = a.getValue;
        const valueB = b.getValue;
        return valueA - valueB;
      }
    });
  }

  public toString(): string {
    return this.items.join(", ");
  }
}