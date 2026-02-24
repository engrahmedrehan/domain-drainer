#Domain Drainer

Domain Drainer is a lightweight, high-performance Chrome Extension (Manifest V3) designed for security researchers and web developers. It provides a specialized environment for analyzing web domains and managing visual assets directly from the browser.

## 🚀 Key Features
- **Asset Inspection**: Instantly scans active tabs to identify and preview embedded visual elements.
- **Manifest V3 Compliant**: Built using the latest Chrome Extension standards for enhanced security, privacy, and long-term support.
- **Developer UI**: Features a custom-styled "hacker" interface (`hacker.css`) designed for advanced users and power-users.
- **Service Worker Architecture**: Utilizes an efficient background service worker to process requests without impacting browser performance.

## 🛠 Installation (Development Mode)
Since this is a developer tool, you can load it locally:
1. Clone or download this repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the `Domain Drainer` folder (where `manifest.json` is located).

## 📂 Project Structure
├── data/

│   ├── icons/           # High-resolution branding assets

│   └── lib/             # External libraries and dependencies

├── background.js        # Manages extension lifecycle and background processes

├── content.js           # Handles interactions with the web pages you visit

├── popup.html           # Main user interface (popup window)

├── hacker.css           # Custom "terminal-style" styling for the UI

└── manifest.json        # Extension configuration and permissions
