# BitMascot Automation – Playwright Test Suite

## 📌 Project Overview

This project contains end-to-end (E2E) automated tests for the EventBookings application using [Playwright](https://playwright.dev/). It verifies key functionalities for authentications.

---

## 🚀 How to Set Up and Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/SammanTasnim/authentication-flow
cd authentication-flow

## How to configure credentials
VALID_EMAIL=testuser1@gmail.com
VALID_PASSWORD=aA#.1234

## How to run specific
npx playwright test --grep "Test scenarior name"

## How to run the tag
npx playwright test --grep "@tagname"

## How to run the full project
npx playwright test

## Test coverage summary
1. Login
    a. Valid credentials
    b. Invalid credentials
    c. Validations
2. Signup
    a. Invalid credentials
    b. Valid credentials
    c. Validations 
    d. successful signup and screenshot for dashboard




