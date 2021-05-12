import { IShipment } from "../shipment";

export abstract class Decorator implements IShipment {
	protected component: IShipment;

	constructor(component: IShipment) {
		this.component = component;
	}

	abstract showMessage(): void;
}