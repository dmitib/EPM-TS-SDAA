import { Shipper, IShipperPrice } from "../shipper";
import { LETTER, OVERSIZE, PACKAGE } from "../constants";

export class ChicagoSprintShipper implements Shipper {
	getCost(type: string): any {
		return chicagoSprintPrice[type];
	}
}

const chicagoSprintPrice: IShipperPrice = {
	[ LETTER ]: .42,
	[ PACKAGE ]: .20,
	[ OVERSIZE ]: 0
};