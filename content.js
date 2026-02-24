let overlayActive = false;
let tooltip = null;
let currentTarget = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleOverlay") {
    overlayActive = !overlayActive;
    overlayActive ? enableOverlay() : disableOverlay();
    sendResponse({ status: overlayActive ? "active" : "inactive" });
  }
  if (request.action === "collectAssets") {
    sendResponse({ assets: collectAllAssets() });
  }
});

function enableOverlay() {
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'asset-thief-tooltip';
    document.body.appendChild(tooltip);
  }
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('keydown', handleKeyDown);
}

function disableOverlay() {
  if (tooltip) tooltip.remove();
  tooltip = null;
  document.removeEventListener('mouseover', handleMouseOver);
  document.removeEventListener('keydown', handleKeyDown);
  document.querySelectorAll('.thief-outline').forEach(el => el.classList.remove('thief-outline'));
}

function handleMouseOver(e) {
  if (!overlayActive) return;
  e.stopPropagation();
  
  if (currentTarget) currentTarget.classList.remove('thief-outline');
  currentTarget = e.target;
  currentTarget.classList.add('thief-outline');

  const styles = window.getComputedStyle(currentTarget);
  const isSvg = currentTarget.tagName.toLowerCase() === 'svg';
  
  tooltip.innerHTML = `
    <div><strong>Font:</strong> ${styles.fontFamily.split(',')[0]}</div>
    <div><strong>Color:</strong> <span style="color:${styles.color}">${styles.color}</span></div>
    ${isSvg ? `<button id="thief-copy-svg">Copy SVG</button>` : ''}
    <div style="margin-top: 5px; font-size: 10px; opacity: 0.8;">Press 'T' for Tailwind</div>
  `;

  const rect = currentTarget.getBoundingClientRect();
  tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
  tooltip.style.left = `${rect.left + window.scrollX}px`;

  if (isSvg) {
    document.getElementById('thief-copy-svg').onclick = () => {
      navigator.clipboard.writeText(currentTarget.outerHTML);
      alert("SVG Copied!");
    };
  }
}

function handleKeyDown(e) {
  if (e.key.toLowerCase() === 't' && currentTarget) {
    const styles = window.getComputedStyle(currentTarget);
    // Basic extraction - a real tool maps these to standard Tailwind scales
    const tw = `bg-[${styles.backgroundColor}] text-[${styles.color}] rounded-[${styles.borderRadius}]`;
    navigator.clipboard.writeText(tw);
    alert(`Copied Tailwind:\n${tw}`);
  }
}

function collectAllAssets() {
  const svgs = Array.from(document.querySelectorAll('svg')).map((svg, i) => ({
    name: `icon-${i}.svg`,
    data: svg.outerHTML
  }));
  
  const imgs = Array.from(document.querySelectorAll('img')).map(img => img.src);
  
  return { svgs, imgs };
}