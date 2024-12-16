// calculator.js

console.log("calculator.js loaded successfully.");

(function() {
  try {
    console.log("Initializing calculator functionality.");

    const calculator = document.getElementById('mini-calculator');
    if (!calculator) {
      console.error("Calculator element not found.");
      return;
    }
    console.log("Calculator element found.");

    // Corrected: Use querySelector to find the display within the calculator
    const display = calculator.querySelector('#display');
    if (!display) {
      console.error("Display element not found.");
      return;
    }
    console.log("Display element found.");

    // Corrected: Use querySelectorAll to find all buttons with the class 'btn'
    const buttons = calculator.querySelectorAll('.btn');
    if (buttons.length === 0) {
      console.error("No calculator buttons found.");
      return;
    }
    console.log(`Found ${buttons.length} calculator buttons.`);

    // Corrected: Use querySelector to find the close button
    const closeBtn = calculator.querySelector('#close-calculator');
    if (!closeBtn) {
      console.error("Close button not found.");
      return;
    }
    console.log("Close button found.");

    let currentInput = '';
    let operator = null;
    let previousInput = '';

    // Function to update the display
    function updateDisplay(value) {
      display.textContent = value;
      console.log(`Display updated to: ${value}`);
    }

    // Function to perform calculations
    function calculate(a, b, op) {
      console.log(`Calculating: ${a} ${op} ${b}`);
      a = parseFloat(a);
      b = parseFloat(b);
      let result = 0;
      switch(op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': 
          if (b !== 0) {
            result = a / b; 
          } else {
            result = 'Error';
            console.warn("Division by zero attempted.");
          }
          break;
        default: 
          console.warn(`Unknown operator: ${op}`);
          result = 0;
      }
      console.log(`Result: ${result}`);
      return result;
    }

    // Handle button clicks
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        const id = button.getAttribute('id');
        console.log(`Button clicked: ${value || id}`);

        if (id === 'clear') {
          currentInput = '';
          previousInput = '';
          operator = null;
          updateDisplay('0');
          console.log("Calculator cleared.");
        } else if (id === 'equals') {
          if (operator && currentInput !== '') {
            const result = calculate(previousInput, currentInput, operator);
            updateDisplay(result);
            currentInput = result.toString();
            operator = null;
            previousInput = '';
            console.log("Calculation completed.");
          } else {
            console.log("Insufficient data for calculation.");
          }
        } else if (button.classList.contains('operator')) {
          if (currentInput === '' && previousInput !== '') {
            operator = value;
            console.log(`Operator changed to: ${operator}`);
          } else {
            if (previousInput !== '') {
              const result = calculate(previousInput, currentInput, operator);
              updateDisplay(result);
              previousInput = result.toString();
              console.log(`Intermediate result: ${result}`);
            } else {
              previousInput = currentInput;
              console.log(`Previous input set to: ${previousInput}`);
            }
            operator = value;
            currentInput = '';
            console.log(`Operator set to: ${operator}`);
          }
        } else {
          currentInput += value;
          updateDisplay(currentInput);
          console.log(`Current input: ${currentInput}`);
        }
      });
    });

    // Close calculator
    closeBtn.addEventListener('click', () => {
      const container = document.getElementById('mini-calculator-container');
      if (container) {
        container.remove();
        console.log("Calculator closed by user.");
      } else {
        console.warn("Calculator container not found during close.");
      }
    });

    // Draggable functionality
    const header = calculator.querySelector('#header');
    if (!header) {
      console.error("Header element not found for dragging.");
      return;
    }
    console.log("Header element found for dragging.");

    let isDragging = false;
    let offset = { x: 0, y: 0 };

    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      offset.x = e.clientX - calculator.getBoundingClientRect().left;
      offset.y = e.clientY - calculator.getBoundingClientRect().top;
      calculator.style.cursor = 'grabbing';
      console.log("Dragging started.");
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        calculator.style.left = `${e.clientX - offset.x}px`;
        calculator.style.top = `${e.clientY - offset.y}px`;
        calculator.style.bottom = 'auto';
        calculator.style.right = 'auto';
        console.log(`Calculator moved to: (${calculator.style.left}, ${calculator.style.top})`);
      }
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        calculator.style.cursor = 'move';
        // Save position
        const rect = calculator.getBoundingClientRect();
        localStorage.setItem('calcLeft', `${rect.left}px`);
        localStorage.setItem('calcTop', `${rect.top}px`);
        console.log("Dragging ended and position saved.");
      }
    });

    // Load saved position
    const savedLeft = localStorage.getItem('calcLeft');
    const savedTop = localStorage.getItem('calcTop');
    if (savedLeft && savedTop) {
      calculator.style.left = savedLeft;
      calculator.style.top = savedTop;
      calculator.style.bottom = 'auto';
      calculator.style.right = 'auto';
      console.log(`Loaded saved position: (${savedLeft}, ${savedTop})`);
    }

    console.log("Calculator functionality initialized successfully.");
  } catch (error) {
    console.error("An error occurred in calculator.js:", error);
  }
})();
