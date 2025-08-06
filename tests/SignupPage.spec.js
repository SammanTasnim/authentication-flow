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
  await page.getByText('Please provide your first').click();
  await page.getByText('Please provide your last name.').click();
  await page.getByText('Email address is required.').click();
  await page.getByText('Password is required.', { exact: true }).click();
  await page.getByText('Confirm password is required.').click();
  await expect(page).toHaveURL('/auth/signup');
});