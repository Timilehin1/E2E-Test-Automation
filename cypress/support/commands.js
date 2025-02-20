import 'cypress-file-upload'

const api = Cypress.env('api_base_url')

Cypress.Commands.add('getToken', () => {
	const doLogin = () => {
		if (Cypress.env('environment') === 'staging') {
			Cypress.env('user', Cypress.env('STAGING_USER'))
		} else if (Cypress.env('environment') === 'prod') {
			Cypress.env('user', Cypress.env('PROD_USER'))
		} else {
			Cypress.env('user', Cypress.env('DEV_USER'))
		}

		return cy
			.request({
				method: 'POST',
				url: `${api}/auth`,
				body: {
					emailOrPhoneNumber: Cypress.env('user').emailOrPhoneNumber,
					password: Cypress.env('user').password,
				},
				retryOnStatusCodeFailure: true,
			})
			.then((response) => {
				if (response.status === 200 && response.body.accessToken) {
					const token = response.body.accessToken
					Cypress.env('api_token', token) // Store in Cypress environment
					cy.wrap(token) // Wrap the token to return it asynchronously
				} else if ([400, 401, 500, 502].includes(response.status)) {
					cy.log(`Login failed with status code: ${response.status}`)
					return doLogin() // Retry login
				} else {
					throw new Error(`Login failed. Code: ${response.status}`)
				}
			})
	}
	return doLogin()
})
Cypress.Commands.add('apiLogin', () => {
	if (Cypress.env('environment') === 'staging') {
		Cypress.env('user', Cypress.env('STAGING_USER'))
	} else if (Cypress.env('environment') === 'prod') {
		Cypress.env('user', Cypress.env('PROD_USER'))
	} else {
		Cypress.env('user', Cypress.env('DEV_USER'))
	}
	cy.getToken().then((token) => {
		cy.request({
			method: 'POST',
			url: `${api}/auth`,
			body: {
				emailOrPhoneNumber: Cypress.env('user').emailOrPhoneNumber,
				password: Cypress.env('user').password,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-tenant-id': 'x-tenant-id',
			},
		}).then((response) => {
			expect(response.status).to.oneOf([200, 201], 'API returned the expected status code')
			cy.log('Response:', response)
			console.log(response)
			const userId = response.body.user.id
			cy.wrap(userId)
		})
	})
})

Cypress.Commands.add('login', () => {
	if (Cypress.env('environment') === 'staging') {
		Cypress.env('user', Cypress.env('STAGING_USER'))
	} else if (Cypress.env('environment') === 'prod') {
		Cypress.env('user', Cypress.env('PROD_USER'))
	} else {
		Cypress.env('user', Cypress.env('DEV_USER'))
	}
	cy.visit('/')
	cy.get('#emailOrPhoneNumber')
		.should('exist')
		.clear()
		.type(Cypress.env('user').emailOrPhoneNumber, { log: false })
	cy.get('#password').should('exist').clear().type(Cypress.env('user').password, { log: false })
	cy.get('button[data-rms-testid="login-btn"]').should('exist').click()
})

Cypress.Commands.add('createFailedDeliveryReason', (FailedDeliveryReason) => {
	cy.getToken().then((token) => {
		cy.request({
			method: 'POST',
			url: 'https://procurement-be-dev.vendease.com/v1/reason',
			body: FailedDeliveryReason,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-tenant-id': 'x-tenant-id',
			},
		}).then((response) => {
			expect(response.status).to.oneOf([200, 201], 'API returned the expected status code')
			cy.log('Response:', response)
			console.log(response)
			const reasonId = response.body.id
			return cy.wrap(reasonId)
		})
	})
})
Cypress.Commands.add('getFailedDeliveryReasons', () => {
	cy.getToken().then((token) => {
		cy.request({
			method: 'GET',
			url: `https://procurement-be-dev.vendease.com/v1/reason`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-tenant-id': 'x-tenant-id',
			},
		}).then((response) => {
			expect(response.status).to.be.oneOf([200, 201])
			cy.log(response.body)
			const reasonId = response.body.data[0].id // Safely access the id
			if (!reasonId) {
				throw new Error('Reason ID is null or undefined.')
			}
			cy.log('Reason ID:', reasonId)
			return cy.wrap(reasonId) // Return the ID
		})
	})
})
Cypress.Commands.add('deleteFailedDeliveryReason', () => {
	cy.getToken().then((token) => {
		cy.getFailedDeliveryReasons().then((reasonId) => {
			cy.request({
				method: 'DELETE',
				url: `https://business-service-dev.vendease.com/v1/reason/${reasonId}`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'x-tenant-id': 'x-tenant-id',
				},
			}).then((response) => {
				expect(response.status).to.be.oneOf([200, 201], 'API returned the expected status code')
				cy.log('Deleted Reason Response:', response.body)
			})
		})
	})
})

