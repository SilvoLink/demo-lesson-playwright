import { Locator, Page } from '@playwright/test'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  // add more locators here
  readonly logoutButton: Locator
  readonly orderCreationButton: Locator
  readonly usernameInput: Locator
  readonly phoneInput: Locator
  readonly commentInput: Locator
  readonly orderCreatedOkButton: Locator
  readonly phoneInputError: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.logoutButton = page.getByTestId('logout-button')
    this.orderCreationButton = page.getByTestId('createOrder-button')
    this.usernameInput = page.getByTestId('username-input')
    this.phoneInput = page.getByTestId('phone-input')
    this.commentInput = page.getByTestId('comment-input')
    this.orderCreatedOkButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.phoneInputError = page.getByTestId('phone-input-error')
  }
}
