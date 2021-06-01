import { APICurrency } from "../model/APICurrency";
import { StateProxy } from "./StateProxy";

export interface ConvertCurrencyProps {
  pinEuro: boolean;
  rates: {
    [key: string]: {
      name?: string;
      rate?: number;
      defaultValue?: number;
      convertValue?: number;
    };
  };
}

export abstract class ConvertCurrency {
  public state: ConvertCurrencyProps;
  public defaultValue: number = 100;
  public rates: Array<Element>;
  public abstract eventType: string;

  constructor() {
    const stateListener = new StateProxy();
    this.state = {
      pinEuro: false,
      rates: {},
    };

    this.state = stateListener.onChange(this.state);

    const init = async () => {
      await this.getCurrency();
      this.renderView();
      this.addInputListener();
      this.handlerPinEuro();
      this.updateView();
    };

    init();
  }

  public abstract updateView(): void;
  public abstract renderView(): void;

  public handlerPinEuro() {
    const radioInput = [...document.querySelectorAll('[type="radio"]')];

    radioInput.forEach((input) => {
      input.addEventListener("change", (event) => {
        let target = <HTMLInputElement>event.target;
        this.state.pinEuro = target.id === "pin-radio";
      });
    });
  }

  public calculate(targetCurrency: any, inputValue: number, attr: string) {
    const handler: { [key: string]: (value: number) => void } = {
      ["rate"]: (value) => {
        targetCurrency.rate = ConvertCurrency.toNumberFloor(value);
        targetCurrency.convertValue = ConvertCurrency.toNumberFloor(
          value * targetCurrency.defaultValue
        );
      },
      ["convertValue"]: (value) => {
        targetCurrency.convertValue = ConvertCurrency.toNumberFloor(value);
        targetCurrency.defaultValue = ConvertCurrency.toNumberFloor(
          value / targetCurrency.rate
        );
      },
      ["defaultValue"]: (value) => {
        if (this.state.pinEuro) {
          handler["all"](value);
        } else {
          targetCurrency.defaultValue = ConvertCurrency.toNumberFloor(value);
          targetCurrency.convertValue = ConvertCurrency.toNumberFloor(
            value * targetCurrency.rate
          );
        }
      },
      ["all"]: (value) => {
        for (let rateItem in this.state.rates) {
          const currentRateItem = this.state.rates[rateItem];
          currentRateItem.defaultValue = ConvertCurrency.toNumberFloor(value);
          currentRateItem.convertValue = ConvertCurrency.toNumberFloor(
            value * currentRateItem.rate
          );
        }
      },
    };

    handler[attr](inputValue);
  }

  public addInputListener() {
    const rates = [...document.querySelectorAll("[data-rate]")];
    rates.forEach((rate) => {
      const currency = rate.getAttribute("data-rate");
      const targetCurrency = this.state.rates[currency];

      rate.addEventListener(this.eventType, (event) => {
        const target = <HTMLInputElement>event.target;
        const value = Number(target.value);
        const attr = target.getAttribute("data-currency-calculate-input");

        this.calculate(targetCurrency, value, attr);
      });
    });
  }

  protected getCurrency = async () => {
    const modelApi = new APICurrency();
    const model = await modelApi.getCurrency();

    for (let item in model.rates) {
      if (model.rates.hasOwnProperty(item)) {
        this.state.rates[item] = {
          name: item,
          rate: model.rates[item],
          defaultValue: this.defaultValue,
          convertValue: ConvertCurrency.toNumberFloor(
            model.rates[item] * this.defaultValue
          ),
        };
      }
    }
  };

  public static toNumberFloor(value: number): number {
    return Number(value.toFixed(3));
  }
}