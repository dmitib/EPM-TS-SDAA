import { CurrencyTemplate } from "./CurrencyTemplate";

export class InputNumberTemplate extends CurrencyTemplate {
  public render(data: any) {
    const template = `
      <div class="currency" data-rate="${data.name}">
        <h3 class="currency_title">${data.name}</h3>
        <form action="#" class="currency_form">
          <label class="currency_top">
            <span class="currency_top-text">1 EURO is </span>
            <input type="number" value="${data.rate}" data-currency-calculate-input="rate" class="currency_input">
            <span class="currency_top-text">${data.name}</span>
          </label>
          <label class="currency_bottom">
            <span>EURO</span>
            <input type="number" value="${data.defaultValue}" data-currency-calculate-input="defaultValue"
            class="currency_input">
          </label>
          <label class="currency_bottom">
            <span>${data.name}</span>
            <input type="number" value="${data.convertValue}" data-currency-calculate-input="convertValue"
            class="currency_input">
          </label>
        </form>
      </div>`;

    this.wrapper.innerHTML += template;
  }
}