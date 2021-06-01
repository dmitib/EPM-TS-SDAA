import { InputRangeTemplate } from "../view/InputRangeTemplate";
import { ConvertCurrency } from "./ConvertCurrency";

export class RangeCalculate extends ConvertCurrency {
  public eventType = "input";

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
        const rangeValue = input.previousElementSibling.querySelector("b");

        rangeValue.innerHTML = detail.value;
        input.value = detail.value;
      }
    });
  }

  public renderView() {
    const template = new InputRangeTemplate();
    for (let rate in this.state.rates) template.render(this.state.rates[rate]);
  }
}