Cypress.Commands.add('createCurrency', (currencyData) => {
	cy.getToken().then((token) => {
		cy.request({
			method: 'POST',
			url: 'https://business-service-dev.vendease.com/v1/currencies',
			body: currencyData,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-tenant-id': 'x-tenant-id',
			},
		}).then((response) => {
			expect(response.status).to.oneOf([200, 201], 'API returned the expected status code')
			cy.log('Response:', response.body)
			console.log(response)
			const currencyName = response.body.data.name
			const currencyId = response.body.data.id
			console.log(response.body.data[0])
			cy.log(response.body.data[0])

			console.log(currencyName)
			cy.log(currencyName)
			cy.log(currencyId)
			return cy.wrap(currencyId)
		})
	})
})
Cypress.Commands.add('getCurrency', () => {
	cy.apiLogin().then(() => {
		const api = 'business-service-dev.vendease.com/v1'
		cy.request({
			method: 'GET',
			url: `${api}/currencies`,
			headers: {
				'content-type': 'application/json',
			},
		}).then((response) => {
			expect(response.status).to.be.oneOf([200, 201])
			const currencyName = response.body.data[0].name
			cy.log(currencyName)
			const currencyId = response.body.data[0]?.id // Safely access the id
			if (!currencyId) {
				throw new Error('Currency ID is null or undefined.')
			}
			cy.log('Currency ID:', currencyId)
			return cy.wrap(currencyId) // Return the ID
		})
	})
})
Cypress.Commands.add('deleteCurrency', () => {
	cy.getToken().then((token) => {
		cy.getCurrency().then((currencyId) => {
			cy.request({
				method: 'DELETE',
				url: `https://business-service-dev.vendease.com/v1/currencies/${currencyId}`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'x-tenant-id': 'x-tenant-id',
				},
			}).then((response) => {
				expect(response.status).to.be.oneOf([200, 201], 'API returned the expected status code')
				cy.log('Deleted Currency Response:', response.body)
			})
		})
	})
})
Cypress.Commands.add('createCountry', (countryData) => {
	cy.getToken().then((token) => {
		cy.getCurrency().then((currencyId) => {
			cy.request({
				method: 'POST',
				url: `https://business-service-dev.vendease.com/v1/countries`,
				body: {
					name: countryData.name,
					code: countryData.code,
					phoneCode: countryData.phoneCode,
					currencyId: currencyId,
					minimumOrderAmount: countryData.minimumOrderAmount,
					valueAddedTax: countryData.valueAddedTax,
				},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'x-tenant-id': 'x-tenant-id',
				},
			}).then((response) => {
				expect(response.status).to.be.oneOf([200, 201], 'API returned the expected status code')
				const countryName = response.body.name
				const countryId = response.body.id
				if (!countryId) {
					throw new Error('Country ID is null or undefined.')
				}
				cy.log(countryName, countryId)
				return cy.wrap(countryName)
			})
		})
	})
})
Cypress.Commands.add('getCountries', () => {
	cy.getToken().then((token) => {
		cy.request({
			method: 'GET',
			url: `https://business-service-dev.vendease.com/v1/countries`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-tenant-id': 'x-tenant-id',
			},
		}).then((response) => {
			expect(response.status).to.eql(200)
			console.log(response.body.data[1])
			const countryName = response.body.data[1].name
			const countryId = response.body.data[1].id
			cy.log(countryId, countryName)
			return cy.wrap(countryName)
		})
	})
})

