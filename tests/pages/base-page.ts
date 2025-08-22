import { expect, Locator, Page, test } from '@playwright/test'

export abstract class BasePage {
  readonly page: Page
  readonly languageSwitcher: Locator
  readonly privacyPolicyLink: Locator
  readonly cookiePolicyLink: Locator
  readonly termsOfServiceLink: Locator
  readonly TIMEOUT_VISIBILITY: number = 5000

  protected constructor(page: Page) {
    this.page = page
    this.languageSwitcher = page.locator('div.language')
    this.privacyPolicyLink = page.getByTestId('privacy-policy')
    this.cookiePolicyLink = page.getByTestId('cookie-policy')
    this.termsOfServiceLink = page.getByTestId('terms-of-service')
  }

  async checkElementVisibility(element: Locator): Promise<void> {
    await test.step(`Verifying element visibility: ${element}`, async () => {
      await expect(element).toBeVisible({ timeout: this.TIMEOUT_VISIBILITY })
    })
  }

  async verifyFooterElements(): Promise<void> {
    await test.step('Verify footer elements', async () => {
      await this.checkElementVisibility(this.languageSwitcher)
      await this.checkElementVisibility(this.privacyPolicyLink)
      await this.checkElementVisibility(this.cookiePolicyLink)
      await this.checkElementVisibility(this.termsOfServiceLink)
    })
  }

  async clickElement(element: Locator) {
    await test.step(`Clicking element: ${element}`, async () => {
      await element.click()
    })
  }

  async fillElement(element: Locator, text: string) {
    await test.step(`Filling element: ${element}`, async () => {
      await element.fill(text)
    })
  }
}
