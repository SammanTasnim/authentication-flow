import { test, expect } from '@playwright/test';

// Helper functions for the Login Page
async function navigateToLogin(page) {
  await page.goto('/auth/signin');
}

async function loginWithCredentials(page, email, password) {
  await page.getByRole('textbox', { name: 'Email address' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
}

async function isLoginSuccessful(page) {
  // Replace with an element/text that only appears after login
  return await page.getByText('Dashboard', { timeout: 5000 }).isVisible();
}

test('Page elements visibility @elements', async ({ page }) => {
  await navigateToLogin(page);

  await expect(page.getByText('Email address')).toBeVisible();
  await expect(page.getByText('Password', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(page.locator('#togglePasswordVisibility img')).toBeVisible();
  await expect(page.getByText('Remember me')).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Remember me' }).locator('div')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
});

test('Empty form submission validations @validations', async ({ page }) => {
  await navigateToLogin(page);

  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByText('Email address is required').click();
  await page.getByText('Password is required').click();
});

test('Invalid/wrong password @login', async ({ page }) => {
  await navigateToLogin(page);

  await page.getByRole('textbox', { name: 'Email address' }).fill('asfsa@email.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('jshafsahjfgsahj');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByText('Email or password is wrong')).toBeVisible();
});

test('Non existing user @login', async ({ page }) => {
  await navigateToLogin(page);

  await page.getByRole('textbox', { name: 'Email address' }).fill('dsadfsajdgsasjhdgfsahjfd@email.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('jshafsahjfgsahj');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByText('Email or password is wrong')).toBeVisible();
});

test('Login with valid users @login', async ({ page }) => {
  await navigateToLogin(page);

  await page.getByRole('textbox', { name: 'Email address' }).fill('testuser1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('aA#.1234');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.screenshot({ path: 'after-login.png', fullPage: true });
  console.log(await page.content()); // dump page HTML for inspection

  // Use regex to match the URL, ignoring dynamic parameters
  await expect(page.locator('text=Highlights')).toBeVisible({ timeout: 15000 });

});