Cypress.Commands.add('getCountryData', (countryData) => {
	cy.getToken().then((token) => {
		cy.request({
			method: 'GET',
			url: 'https://business-service-dev.vendease.com/v1/countries',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-tenant-id': 'x-tenant-id',
			},
		}).then((response) => {
			expect(response.status).to.eql(200)
			// Filter the response data to find the country that matches countryData
			const matchingCountry = response.body.data.find(
				(country) => country.name === countryData.name
			)
			// Validate and log the matching country
			if (matchingCountry) {
				const { id, name } = matchingCountry
				cy.log(`Country Name: ${name}, ID: ${id}`)
				console.log(`Country Name: ${name}, ID: ${id}`)
				// Return country data
				return cy.wrap({ id, name })
			} else {
				throw new Error(`Country with name '${countryData.name}' not found.`)
			}
		})
	})
})

Cypress.Commands.add('updateCountryStatus', (countryName) => {
	cy.getToken().then((token) => {
		cy.getCountryData(countryName).then((country) => {
			const { id } = country
			cy.request({
				method: 'PATCH',
				url: `https://business-service-dev.vendease.com/v1/countries/${id}/status`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'x-tenant-id': 'x-tenant-id',
				},
			}).then((response) => {
				expect(response.status).to.eql(200)
				console.log(response)
				const status = response.statusText
				cy.log(`Status updated to: ${status}`)
			})
		})
	})
})

Cypress.Commands.add('getState', (stateData) => {
	cy.getToken().then((token) => {
		cy.request({
			method: 'GET',
			url: `https://business-service-dev.vendease.com/v1/states?order=ASC&pageSize=100&page=1`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-tenant-id': 'x-tenant-id',
			},
		}).then((response) => {
			expect(response.status).to.eql(200)
			console.log(response.body.data)
			const matchingState = response.body.data.find((state) => state.name === stateData.name)
			if (matchingState) {
				const { id, name } = matchingState
				cy.log(`State Name: ${name}, ID: ${id}`)
				console.log(`State Name: ${name}, ID: ${id}`)
				return cy.wrap({ id, name })
			} else {
				throw new Error(`State with name '${stateData.name}' not found.`)
			}
		})
	})
})

Cypress.Commands.add('updateStateStatus', (stateName) => {
	cy.getToken().then((token) => {
		cy.getState(stateName).then((state) => {
			const { id } = state
			cy.request({
				method: 'PATCH',
				url: `https://business-service-dev.vendease.com/v1/states/${id}/status`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'x-tenant-id': 'x-tenant-id',
				},
			}).then((response) => {
				expect(response.status).to.eql(200)
				console.log(response)
				const status = response.statusText
				cy.log(`Status updated to: ${status}`)
			})
		})
	})
})
Cypress.Commands.add('createState', (stateData, countryData) => {
	cy.getToken().then((token) => {
		cy.getCountryData(countryData).then((country) => {
			const { id } = country
			cy.request({
				method: 'POST',
				url: `https://business-service-dev.vendease.com/v1/states`,
				body: {
					name: stateData.name,
					code: stateData.code,
					countryId: id,
					minimumOrderAmount: stateData.minimumOrderAmount,
				},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'x-tenant-id': 'x-tenant-id',
				},
			}).then((response) => {
				expect(response.status).to.be.oneOf([200, 201], 'API returned the expected status code')
				const stateInfo = response.body.data
				const { name, id } = stateInfo
				if (!stateInfo || !stateInfo.id) {
					throw new Error('Country ID is null or undefined.')
				}
				cy.log(name, id)
				return cy.wrap(name, id)
			})
		})
	})
})

