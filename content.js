// content.js

console.log("Content script started.");

(function() {
  // Prevent multiple injections
  if (document.getElementById('mini-calculator-container')) {
    console.log("Calculator already exists on this page.");
    return;
  }

  console.log("Injecting calculator HTML into the page.");

  // Create container div
  const container = document.createElement('div');
  container.id = 'mini-calculator-container';

  // Calculator HTML Structure
  container.innerHTML = `
    <div id="mini-calculator">
      <div id="header">
        <div id="display">0</div>
        <button id="close-calculator">×</button>
      </div>
      <div class="buttons">
        <button class="btn" data-value="7">7</button>
        <button class="btn" data-value="8">8</button>
        <button class="btn" data-value="9">9</button>
        <button class="btn operator" data-value="/">/</button>

        <button class="btn" data-value="4">4</button>
        <button class="btn" data-value="5">5</button>
        <button class="btn" data-value="6">6</button>
        <button class="btn operator" data-value="*">*</button>

        <button class="btn" data-value="1">1</button>
        <button class="btn" data-value="2">2</button>
        <button class="btn" data-value="3">3</button>
        <button class="btn operator" data-value="-">-</button>

        <button class="btn" data-value="0">0</button>
        <button class="btn" data-value=".">.</button>
        <button class="btn" id="clear">C</button>
        <button class="btn operator" data-value="+">+</button>

        <button class="btn equals" id="equals">=</button>
      </div>
    </div>
  `;

  // Append calculator to the body
  document.body.appendChild(container);
  console.log("Calculator HTML injected successfully.");

  // Inject the calculator.js script
  console.log("Requesting calculator.js URL from background script.");
  chrome.runtime.sendMessage({ action: "getResourceURLs" }, function(response) {
    if (chrome.runtime.lastError) {
      console.error("Error sending message to background script:", chrome.runtime.lastError);
      return;
    }

    if (response && response.jsURL) {
      console.log("Received calculator.js URL:", response.jsURL);
      const script = document.createElement('script');
      script.src = response.jsURL;
      script.onload = function() {
        console.log("calculator.js loaded successfully.");
        this.remove(); // Remove script tag after execution
      };
      script.onerror = function() {
        console.error("Failed to load calculator.js from URL:", response.jsURL);
      };
      document.body.appendChild(script);
    } else {
      console.error("Failed to retrieve calculator.js URL from background script.");
    }
  });
})();
