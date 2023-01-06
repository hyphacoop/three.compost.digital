import DeviceDetector from "device-detector-js";
import { Notifier } from "@airbrake/browser";

window.deviceDetector = new DeviceDetector();
window.device = window.deviceDetector.parse(navigator.userAgent);

if (!window.device.bot && window.env.JEKYLL_ENV === "production") {
  window.airbrake = new Notifier({
    projectId: window.env.AIRBRAKE_PROJECT_ID,
    projectKey: window.env.AIRBRAKE_PROJECT_KEY,
    host: "https://panel.sutty.nl",
  });

  console.originalError = console.error;
  console.error = (...e) => {
    window.airbrake.notify(e.join(" "));
    return console.originalError(...e);
  };
}

import * as Turbo from "@hotwired/turbo";
Turbo.start();

import { Application } from "@hotwired/stimulus";
window.Stimulus = Application.start();

import BodyScrollController from "./controllers/body_scroll_controller";
import DeviceDetectorController from "./controllers/device_detector_controller";
import FootnotesController from "./controllers/footnotes_controller";
import ButtonCopyController from "./controllers/button_copy_controller";

Stimulus.debug = (window.env.JEKYLL_ENV !== "production");
Stimulus.register("body-scroll", BodyScrollController);
Stimulus.register("device-detector", DeviceDetectorController);

Stimulus.debug = (window.env.JEKYLL_ENV !== "production");
Stimulus.register("device-detector", DeviceDetectorController);
Stimulus.register("footnotes", FootnotesController);
Stimulus.register("button-copy", ButtonCopyController);
