import { createRoot } from 'react-dom/client';
const div = document.createElement('div');
document.body.appendChild(div);

const root = createRoot(div);
root.render(<div>Content from content/index.tsx</div>);

var s = document.createElement('script');
// must be listed in web_accessible_resources in manifest.json
s.src = chrome.runtime.getURL('injected.js');
s.onload = function () {
    this.remove();
};

try {
    console.log('content script loaded');
    document.head.appendChild(s);
    console.log(s);
} catch (e) {
    console.error(e);
}
