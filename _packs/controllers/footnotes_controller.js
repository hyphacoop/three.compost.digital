import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["footnote", "reference"];
  static values = {
    minSpacing: {
      type: Number,
      default: 20,
    },
    offset: {
      type: Number,
      default: 0,
    },
    sidenoteClasses: {
      type: Array,
      default: [
        "position-absolute",
        "f-11",
        "w-220px"
      ],
    }
  };

  connect() {
    const references = this.element.querySelectorAll("a[id^=fn]");
    const footnotes = this.element.querySelectorAll("li[id^=fn]");

    for (const i in Array.from(references)) {
      const reference = references[i];
      const footnote = footnotes[i];

      reference.dataset.footnote = footnote.id;
      reference.dataset.footnotesTarget = "reference";

      footnote.dataset.reference = reference.id;
      // XXX: The timeout ensures footnotes are processed in order.
      setTimeout(() => footnote.dataset.footnotesTarget = "footnote", 1+i);
    }
  }

  referenceTargetConnected(reference) {
    console.log("Reference", reference.href);
  }

  footnoteTargetConnected(footnote) {
    const sidenote = footnote;
    const reference = this.referenceTargets.find(x => x.id === footnote.dataset.reference);
    const number = reference.querySelector("sup").textContent;
    const offset = Math.max(reference.offsetTop, this.offsetValue);

    sidenote.style.top = `${offset}px`;
    sidenote.style.left = `1105px`;
    sidenote.classList.add(...this.sidenoteClassesValue);

    this.offsetValue = offset + sidenote.offsetHeight + this.minSpacingValue;
  }
}
