export class APICurrency {
  public getCurrency = async () => {
    const currency = await fetch("/rates.json", { mode: "no-cors" });
    return currency.json();
  };
}