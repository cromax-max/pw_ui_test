const { user } = require('../user.js');
const { test, expect } = require('@playwright/test');

test.use({
  headless: false,
  browserName: 'chromium',
  baseURL: 'https://netology.ru',
});

test.beforeEach(async ({ page }) => {
  await page.goto('/?modal=sign_in');
});

test('Successful Auth', async ({ page }) => {
  await page.fill("[placeholder='Email']", user.email);
  await page.fill("[placeholder='Пароль']", user.password);
  page.click("//button[text()='Войти']");
  await expect(
    page.locator('.components-pages-Profile-Programs--title--NCjbp')
  ).toHaveText('Мои курсы и профессии');
});

test('Unsuccessful Auth', async ({ page }) => {
  await page.fill("[placeholder='Email']", user.email);
  await page.fill("[placeholder='Пароль']", `${user.password}!`);
  page.click("//button[text()='Войти']");
  await expect(
    page.locator('.components-ui-Form-Hint--hint--A2dPV')
  ).toHaveText('Вы ввели неправильно логин или пароль');
});

test.afterEach(async ({ context }) => {
  await context.close();
});
