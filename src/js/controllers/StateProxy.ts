import { ConvertCurrencyProps } from "./ConvertCurrency";

interface DetailsProps {
  property: string;
  value: Object | number | string;
  target: ConvertCurrencyProps;
}

export class StateProxy {
  public onChange(objToWatch: ConvertCurrencyProps) {
    const handler = {
      get(target: any, property: any): any {
        if (typeof target[property] === "object" && target[property] !== null) {
          return new Proxy(target[property], handler);
        } else {
          return target[property];
        }
      },
      set(
        target: ConvertCurrencyProps,
        property: string,
        value: Object | number | string
      ) {
        StateProxy.createCustomEvent({ property, value, target });

        return Reflect.set(target, property, value);
      },
    };

    return new Proxy(objToWatch, handler);
  }

  private static createCustomEvent(detail: DetailsProps) {
    const event = new CustomEvent("changeState", { detail: detail });
    document.body.dispatchEvent(event);
  }
}