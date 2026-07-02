const form = document.getElementById("registrationForm");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const nextBtn1 = document.getElementById("nextBtn1");
const prevBtn = document.getElementById("prevBtn");
const resetBtn = document.getElementById("resetBtn");

const progressFill = document.getElementById("progressFill");
const indicator1 = document.getElementById("indicator1");
const indicator2 = document.getElementById("indicator2");
const indicator3 = document.getElementById("indicator3");

const fullName = document.getElementById("fullName");
const age = document.getElementById("age");
const address = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");

const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const referenceDoc = document.getElementById("referenceDoc");

const fullNameError = document.getElementById("fullNameError");
const ageError = document.getElementById("ageError");
const addressError = document.getElementById("addressError");
const cityError = document.getElementById("cityError");
const stateError = document.getElementById("stateError");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const referenceDocError = document.getElementById("referenceDocError");

const addressCount = document.getElementById("addressCount");
const summaryBox = document.getElementById("summaryBox");

const ruleUpper = document.getElementById("ruleUpper");
const ruleLower = document.getElementById("ruleLower");
const ruleDigit = document.getElementById("ruleDigit");
const ruleSpecial = document.getElementById("ruleSpecial");
const ruleLength = document.getElementById("ruleLength");

/* ---------------- Utility functions ---------------- */

function showError(input, errorElement, message) {
  input.classList.add("invalid");
  input.classList.remove("valid");
  errorElement.textContent = message;
  return false;
}

function showSuccess(input, errorElement) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  errorElement.textContent = "";
  return true;
}

function clearValidation(input, errorElement) {
  input.classList.remove("invalid", "valid");
  errorElement.textContent = "";
}

/* ---------------- Step switch functions ---------------- */

function goToStep(stepNumber) {
  step1.classList.remove("active");
  step2.classList.remove("active");
  step3.classList.remove("active");

  indicator1.classList.remove("active");
  indicator2.classList.remove("active");
  indicator3.classList.remove("active");

  if (stepNumber === 1) {
    step1.classList.add("active");
    indicator1.classList.add("active");
    progressFill.style.width = "33%";
  } else if (stepNumber === 2) {
    step2.classList.add("active");
    indicator1.classList.add("active");
    indicator2.classList.add("active");
    progressFill.style.width = "66%";
  } else if (stepNumber === 3) {
    step3.classList.add("active");
    indicator1.classList.add("active");
    indicator2.classList.add("active");
    indicator3.classList.add("active");
    progressFill.style.width = "100%";
  }
}

/* ---------------- Validation Step 1 ---------------- */

function validateFullName() {
  const value = fullName.value.trim();
  const regex = /^[A-Za-z ]+$/;

  if (value === "") {
    return showError(fullName, fullNameError, "Full name is required");
  }

  if (value.length < 3) {
    return showError(fullName, fullNameError, "Name must be at least 3 characters");
  }

  if (!regex.test(value)) {
    return showError(fullName, fullNameError, "Only letters and spaces allowed");
  }

  return showSuccess(fullName, fullNameError);
}

function validateAge() {
  const value = age.value.trim();

  if (value === "") {
    return showError(age, ageError, "Age is required");
  }

  const ageNum = Number(value);

  if (isNaN(ageNum)) {
    return showError(age, ageError, "Age must be a number");
  }

  if (ageNum < 15 || ageNum > 100) {
    return showError(age, ageError, "Age must be between 15 and 100");
  }

  return showSuccess(age, ageError);
}

function validateAddress() {
  const value = address.value.trim();

  if (value === "") {
    return showError(address, addressError, "Address is required");
  }

  if (value.length < 5) {
    return showError(address, addressError, "Address must be at least 5 characters");
  }

  if (value.length > 20) {
    return showError(address, addressError, "Address cannot exceed 20 characters");
  }

  return showSuccess(address, addressError);
}

function validateCity() {
  const value = city.value.trim();
  const regex = /^[A-Za-z ]+$/;

  if (value === "") {
    return showError(city, cityError, "City is required");
  }

  if (!regex.test(value)) {
    return showError(city, cityError, "City should contain only letters");
  }

  return showSuccess(city, cityError);
}

function validateState() {
  const value = state.value;

  if (value === "") {
    return showError(state, stateError, "Please select a state");
  }

  return showSuccess(state, stateError);
}

function validateStep1() {
  const isNameValid = validateFullName();
  const isAgeValid = validateAge();
  const isAddressValid = validateAddress();
  const isCityValid = validateCity();
  const isStateValid = validateState();

  return isNameValid && isAgeValid && isAddressValid && isCityValid && isStateValid;
}

/* ---------------- Validation Step 2 ---------------- */

