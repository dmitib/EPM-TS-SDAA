interface IShipper {
	getCost(type: string): number;
}

export abstract class Shipper implements IShipper {
	abstract getCost(type: string): any;
}

export interface IShipperPrice {
	readonly[ key: string ]: number;
}