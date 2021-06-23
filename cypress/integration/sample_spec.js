describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('My First Test', () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions')
  })
})

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
})

describe('Effects', () => {
  describe('Api', () => {
    it('should get a post using baseUrl and authToken in header', async () => {
      expect.assertions(3)
      const api = new Api(
        {
          get (url, config) {
            expect(url).toBe('/test/posts/1')
            expect(config).toEqual({
              headers: {
                'Auth-Token': '123'
              }
            })

            return Promise.resolve({
              response: {
                id
              }
            })
          }
        },
        {
          authToken: '123',
          baseUrl: '/test'
        }
      )

      const post = await api.getPost('1')

      expect(post.id).toBe('1')
    })
  })
})
