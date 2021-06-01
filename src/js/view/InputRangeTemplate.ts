import { CurrencyTemplate } from "./CurrencyTemplate";

export class InputRangeTemplate extends CurrencyTemplate {
  public render(data: any) {
    const template = `
      <div class="currency" data-rate="${data.name}">
        <h3 class="currency_title">${data.name}</h3>
        <form action="#" class="currency_form">
          <label class="currency_top">
            <span class="currency_top-text">1 EURO is </span>
            <span class="currency_input">${data.rate}</span>
            <span class="currency_top-text">${data.name}</span>
          </label>
          <label class="currency_bottom">
            <span>EURO <b>${data.defaultValue}</b></span>
            <input type="range" min="0" max="${
              this.maxRange
            }" step="10" value="${data.defaultValue}"
            data-currency-calculate-input="defaultValue" class="currency_input">
          </label>
          <label class="currency_bottom">
            <span>${data.name} <b>${data.convertValue}</b></span>
            <input type="range" min="0" max="${
              this.maxRange * Number(data.rate)
            }" step="10"
            value="${
              data.convertValue
            }" data-currency-calculate-input="convertValue" class="currency_input">
          </label>
        </form>
      </div>`;

    this.wrapper.innerHTML += template;
  }
}