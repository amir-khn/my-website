/**
 * Safely converts an input or value into a finite number.
 * Returns null when empty or non-numeric so callers can handle it cleanly.
 */
function parseNumberInput(rawValue) {
  if (rawValue === null || rawValue === undefined) {
    return null;
  }

  const trimmed = String(rawValue).trim();
  if (trimmed === "") {
    return null;
  }

  const num = Number(trimmed);
  return Number.isFinite(num) ? num : null;
}

/**
 * Reads two numeric inputs from the page, adds them as numbers,
 * and updates the output element without throwing TypeErrors.
 */
function handleCalculation(event) {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }

  const inputOne = document.getElementById("num1");
  const inputTwo = document.getElementById("num2");
  const resultBox = document.getElementById("result");

  // Guard against missing DOM elements (prevents TypeError on null)
  if (!inputOne || !inputTwo || !resultBox) {
    console.warn("Required DOM elements (#num1, #num2, #result) were not found.");
    return;
  }

  const firstNumber = parseNumberInput(inputOne.value);
  const secondNumber = parseNumberInput(inputTwo.value);

  if (firstNumber === null || secondNumber === null) {
    resultBox.textContent = "Please enter valid numbers in both fields.";
    return;
  }

  const total = firstNumber + secondNumber;
  resultBox.textContent = `Total: ${total}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calc-form");
  const button = document.getElementById("calculate-btn");

  if (form) {
    form.addEventListener("submit", handleCalculation);
  } else if (button) {
    button.addEventListener("click", handleCalculation);
  }
});
