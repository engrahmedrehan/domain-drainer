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
- [cite_start]`background.js`: Manages the extension lifecycle and background processes. [cite: 1]
- [cite_start]`content.js`: Handles interactions with the web pages you visit. [cite: 2]
- `popup.html`: The main user interface when clicking the extension icon.
- [cite_start]`hacker.css`: Custom styling for a specialized "terminal" look and feel. [cite: 6]
- [cite_start]`icons/`: High-resolution branding assets. 

## 📄 License
[Insert License Type, e.g., MIT]
