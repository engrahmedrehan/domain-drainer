document.getElementById('toggle-ui').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: "toggleOverlay" });
});

document.getElementById('download-assets').addEventListener('click', async () => {
  const btn = document.getElementById('download-assets');
  btn.innerText = "Zipping...";
  
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.tabs.sendMessage(tab.id, { action: "collectAssets" }, async (response) => {
    if (!response || !response.assets) {
      btn.innerText = "Error: Refresh Page";
      return;
    }

    const zip = new JSZip();
    const assets = response.assets;

    // 1. Add SVGs to the zip
    const svgFolder = zip.folder("svgs");
    assets.svgs.forEach(svg => {
      svgFolder.file(svg.name, svg.data);
    });

    // 2. Add Image URLs to a text file (avoiding CORS issues for standard images)
    if (assets.imgs.length > 0) {
      zip.file("image_urls.txt", assets.imgs.join('\n'));
    }

    // 3. Generate ZIP and trigger download
    zip.generateAsync({ type: "blob" }).then(function(content) {
      const url = URL.createObjectURL(content);
      chrome.downloads.download({
        url: url,
        filename: "stolen_assets.zip"
      });
      btn.innerText = "Download All Assets (ZIP)";
    });
  });
});