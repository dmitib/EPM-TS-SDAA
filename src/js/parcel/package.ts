import { State, Shipment } from "../shipment";
import { PACKAGE } from "../constants";

export class Package extends Shipment {
	typeShipper = PACKAGE;

	public ship(shipInfo: State): number {
		const cost = this.implementation.getCost(this.typeShipper);
		Package.showMessage(shipInfo, cost);

		return cost;
	}
}