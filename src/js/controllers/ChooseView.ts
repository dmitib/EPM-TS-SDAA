import { NumberCalculate } from "./NumberCalculate";
import { RangeCalculate } from "./RangeCalculate";

export class ChooseView {
  public radioPanel: HTMLElement;
  public container: HTMLElement;

  constructor() {
    this.radioPanel = document.getElementById("radio-panel");
    this.container = document.getElementById("container");

    this.radioPanel.addEventListener("click", (event: any) => {
      const target = <HTMLElement>event.target;
      if (!this.handler[target.id]) return;
      this.container.innerHTML = "";
      this.handler[target.id]();
    });
  }

  public handler: { [key: string]: Function } = {
    "number-button": () => {
      new NumberCalculate();
    },
    "range-button": () => {
      new RangeCalculate();
    }
  };
}