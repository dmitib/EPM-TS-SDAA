import { Shipper, IShipperPrice } from "../shipper";
import { LETTER, OVERSIZE, PACKAGE } from "../constants";

export class PacificParcelShipper implements Shipper {
	getCost(type: string): any {
		return pacificParcelPrice[type];
	}
}

const pacificParcelPrice: IShipperPrice = {
	[ LETTER ]: .51,
	[ PACKAGE ]: .19,
	[ OVERSIZE ]: .02
};