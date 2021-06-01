export abstract class CurrencyTemplate {
  public wrapper = document.getElementById("container");
  public maxRange: number = 1000;

  constructor() {
    this.renderButton();
  }

  public renderButton() {
    const template = `
      <label class="top-label">
          Pin Euro
          <input type="radio" name="euro" value="all" id="pin-radio">
      </label>
      <label class="top-label">
          Unpin Euro
          <input type="radio" name="euro" value="one" id="unpin-radio" checked>
      </label>`;
    this.wrapper.innerHTML += template;
  }

  public abstract render(data: any): void;
}