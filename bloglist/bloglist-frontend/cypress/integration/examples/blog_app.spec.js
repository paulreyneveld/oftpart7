describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Paolo van Rijn',
      username: 'paolov',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('paolov')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
  
      cy.contains('Paolo van Rijn')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('nonuser')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('Log in')
  
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('paolov')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('A blog can be created and liked', function() {
      cy.get('#show').click()
      cy.get('#title').type('new blog')
      cy.get('#author').type('Paolo')
      cy.get('#url').type('test.com')
      cy.get('#submit-new-blog').click()
      cy.contains('new blog')
      cy.get('#show').click()
      cy.get('#like').click()

      cy.contains('1')
    })
  })


  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('paolov')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })
    it('A blog can be deleted', function() {
      cy.get('#show').click()
      cy.get('#title').type('new blog')
      cy.get('#author').type('Paolo')
      cy.get('#url').type('test.com')
      cy.get('#submit-new-blog').click()
      cy.contains('new blog')
      cy.get('#show').click()
      cy.get('#remove').click()
      cy.contains('new blog').should('not.exist')
    })
  })

  describe.only('When logged in', function() {

    beforeEach(function() {
      cy.get('#username').type('paolov')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      .then(() => {
        const tokenUnFormatted = window.localStorage.getItem('loggedBlogappUser')
        const token = JSON.parse(tokenUnFormatted)
        console.log(token)
        console.log('hello')
      })
      cy.request('GET', 'http://localhost:3000')

      
    })

    it('sorted by likes', function() {

      cy.get('#show').click()
      cy.get('#title').type('new blog')
      cy.get('#author').type('Paolo')
      cy.get('#url').type('test.com')
      cy.get('#submit-new-blog').click()
      cy.get('#show').click()

      cy.request('GET', 'http://localhost:3000')
      cy.get('#show').click()
      cy.get('#like').click()

      cy.get('#title').type('new blog again')
      cy.get('#author').type('Paolo')
      cy.get('#url').type('test.com')
      cy.get('#submit-new-blog').click()

      cy.request('GET', 'http://localhost:3000')
      cy.get('#hide').click()
      cy.request('GET', 'http://localhost:3000')
      // cy.contains('view', 'button').click()


      
    })
  })

})