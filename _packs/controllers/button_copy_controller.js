import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    text: String,
    confirmation: String,
  };

  async copy(event) {
    if (!('clipboard' in navigator)) return;

    try {
      await navigator.clipboard.writeText(this.textValue.trim());

      this.element.innerText = this.confirmationValue;
    } catch(e) {
    }
  }
}
