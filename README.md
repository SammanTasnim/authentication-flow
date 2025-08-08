# BitMascot Automation – Playwright Test Suite

## 📌 Project Overview

This project contains end-to-end (E2E) automated tests for the **EventBookings** application using [Playwright](https://playwright.dev/). It verifies key functionalities related to authentication, including login and signup flows.

---

## 🚀 How to Set Up and Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SammanTasnim/authentication-flow
cd authentication-flow
```

### 2️⃣ Configure Credentials

Set your environment variables or update your config file with the following test credentials:

```bash
VALID_EMAIL=testuser1@gmail.com
VALID_PASSWORD=aA#.1234
```

---

## 🧪 Running Tests

### ▶️ Run a Specific Test Scenario
```bash
npx playwright test --grep "Test scenario name"
```

### 🏷️ Run Tests by Tag
```bash
npx playwright test --grep "@tagname"
```

### 📦 Run the Full Test Suite
```bash
npx playwright test
```

---

## 📊 Test Coverage Summary

### 🔐 Login
-  Valid credentials
-  Invalid credentials
-  Field validations

### 📝 Signup
-  Invalid credentials
-  Valid credentials
-  Field validations
-  Successful signup with dashboard screenshot

---

## ⚠️ CAPTCHA Limitations

CAPTCHA prevents automated login during test recording. This limitation affects scenarios where the user is already logged in and attempts to record actions.
