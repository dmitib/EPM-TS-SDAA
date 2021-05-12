import { Shipper, IShipperPrice } from "../shipper";
import { LETTER, PACKAGE, OVERSIZE } from "../constants";

export class AirEastShipper implements Shipper {
	getCost(type: string): any {
		return airEastPrice[ type ];
	}
}

const airEastPrice: IShipperPrice = {
	[ LETTER ]: .39,
	[ PACKAGE ]: .25,
	[ OVERSIZE ]: 10
};