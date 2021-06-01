import { InputNumberTemplate } from "../view/InputNumberTemplate";
import { ConvertCurrency } from "./ConvertCurrency";

export class NumberCalculate extends ConvertCurrency {
  public eventType = "keyup";

  public updateView() {
    document.body.addEventListener("changeState", (e: CustomEvent) => {
      const detail = e.detail;

      if (detail.target.name) {
        const rateItem = document.querySelector(
          `[data-rate='${detail.target.name}']`
        );
        const input: HTMLInputElement = rateItem.querySelector(
          `[data-currency-calculate-input='${detail.property}']`
        );

        input.value = detail.value;
      }
    });
  }

  public renderView() {
    const template = new InputNumberTemplate();
    for (let rate in this.state.rates) template.render(this.state.rates[rate]);
  }
}