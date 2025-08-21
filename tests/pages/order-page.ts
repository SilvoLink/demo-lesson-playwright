import { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'
import { OrderNotFoundPage } from './order-not-found-page'

export class OrderPage extends BasePage {
  readonly statusButton: Locator
  readonly searchOrderInput: Locator
  readonly searchOrderSubmitButton: Locator

  constructor(page: Page) {
    super(page)
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
