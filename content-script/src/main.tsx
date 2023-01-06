import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css'
import App from './App'

const body = document.querySelector('div[class*=PageWrapper]')!; // ! means we're sure this is never null, typescript
const originalTab = document.querySelector('div[class*=TeacherRatingTabs][data-tabs]')!;

originalTab.remove();

const app = document.createElement('div')

app.id = 'extension-new-tab'

// Make sure the element that you want to mount the app to has loaded. You can
// also use `append` or insert the app using another method:
// https://developer.mozilla.org/en-US/docs/Web/API/Element#methods
//
// Also control when the content script is injected from the manifest.json:
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
if (body) {
  // body.append(app);
  body.insertBefore(app, body.lastChild);
}

const container = document.getElementById('extension-new-tab');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
