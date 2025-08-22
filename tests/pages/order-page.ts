import { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'
import { OrderNotFoundPage } from './order-not-found-page'

export class OrderPage extends BasePage {
  readonly statusButton: Locator
  readonly searchOrderInput: Locator
  readonly searchOrderSubmitButton: Locator
  readonly logoutButton: Locator
  readonly orderCreationButton: Locator
  readonly usernameInput: Locator
  readonly phoneInput: Locator
  readonly commentInput: Locator
  readonly orderCreatedOkButton: Locator
  readonly phoneInputError: Locator

  constructor(page: Page) {
    super(page)
    this.logoutButton = page.getByTestId('logout-button')
    this.orderCreationButton = page.getByTestId('createOrder-button')
    this.usernameInput = page.getByTestId('username-input')
    this.phoneInput = page.getByTestId('phone-input')
    this.commentInput = page.getByTestId('comment-input')
    this.orderCreatedOkButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.phoneInputError = page.getByTestId('phone-input-error')
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.searchOrderInput = page.getByTestId('searchOrder-input')
    this.searchOrderSubmitButton = page.getByTestId('searchOrder-submitButton')
  }

  async fillOrderIdAndSearch(orderId: string) {
    await this.statusButton.click()
    await this.fillElement(this.searchOrderInput, orderId)
    await this.searchOrderSubmitButton.click()
    return new OrderNotFoundPage(this.page)
  }
}
