
describe('LoginForm', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('loginForm opens when entering the page', function() {
    cy.contains('username:')
    cy.contains('password:')
  })

  describe('when user is logged in', function() {
    beforeEach(function() {
      cy.get('[data-cy=username]').type('mluukkai')
      cy.get('[data-cy=password]').type('salainen')
      cy.get('[data-cy=login]').click()
    })

    it('logged user shows on page', function() {
      cy.contains('Matti Luukkainen logged in')
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('[data-cy=title]').type('Test blog')
      cy.get('[data-cy=author]').type('Masa')
      cy.get('[data-cy=url]').type('www.masa.fi')
      cy.get('[data-cy=create]').click()

      cy.get('[data-cy=blogs').click()
      cy.contains('Test blog Masa')
    })
  })
})