# Lexicon Schools Admissions — V2 (native SchoolFlow inline form)

## Deployment

Upload the contents of this folder (including `assets/`, CSS and JS) to any HTTPS web host. The page embeds the **native SchoolFlow Forms v2 short form**, served centrally from:

`https://stage.digiti.in/scrm/embed/a8b5de5d-ac84-4169-9347-21144cedd39c`

The only form snippet is:

```html
<div id="schoolflow-admissions"></div>
<script defer src="https://stage.digiti.in/scrm/embed/a8b5de5d-ac84-4169-9347-21144cedd39c" data-schoolflow-form="short" data-schoolflow-mode="inline" data-schoolflow-target="#schoolflow-admissions"></script>
```

No WordPress plugin, private `sfsite_` key, `sfgroup_` key, local API proxy, or standalone form JavaScript is required. The embed GUID is public; do not put secret API keys into the browser.

## SchoolFlow setup

The linked SchoolFlow Group Website must be **enabled** and authorized for the page's actual HTTPS hostname. In SchoolFlow → Group Websites, select the correct schools and make sure the assigned routes are active. SchoolFlow accepts only the configured exact domain, with an apex/www variant; using a different subdomain needs a new group/GUID. The same staging GUID cannot submit from multiple unrelated hostnames without separate approved group configurations.

For `https://lexicon.digiti.in/ver/demo/v2/` the authorized domain is `lexicon.digiti.in` (NOT `stage.digiti.in`; the latter hosts the CRM). If the GUID belongs to another authorized hostname, generate a new GUID and replace it in the `index.html` embed URL.

**Cloud/server policy:** where a Content Security Policy is configured, allow `https://stage.digiti.in` in `script-src`, `connect-src` and `style-src`. The form UI and CSS load from that host. HTTPS is required.

## Form behavior

The native form requests parent name, 10-digit mobile number, class, campus and consent. At submission it reveals the server-issued CAPTCHA before creating the lead. Campus options come from SchoolFlow and cannot be hardcoded by the page. The local `landing-cta.js` only scrolls to the native form and tries to preselect campus/grade when the relevant buttons are clicked. It never submits leads or stores parent data.

Use **one group embed per page**. Do not add the legacy popup script in addition unless you intentionally want a second enquiry widget.

## Acceptance test on authorized host

1. Verify parent name/mobile/class inputs render and the campus list contains only authorized schools.
2. Click each grade/campus marketing CTA and check that the valid SchoolFlow option is selected.
3. Submit a controlled parent test enquiry with consent and complete CAPTCHA.
4. Check the lead appears in the correct SchoolFlow campus dashboard with landing-page URL and campaign UTM details.
5. Check Android/iOS layout and keyboard navigation. Do not run paid ads until these pass.

## Important boundaries

This ZIP has static site assets and the public embed snippet, not the CRM service itself. It cannot guarantee that the staging URL is deployed, reachable, or accepts the current domain. Local `file://` previews and sandbox HTML previews cannot establish an authorized web Origin. No live enrolment, admission seat or campus visit is guaranteed by submitting an enquiry.
