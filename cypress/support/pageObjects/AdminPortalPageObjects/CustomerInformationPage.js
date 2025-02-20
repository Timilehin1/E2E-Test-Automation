///<reference types ='Cypress'/>

const businessActionsBtn = 'button[data-amp-testid="view-business-toolbar-action-btn"]'
const editBusinessBtn = 'button[data-amp-testid="edit-business-button"]'
const editBusinessInfoBtn = 'span[class="text-sm font-bold"]'
const fullNameField = '#fullName'
const emailField = '#email'
const businessNameField = '#businessName'
const businessCategoryField = '#businessCategory'
const repaymentPeriodfield = '#repaymentPeriod'
const statusField = ':nth-child(8) > .w-full'

class CustomerInformationPage {
	viewAdminInfo(businessCustomer) {
		cy.get(fullNameField).should('contain.value', businessCustomer.createdBy)
		cy.get(emailField).should('contain.value', businessCustomer.email)
		cy.get(businessNameField).should('contain.value', businessCustomer.name)
		cy.get(statusField).should('contain.text', businessCustomer.status)
		cy.get(businessCategoryField).should(
			'contain.value',
			businessCustomer.businessType.name.toLowerCase()
		)
		cy.get(repaymentPeriodfield).should('contain.value', businessCustomer.businessType.creditTenure)
	}
	viewLinkedEmail() {}
	addLinkedEmail() {}
	deleteLinkedEmail() {}

	clickActionsBtn() {
		cy.get(businessActionsBtn).should('be.visible').click()
	}

	clickEditBtn() {
		cy.get(editBusinessBtn).should('be.visible').click()
	}

	editBusinessInformation() {
		cy.get(editBusinessInfoBtn).click()
	}
}

export const customerInformationPage = new CustomerInformationPage()
