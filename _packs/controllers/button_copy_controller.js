import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["text", "icon", "confirmationIcon"];
  static values = {
    text: String,
    confirmation: String,
  };

  async copy(event) {
    if (!('clipboard' in navigator)) return;

    try {
      await navigator.clipboard.writeText(this.textValue.trim());
    } catch(e) {
      console.error("Couldn't copy", e);
      return;
    }

    const textTarget = this.hasTextTarget ? "textTarget" : "element";

    this[textTarget].innerText = this.confirmationValue;

    if (this.hasIconTarget) this.iconTarget.classList.add("d-none");
    if (this.hasConfirmationIconTarget) this.confirmationIconTarget.classList.remove("d-none");
  }
}