Cypress.Commands.add('getCity', (cityData) => {
	cy.getToken().then((token) => {
		cy.request({
			method: 'GET',
			url: `https://business-service-dev.vendease.com/v1/cities?order=ASC&pageSize=100&page=1`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-tenant-id': 'x-tenant-id',
			},
		}).then((response) => {
			expect(response.status).to.eql(200)
			console.log(response.body.data)
			const matchingCity = response.body.data.find((city) => city.name === cityData.name)
			if (matchingCity) {
				const { id, name } = matchingCity
				cy.log(`City Name: ${name}, ID: ${id}`)
				console.log(`City Name: ${name}, ID: ${id}`)
				return cy.wrap({ id, name })
			} else {
				throw new Error(`City with name '${cityData.name}' not found.`)
			}
		})
	})
})
Cypress.Commands.add('updateCityStatus', (cityName) => {
	cy.getToken().then((token) => {
		cy.getCity(cityName).then((city) => {
			const { id } = city
			cy.request({
				method: 'PATCH',
				url: `https://business-service-dev.vendease.com/v1/cities/${id}/status`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'x-tenant-id': 'x-tenant-id',
				},
			}).then((response) => {
				expect(response.status).to.eql(200)
				console.log(response)
				const status = response.statusText
				cy.log(`Status updated to: ${status}`)
			})
		})
	})
})
Cypress.Commands.add('createCity', (cityData, stateData) => {
	cy.getToken().then((token) => {
		cy.getState(stateData).then((state) => {
			const { id } = state
			cy.request({
				method: 'POST',
				url: `https://business-service-dev.vendease.com/v1/cities`,
				body: {
					name: cityData.name,
					code: cityData.code,
					stateId: id,
				},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'x-tenant-id': 'x-tenant-id',
				},
			}).then((response) => {
				expect(response.status).to.be.oneOf([200, 201], 'API returned the expected status code')
				const cityInfo = response.body.data
				const { name, id } = cityInfo
				if (!cityInfo || !cityInfo.id) {
					throw new Error('Country ID is null or undefined.')
				}
				cy.log(name, id)
				return cy.wrap(name, id)
			})
		})
	})
})

Cypress.Commands.add('createLga', (lgaData, cityData) => {
	cy.getToken().then((token) => {
		cy.getState(cityData).then((city) => {
			const { id } = city
			cy.request({
				method: 'POST',
				url: `https://business-service-dev.vendease.com/v1/lgas`,
				body: {
					name: lgaData.name,
					code: lgaData.code,
					cityId: id,
				},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'x-tenant-id': 'x-tenant-id',
				},
			}).then((response) => {
				expect(response.status).to.be.oneOf([200, 201], 'API returned the expected status code')
				const lgaInfo = response.body.data
				const { name, id } = lgaInfo
				if (!lgaInfo || !lgaInfo.id) {
					throw new Error('LGA ID is null or undefined.')
				}
				cy.log(name, id)
				return cy.wrap(name, id)
			})
		})
	})
})

Cypress.Commands.add('getLga', (lgaData) => {
	cy.getToken().then((token) => {
		cy.request({
			method: 'GET',
			url: `https://business-service-dev.vendease.com/v1/lgas?order=ASC&pageSize=100&page=1`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-tenant-id': 'x-tenant-id',
			},
		}).then((response) => {
			expect(response.status).to.eql(200)
			console.log(response.body.data)
			const matchingLga = response.body.data.find((lga) => lga.name === lgaData.name)
			if (matchingLga) {
				const { id, name } = matchingLga
				cy.log(`Lga Name: ${name}, ID: ${id}`)
				console.log(`Lga Name: ${name}, ID: ${id}`)
				return cy.wrap({ id, name })
			} else {
				throw new Error(`Lga with name '${lgaData.name}' not found.`)
			}
		})
	})
})
Cypress.Commands.add('updateLgaStatus', (lgaName) => {
	cy.getToken().then((token) => {
		cy.getCity(lgaName).then((lga) => {
			const { id } = lga
			cy.request({
				method: 'PATCH',
				url: `https://business-service-dev.vendease.com/v1/lgas/${id}/status`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'x-tenant-id': 'x-tenant-id',
				},
			}).then((response) => {
				expect(response.status).to.eql(200)
				console.log(response)
				const status = response.statusText
				cy.log(`Status updated to: ${status}`)
			})
		})
	})
})
