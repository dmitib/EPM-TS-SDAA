import { State, Shipment } from "../shipment";
import { OVERSIZE } from "../constants";

export class Oversized extends Shipment {
  typeShipper = OVERSIZE;

  public ship(shipInfo: State): number {
    const cost = this.implementation.getCost(this.typeShipper);
    Oversized.showMessage(shipInfo, cost);

    return cost;
  }
}