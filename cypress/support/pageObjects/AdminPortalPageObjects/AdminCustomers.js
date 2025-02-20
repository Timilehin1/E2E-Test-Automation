///<reference types ='Cypress'/>

const customersNav = 'div[data-amp-testid="sidenav-customers"]'
const businessNav = 'div[data-amp-testid="sidenav-business"]'
const businessTableHeadings = 'thead[class="ng-star-inserted"]'
const businessListing = '.mdc-data-table__content'
const searchBusinessBtn = '.search-input'
const headings = ['Company ID', 'Company Name', 'Blacklisted', 'Status', 'Registered On', '']
const createBusinessBtn = 'button[data-amp-testid="create-business-btn"]'
const fullnameField = '#fullNameId'
const businessEmailField = '#emailAddress'
const phoneNumberField = '#phoneNumberId'
const businessNameField = '#businessNameId'
const selectBusinesscategory = '#mat-select-value-1'
const createBusinessActn = 'span[class="text-sm font-bold"]'
const businessActionsBtn = 'button[data-amp-testid="business-action-btn"]'
const deactivateBtn = 'button[data-amp-testid="activate-business-button"]'
const successModal = 'p[class="text-base text-center text-gray-600"]'
const confirmationModal = 'p[class="text-base text-gray-600"]'
const dismissBtn = '.w-full >.mat-mdc-button-touch-target'
const confirmDeactivationBtn = 'span[class="font-bold"]'
const statusColumn = 'td.mat-column-status'
const companyNameColumn = '.mat-column-company_name'
const filterDrpdwn = '.cdk-menu-trigger'
const filterCheckBox = '.mat-mdc-checkbox'
const businessTypeCheckbox = '#mat-mdc-checkbox-3-input'
const applyFilterBtn = 'div[class="flex flex-row items-center justify-center w-full px-2"]'
const exportBtn = 'button[data-amp-testid="business-table-export-btn"]'
const businessTypeDrpdwn = '#mat-select-value-1'
const statusDrpdwn = '#mat-select-value-1'
const statusOptions = '.mdc-list-item__primary-text'
const resetFilterBtn = '.mdc-button__label > .text-sm'
const businessTypesOptions = '.mdc-list-item'
const emptyTable =
	'div[class="flex h-[405px] w-full flex-col items-center justify-center gap-8 ng-star-inserted"]'

class AdminCustomers {
	viewBusinessCustomers() {
		cy.get(customersNav).should('be.visible').click()
		cy.get(businessNav).should('be.visible').click()
		cy.get(businessTableHeadings)
			.find('th') // Target only header cells
			.then(($headers) => {
				const actualHeadings = [...$headers].map((header) => header.innerText.trim())
				expect(actualHeadings, 'Column Headers').to.deep.equal(headings)
			})
	}

	searchListingTable(searchParam) {
		cy.get(searchBusinessBtn).should('exist').type(searchParam)
	}

	clickBusinessOptions(businessName) {
		cy.get(businessListing)
			.find(companyNameColumn)
			.contains(businessName)
			.parents('tr')
			.within(() => {
				cy.get(businessActionsBtn).should('be.visible').click()
			})
	}
	clickDeactivateBtn() {
		cy.get(deactivateBtn).click()
	}
	confirmDeactivation(message) {
		cy.get(confirmationModal).should('contain', message)
		cy.get(confirmDeactivationBtn).should('contain', 'Confirm').click({ force: true })
	}
	verifySuccessModal(message) {
		cy.get(successModal).should('contain', message)
		cy.get(dismissBtn).click({ force: true })
	}
	validateBusinessStatus(businessName, expectedStatus) {
		cy.get(businessListing)
			.find(companyNameColumn)
			.contains(businessName)
			.parents('tr')
			.within(() => {
				cy.get(statusColumn).should('be.visible').and('contain.text', expectedStatus)
			})
	}
	clickCreateBusinessBtn() {
		cy.get(createBusinessBtn).should('be.visible').click()
	}
	enterFullName(fullName) {
		cy.get(fullnameField).should('be.visible').type(fullName)
	}
	enterBusinessEmail(businessEmail) {
		cy.get(businessEmailField).should('be.visible').type(businessEmail)
	}
	enterBusinessPhoneNumber(phoneNumber) {
		cy.get(phoneNumberField).should('be.visible').type(phoneNumber)
	}
	enterBusinessName(businessName) {
		cy.get(businessNameField).should('be.visible').clear().type(businessName)
	}
	clickBusinesscategoryDrpdown() {
		cy.get(selectBusinesscategory)
			//.should('be.visible')
			.click({ force: true })
	}
	selectBusinesscategory(categoryName) {
		cy.get(businessTypesOptions)
			.should('be.visible')
			.each(($option) => {
				// Trim the text content and match the business type
				if ($option.text().trim() === categoryName) {
					cy.wrap($option).click()
				}
			})
	}

	createBusiness() {
		cy.get(createBusinessActn).should('be.visible').click()
	}

	clickToViewBusinessExist(businessName) {
		cy.get(businessListing)
			.contains(companyNameColumn, businessName)
			.should('exist')
			.click({ force: true })
	}

	checkBusinessExists(businessName) {
		return cy.get('body').then(($body) => {
			// Step 1: Check for the empty table message
			if ($body.find(emptyTable).length > 0) {
				cy.get(emptyTable).should('be.visible')
				cy.log(`${businessName} does not exist. The table is empty.`)
				return false
			}
			// Step 2: If the table has content, check for the business name
			return cy.get(businessListing).then(($rows) => {
				return Cypress._.some($rows, (row) => row.innerText.trim().includes(businessName))
			})
		})
	}

	clickOnFilterBtn() {
		cy.get(filterDrpdwn).click()
	}

	chooseFilterOption(filterOption) {
		cy.get(filterCheckBox).contains(filterOption).click()
	}
	clickApplyFilter() {
		cy.get(applyFilterBtn).should('be.visible').click()
	}

	filterByColumnAndVerify(keyword, shouldContain = true) {
		cy.get(statusDrpdwn).click()
		cy.contains(statusOptions, keyword, { matchCase: false }).click()
		cy.get(businessListing).each(($cell) => {
			cy.wrap($cell).should(shouldContain ? 'contain.text' : 'not.contain.text', keyword)
		})
	}
	clickFilterByBusinessType() {
		cy.get(businessTypeCheckbox).click()
	}

	filterByBusinessType(businessTypeName) {
		cy.get(businessTypeDrpdwn).should('be.visible').click()
		cy.get(businessTypesOptions).should('exist').contains(businessTypeName).click()
	}

	clickResetFilter() {
		cy.get(resetFilterBtn).should('be.visible').click()
	}

	exportBusinessCustomers() {
		cy.get(exportBtn).should('be.visible').click()
		cy.get(confirmationModal).should(
			'contain',
			'You are about to export business data. Do you want to proceed?'
		)
		cy.get(confirmDeactivationBtn).should('contain', 'Confirm').click({ force: true })
		cy.get(successModal).should('contain', 'Business data exported successfully')
		cy.get(dismissBtn).click({ force: true })
	}
}

export const adminCustomers = new AdminCustomers()
