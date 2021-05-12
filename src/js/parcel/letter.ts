import { State, Shipment } from "../shipment";
import { LETTER } from "../constants";

export class Letter extends Shipment {
	typeShipper = LETTER;

	public ship(shipInfo: State): number {
		const cost = this.implementation.getCost(this.typeShipper);
		Letter.showMessage(shipInfo, cost);

		return cost;
	}
}