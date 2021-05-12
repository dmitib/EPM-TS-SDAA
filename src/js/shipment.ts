import { Shipper } from "./shipper";
import {
  AirEastShipper,
  ChicagoSprintShipper,
  PacificParcelShipper,
} from "./shippers/index";


export interface State {
  shipmetId?: number;
  toAddress: string;
  fromAddress: string;
  toZipCode: string;
  fromZipCode: string;
  readonly weight: number;
  marks?: Array<string>;
}

export interface IShipment {
  getShipmentID?: () => number;
  ship?: (shipInfo: State) => void;
  showMessage?: (shipInfo?: State, cost?: number) => void;
}

const mapShipper: { [key: string]: any } = {
  [1]: AirEastShipper,
  [2]: AirEastShipper,
  [3]: AirEastShipper,
  [4]: ChicagoSprintShipper,
  [5]: ChicagoSprintShipper,
  [6]: ChicagoSprintShipper,
  [7]: PacificParcelShipper,
  [8]: PacificParcelShipper,
  [9]: PacificParcelShipper,
};

export abstract class Shipment {
  protected implementation: Shipper;
  protected typeShipper: string;
  static id = 0;
  shipmetId: number;

  constructor(state: State) {
    if (state.fromZipCode[0] === "0") {
      console.error("Zip code can't be start with 0");
      return;
		}

		if (state.fromZipCode.length !== 5 || state.toZipCode.length !== 5) {
      console.error("Zip code should have 5 digits");
      return;
    }

    this.shipmetId = state.shipmetId || 0;
    this.implementation = new mapShipper[state.fromZipCode[0]]();
  }

  public static getShipmentID(): number {
    return ++Shipment.id;
  }

  public ship(shipInfo: State): void {}

  protected static showMessage(shipInfo?: State, cost?: number): void {
    const { fromZipCode, toZipCode, toAddress, fromAddress } = shipInfo;

    console.log(
      `Shipment with the ID ${this.getShipmentID()} will be picked up from ${fromZipCode} - ${fromAddress}, and shipped to ${toAddress} - ${toZipCode}.`,
      `Cost = ${cost}`
    );
  }
}