function validateUsername() {
  const value = username.value.trim();

  if (value === "") {
    return showError(username, usernameError, "Username is required");
  }

  if (value.length < 7 || value.length > 8) {
    return showError(username, usernameError, "Username must be 7 to 8 characters");
  }

  return showSuccess(username, usernameError);
}

function updatePasswordRules() {
  const value = password.value;

  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSpecial = /[@#$!%]/.test(value);
  const hasLength = value.length >= 8;

  toggleRule(ruleUpper, hasUpper);
  toggleRule(ruleLower, hasLower);
  toggleRule(ruleDigit, hasDigit);
  toggleRule(ruleSpecial, hasSpecial);
  toggleRule(ruleLength, hasLength);

  return { hasUpper, hasLower, hasDigit, hasSpecial, hasLength };
}

function toggleRule(element, isValid) {
  if (isValid) {
    element.classList.add("valid-rule");
  } else {
    element.classList.remove("valid-rule");
  }
}

function validatePassword() {
  const value = password.value;
  const { hasUpper, hasLower, hasDigit, hasSpecial, hasLength } = updatePasswordRules();

  if (value === "") {
    return showError(password, passwordError, "Password is required");
  }

  if (!(hasUpper && hasLower && hasDigit && hasSpecial && hasLength)) {
    return showError(
      password,
      passwordError,
      "Password must contain uppercase, lowercase, digit, special symbol and 8+ characters"
    );
  }

  return showSuccess(password, passwordError);
}

function validateConfirmPassword() {
  const value = confirmPassword.value;

  if (value === "") {
    return showError(confirmPassword, confirmPasswordError, "Please confirm your password");
  }

  if (value !== password.value) {
    return showError(confirmPassword, confirmPasswordError, "Passwords do not match");
  }

  return showSuccess(confirmPassword, confirmPasswordError);
}

function validateReferenceDoc() {
  const file = referenceDoc.files[0];

  if (!file) {
    referenceDocError.textContent = "";
    return true;
  }

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png"
  ];

  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!allowedTypes.includes(file.type)) {
    referenceDocError.textContent = "Only PDF, JPG, JPEG, PNG files are allowed";
    return false;
  }

  if (file.size > maxSize) {
    referenceDocError.textContent = "File size must be less than 2MB";
    return false;
  }

  referenceDocError.textContent = "";
  return true;
}

function validateStep2() {
  const isUsernameValid = validateUsername();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  const isReferenceValid = validateReferenceDoc();

  return isUsernameValid && isPasswordValid && isConfirmPasswordValid && isReferenceValid;
}

/* ---------------- Event Listeners ---------------- */

// Step 1 live validation
fullName.addEventListener("input", validateFullName);
age.addEventListener("input", validateAge);
address.addEventListener("input", () => {
  addressCount.textContent = `${address.value.length}/20`;
  validateAddress();
});
city.addEventListener("input", validateCity);
state.addEventListener("change", validateState);

// Step 2 live validation
username.addEventListener("input", validateUsername);
password.addEventListener("input", () => {
  validatePassword();
  if (confirmPassword.value.trim() !== "") {
    validateConfirmPassword();
  }
});
confirmPassword.addEventListener("input", validateConfirmPassword);
referenceDoc.addEventListener("change", validateReferenceDoc);

// Next button
nextBtn1.addEventListener("click", () => {
  if (validateStep1()) {
    goToStep(2);
  }
});

// Previous button
prevBtn.addEventListener("click", () => {
  goToStep(1);
});

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateStep2()) {
    summaryBox.innerHTML = `
      <p><strong>Full Name:</strong> ${fullName.value}</p>
      <p><strong>Age:</strong> ${age.value}</p>
      <p><strong>Address:</strong> ${address.value}</p>
      <p><strong>City:</strong> ${city.value}</p>
      <p><strong>State:</strong> ${state.value}</p>
      <p><strong>Username:</strong> ${username.value}</p>
      <p><strong>Reference File:</strong> ${
        referenceDoc.files[0] ? referenceDoc.files[0].name : "Not uploaded"
      }</p>
    `;

    goToStep(3);
  }
});

// Reset form
resetBtn.addEventListener("click", () => {
  form.reset();

  // clear all errors and styles
  [
    [fullName, fullNameError],
    [age, ageError],
    [address, addressError],
    [city, cityError],
    [state, stateError],
    [username, usernameError],
    [password, passwordError],
    [confirmPassword, confirmPasswordError]
  ].forEach(([input, error]) => {
    clearValidation(input, error);
  });

  referenceDocError.textContent = "";
  addressCount.textContent = "0/20";

  ruleUpper.classList.remove("valid-rule");
  ruleLower.classList.remove("valid-rule");
  ruleDigit.classList.remove("valid-rule");
  ruleSpecial.classList.remove("valid-rule");
  ruleLength.classList.remove("valid-rule");

  summaryBox.innerHTML = "";
  goToStep(1);
});

// initial
goToStep(1);
