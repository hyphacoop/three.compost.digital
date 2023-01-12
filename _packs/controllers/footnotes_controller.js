import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["footnote", "reference"];
  static classes = ["footnote", "footnoteToggled", "sidenote"];
  static values = {
    minSpacing: {
      type: Number,
      default: 20,
    },
    offsetTop: {
      type: Number,
      default: 0,
    },
    containerWidth: {
      type: Number,
      default: 780,
    },
    sidenoteWidth: {
      type: Number,
      default: 220,
    },
    paddingLeft: {
      type: Number,
      default: 16,
    },
  };

  connect() {
    this.originalFootnotes = [];
    this.createFootnotes();
  }

  resize(event = undefined) {
    if (this.sidenotesArePossible === undefined) return;

    this.offsetTopValue = 0;

    const sidenotesWerePossible = this.sidenotesArePossible;
    const sidenotesArePossible = this.areSidenotesPossible;

    if (sidenotesWerePossible && sidenotesArePossible) {
      for (const sidenote of this.footnoteTargets) {
        this.positionSidenote(sidenote);
      }
    } else {
      const footnotes = Array.from(this.footnoteTargets);

      for (const i in this.footnoteTargets) {
        footnotes[i].outerHTML = this.originalFootnotes[i];
      }

      this.originalFootnotes = [];

      this.createFootnotes();
    }
  }

  createFootnotes() {
    const references = this.element.querySelectorAll("a[id^=fn]");
    const footnotes = this.element.querySelectorAll("li[id^=fn]");

    this.sidenotesArePossible = this.areSidenotesPossible;

    for (const i in Array.from(references)) {
      const reference = references[i];
      const footnote = footnotes[i];
      const backlink = footnote.querySelector("a[role=doc-backlink]");

      this.originalFootnotes.push(footnote.outerHTML);

      reference.dataset.footnote = footnote.id;
      reference.dataset.turbo = "false";
      reference.dataset.footnotesTarget = "reference";

      if (backlink) backlink.dataset.turbo = "false";
      footnote.dataset.reference = reference.id;
      // XXX: The timeout ensures footnotes are processed in order.
      setTimeout(() => footnote.dataset.footnotesTarget = "footnote", 1+i);
    }
  }

  footnoteTargetConnected(footnote) {
    const reference = this.referenceTargets.find(x => x.id === footnote.dataset.reference);

    footnote.style.listStylePosition = "inside";

    if (this.sidenotesArePossible) {
      this.positionSidenote(footnote, reference);
    } else {
      footnote.dataset.action = "blur->footnotes#hide";

      footnote.classList.add(...this.footnoteToggledClasses);
      footnote.classList.add(...this.footnoteClasses);
      footnote.style.bottom = 0;
      footnote.style.left = 0;
      footnote.style.zIndex = 1;
      footnote.dataset.height = footnote.offsetHeight;
      footnote.style.height = 0;
      footnote.classList.add("collapsing");
      footnote.classList.remove(...this.footnoteToggledClasses);

      reference.dataset.action = "footnotes#show";
      reference.dataset.footnotesReferenceParam = reference.id;
      reference.dataset.footnotesFootnoteParam = footnote.id;
    }
  }

  get areSidenotesPossible () {
    const bodyWidth = document.body.offsetWidth;
    const containerWidth = (this.containerWidthValue + this.paddingLeftValue + this.sidenoteWidthValue * 2);

    return (bodyWidth > containerWidth);
  }

  positionSidenote(sidenote, reference = undefined) {
    if (!reference) reference = this.referenceTargets.find(x => x.id === sidenote.dataset.reference);

    const offsetTop = Math.max(reference.offsetTop, this.offsetTopValue);
    const offsetLeft = this.element.offsetLeft + this.element.offsetWidth + this.paddingLeftValue;

    sidenote.style.top = `${offsetTop}px`;
    sidenote.style.left = `${offsetLeft}px`;
    sidenote.classList.add(...this.sidenoteClasses);
    sidenote.dataset.action = "";
    reference.dataset.action = "";

    this.offsetTopValue = offsetTop + sidenote.offsetHeight + this.minSpacingValue;
  }

  show(event) {
    const footnote = this.footnoteTargets.find(x => x.id === event.params.footnote);

    event.preventDefault();

    this.hide();

    footnote.style.height = `${footnote.dataset.height}px`;
    footnote.classList.add(...this.footnoteToggledClasses);
    footnote.setAttribute("role", "alert");
    footnote.setAttribute("tabindex", "0");
    footnote.focus();
  }

  hide(event = undefined) {
    for (const footnote of this.footnoteTargets) {
      footnote.style.height = 0;
      footnote.classList.remove(...this.footnoteToggledClasses);
      footnote.setAttribute("role", "");
    }
  }
}
