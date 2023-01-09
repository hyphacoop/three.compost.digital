---
---

window.env = {
  AIRBRAKE_PROJECT_ID: {{ site.env.AIRBRAKE_PROJECT_ID | default: 0 }},
  AIRBRAKE_PROJECT_KEY: "{{ site.env.AIRBRAKE_PROJECT_KEY }}",
  JEKYLL_ENV: "{{ jekyll.environment }}"
};
