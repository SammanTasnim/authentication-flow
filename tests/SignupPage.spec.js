import { test, expect } from '@playwright/test';

async function navigateToSignup(page) {
  await page.goto('/auth/signup');
}

async function fillSignupForm(page, firstName, lastName, email, password) {
  await page.getByRole('textbox', { name: 'First name' }).fill(firstName);
  await page.getByRole('textbox', { name: 'Last name' }).fill(lastName);
  await page.getByRole('textbox', { name: 'Email address' }).fill(email);
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill(password);
}

async function submitSignup(page) {
  await page.getByRole('button', { name: 'Sign up' }).click();
}

test('Signup with existing email address', async ({ page }) => {
  await navigateToSignup(page);
  await fillSignupForm(page, 'help', 'help', 'testuser1@gmail.com', 'aA#.1234');
  await submitSignup(page);
  await expect(page.getByText("Email 'testuser1@gmail.com' is already taken.")).toBeVisible();
  await expect(page).toHaveURL('/auth/signup');
  
});

test('All empty field validations check', async ({ page }) => {
  await navigateToSignup(page);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByText('Please provide your first');
  await page.getByText('Please provide your last name.')();
  await page.getByText('Email address is required.');
  await page.getByText('Password is required.', { exact: true }).click();
  await page.getByText('Confirm password is required.').click();
  await expect(page).toHaveURL('/auth/signup');
  await page.getByRole('textbox', { name: 'Email address' }).fill('sdasd');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByText('Please enter a valid email');
});

test('Signup with valid credentials', async ({ page }) => {
  await navigateToSignup(page);
  await fillSignupForm(page, 'help', 'help', 'txestussser1sssss2s@gmail.com', 'aA#.1234');
  await submitSignup(page);
  await page.waitForTimeout(3000); 
  // check login success
  await expect(page.getByText('Please verify your email address')).toBeVisible();
});

test('Signup and take screenshot', async ({ page }) => {
  await navigateToSignup(page);
  await fillSignupForm(page, 'help', 'help', 'txdsfdsfessssssstssssudssser1sssssss2s@gmail.com', 'aA#.1234');
  await submitSignup(page);
  await page.waitForTimeout(3000); 
  // check login success
  await page.screenshot({ path: 'screenshots/signup-successs.png', fullPage: true });
  
});