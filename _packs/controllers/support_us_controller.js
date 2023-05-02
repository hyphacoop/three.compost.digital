import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["goal", "balance", "date"];
  static values = {
    monetizationUrl: String,
  };

  async connect() {
    if (!this.monetizationUrlValue) return;

    try {
      const monetizationUrl = new URL(this.monetizationUrlValue);

      if (window.location.protocol !== monetizationUrl.protocol) {
        monetizationUrl.protocol = this.protocol;
        this.monetizationUrlValue = monetizationUrl.toString();
      }
    } catch(e) {
      console.error("Not a valid URL", this.monetizationUrlValue);
      return;
    }

    const balances = await this.fetchBalances();

    if (!balances) return;

    const decimalIndex = balances.balance.length - balances.decimal;
    const totalBalance = `${balances.balance.slice(0, decimalIndex)}.${balances.balance.slice(decimalIndex)}`;
    const locale = document.querySelector("html").lang;

    for (const goal of this.goalTargets) {
      const max = parseFloat(goal.getAttribute("aria-valuemax") ?? "0");
      const now = Math.min(100, (totalBalance / max) * 100);
      goal.style.width = `${now}%`;
      goal.setAttribute("aria-valuenow", totalBalance);
    }

    if (this.hasBalanceTarget) {
      const style = "currency";
      const currency = balances.currency;
      const balanceFormatter = new Intl.NumberFormat(locale, { style, currency });

      this.balanceTarget.innerText = balanceFormatter.format(totalBalance);
    }

    if (this.hasDateTarget) {
      const balanceDate = new Date(balances.timestamp);
      const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'full' });

      this.dateTarget.innerText = dateFormatter.format(balanceDate);
    }
  }

  async fetchBalances() {
    try {
      const response = await fetch(this.monetizationUrlValue);

      return await response.json();
    } catch(e) {
      console.error("Couldn't fetch", this.monetizationUrlValue, e);
      return null;
    }
  }

  get protocol() {
    if (window.location.protocol === "ipfs:") return "ipns:";

    return window.location.protocol;
  }
}
