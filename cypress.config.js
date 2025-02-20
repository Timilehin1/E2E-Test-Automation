const { defineConfig } = require('cypress')
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const host = {
	email: process.env.MP_NONPROD_USER_EMAIL,
	password: process.env.MP_NONPROD_USER_PASSWORD,
	pwd: process.env.MP_NONPROD_DYNAMIC_USERS_PASSWORD,
	api_token: '',
}

module.exports = defineConfig({
	projectId: '6k77ge',
	viewportHeight: 920,
	viewportWidth: 1360,
	defaultCommandTimeout: 20000,
	requestTimeout: 10000,
	responseTimeout: 50000,
	//reporter: 'cypress-mochawesome-reporter',

	reporterOptions: {
		reportDir: 'cypress/report',
		charts: true,
		reportPageTitle: 'Regression Tests',
		embeddedScreenshots: true,
	},
	e2e: {
		baseUrl: 'https://admin-portal-dev.vendease.com/',
		env: {
			env: 'dev',
			api_base_url: 'https://admin-service-dev.vendease.com/v1',
			api_token: '',
			host,
		},
		setupNodeEvents(on, config) {
			on('task', { downloadFile })
			// implement node event listeners here
		},
	},
})
