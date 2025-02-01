class Currency {
  #code;
  #rate;
  constructor(code, rate) {
    this.#code = code;
    this.#rate = rate;
  }

  get code() {
    return this.#code;
  }

  get rate() {
    return this.#rate;
  }

  display(container) {
    // console.log('Displaying a currency', this.#code, this.#rate);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${this.code}</td>
      <td>${this.#rate}</td>
    `;
    container.appendChild(tr);
  }
}

class App {
  #list;
  #currencies;
  constructor() {
    this.#init();
  }
  async #init() {
    this.#list = document.getElementById('table-body');
    const response = await fetch('https://api.frankfurter.app/latest?from=USD')
    const result = await response.json();
    this.#transformResult(result);
    this.#renderCurrencies();
  }
  #transformResult(result) {
    const { base, amount, rates } = result;
    const baseCurrency = new Currency(base, amount);
    const otherCurrencies = Object.entries(rates).map(([code, rate]) => new Currency(code, rate));
    this.#currencies = [baseCurrency, ...otherCurrencies];
    // console.log(this.#currencies);
  }

  #renderCurrencies() {
    this.#currencies.forEach(currency => currency.display(this.#list))
  }
}

new App();