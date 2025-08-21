import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'

test('signIn button disabled when incorrect data inserted', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
})

test('login with correct credentials and verify order creation page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.logoutButton).toBeVisible()
  await expect(orderCreationPage.orderCreationButton).toBeVisible()
})

test('login and create order successfully', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.usernameInput.fill('test-customer-name')
  await orderCreationPage.phoneInput.fill('55443322')
  await orderCreationPage.commentInput.fill('test-comment')
  await orderCreationPage.orderCreationButton.click()
  await expect(orderCreationPage.orderCreatedOkButton).toBeVisible()
})

test('login and logout', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.click()
  await expect(authPage.signInButton).toBeVisible()
})

test('login and check order creation disabled when phone not filled', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.usernameInput.fill('12')
  await expect(orderCreationPage.orderCreationButton).toBeDisabled()
})

test('login and check phone validation error when phone number is not correct', async ({
  page,
}) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.usernameInput.fill('12')
  await orderCreationPage.phoneInput.fill('12345')
  await expect(orderCreationPage.phoneInputError).toBeVisible()
  await expect(orderCreationPage.orderCreationButton).toBeDisabled()
})
