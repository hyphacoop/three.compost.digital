import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  toggle(event) {
    if (event.target.checked) {
      document.body.style.overflowY = "hidden";
      this.element.style.overflowY = "scroll";
      this.element.style.minHeight = "100vh";
    } else {
      document.body.style.overflowY = "scroll";
      this.element.style.overflowY = "";
      this.element.style.minHeight = "";
    }
  }
}
