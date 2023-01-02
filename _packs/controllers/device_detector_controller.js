import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "clientName",
    "clientVersion",
    "osName",
    "osVersion",
    "viewportWidth",
    "viewportHeight",
    "devicePixelRatio",
    "deviceType",
    "help",
  ];

  connect() {
    this.element.style.zIndex = 10000;

    this.clientNameTarget.innerText = window.device.client.name;
    this.clientVersionTarget.innerText = window.device.client.version;
    this.osNameTarget.innerText = window.device.os.name;
    this.osVersionTarget.innerText = window.device.os.version;
    this.deviceTypeTarget.innerText = window.device.device.type;

    this.viewportWidthTarget.innerText = window.innerWidth;
    this.viewportHeightTarget.innerText = window.innerHeight;
    this.devicePixelRatioTarget.innerText = window.devicePixelRatio;
  }

  resized (event) {
    this.viewportWidthTarget.innerText = window.innerWidth;
    this.viewportHeightTarget.innerText = window.innerHeight;
  }

  outline (event) {
    let style = document.head.querySelector('style#outline');

    if(style){
      style.remove();
    } else {
      style = document.createElement('style');
      style.id = 'outline';
      style.append("* { outline: 1px solid pink }");

      document.head.appendChild(style);
    }
  }

  toggleHelp (event) {
    this.helpTarget.hidden = !this.helpTarget.hidden;
  }
}
