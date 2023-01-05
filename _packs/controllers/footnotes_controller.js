import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["footnote", "reference"];
  static values = {
    minSpacing: {
      type: Number,
      default: 20,
    },
    offsetTop: {
      type: Number,
      default: 0,
    },
    offsetLeft: {
      type: Number,
      default: 1105,
    },
    footnoteClasses: {
      type: Array,
      default: [
        "background-white",
        "position-fixed",
      ],
    },
    footnoteToggledClasses: {
      type: Array,
      default: [
        "w-100",
        "p-3",
        "border-top",
      ],
    },
    sidenoteClasses: {
      type: Array,
      default: [
        "position-absolute",
        "f-11",
        "w-220px",
      ],
    },
    containerWidth: {
      type: Number,
      default: 780,
    },
    sidenoteWidth: {
      type: Number,
      default: 220,
    },
  };

  connect() {
    this.originalFootnotes = [];
    this.createFootnotes();
  }

  resize(event = undefined) {
    if (this.sidenotesArePossible === undefined) return;
    if (this.sidenotesArePossible === this.areSidenotesPossible) return;

    const footnotes = Array.from(this.footnoteTargets);

    for (const i in this.footnoteTargets) {
      footnotes[i].outerHTML = this.originalFootnotes[i];
    }

    this.originalFootnotes = [];

    this.createFootnotes();
  }

  createFootnotes() {
    const references = this.element.querySelectorAll("a[id^=fn]");
    const footnotes = this.element.querySelectorAll("li[id^=fn]");

    this.sidenotesArePossible = this.areSidenotesPossible;

    for (const i in Array.from(references)) {
      const reference = references[i];
      const footnote = footnotes[i];

      this.originalFootnotes.push(footnote.outerHTML);

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
    const reference = this.referenceTargets.find(x => x.id === footnote.dataset.reference);

    footnote.style.listStylePosition = "inside";

    if (this.sidenotesArePossible) {
      const sidenote = footnote;
      const number = reference.querySelector("sup").textContent;
      const offset = Math.max(reference.offsetTop, this.offsetTopValue);

      sidenote.style.top = `${offset}px`;
      sidenote.style.left = `${this.offsetLeftValue}px`;
      sidenote.classList.add(...this.sidenoteClassesValue);

      this.offsetTopValue = offset + sidenote.offsetHeight + this.minSpacingValue;
    } else {
      footnote.dataset.action = "blur->footnotes#hide";

      footnote.classList.add(...this.footnoteToggledClassesValue);
      footnote.classList.add(...this.footnoteClassesValue);
      footnote.style.bottom = 0;
      footnote.style.left = 0;
      footnote.style.zIndex = 1;
      footnote.dataset.height = footnote.offsetHeight;
      footnote.style.height = 0;
      footnote.classList.add("collapsing");

      reference.dataset.action = "footnotes#show";
      reference.dataset.footnotesReferenceParam = reference.id;
      reference.dataset.footnotesFootnoteParam = footnote.id;
    }
  }

  get areSidenotesPossible () {
    const bodyWidth = document.body.offsetWidth;
    const containerWidth = (this.containerWidthValue + this.sidenoteWidthValue * 2);

    return (bodyWidth > containerWidth);
  }

  show(event) {
    const footnote = this.footnoteTargets.find(x => x.id === event.params.footnote);

    event.preventDefault();

    this.hide();

    footnote.style.height = `${footnote.dataset.height}px`;
    footnote.classList.add(...this.footnoteToggledClassesValue);
    footnote.setAttribute("role", "alert");
    footnote.setAttribute("tabindex", "0");
    footnote.focus();
  }

  hide(event = undefined) {
    for (const footnote of this.footnoteTargets) {
      footnote.style.height = 0;
      footnote.classList.remove(...this.footnoteToggledClassesValue);
      footnote.setAttribute("role", "");
    }
  }
}
