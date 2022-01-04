describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {      name: 'Taneli',      username: 'testi',      password: 'salainen'    }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Log in to application')
    })
    it('Wrong credentials dont log in', function() {
        cy.get('#username').type('pahus')
        cy.get('#password').type('testi')
        cy.get('#login-button').click()
        cy.contains('wrong credentials')
    })
    it('Correct credentials log in', function() {
        cy.get('#username').type('testi')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.contains('Taneli has logged in')
    })


    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'testi', password: 'salainen' })
        })
    
        it('A blog can be created', function() {
            cy.contains('create').click()
            cy.get('#title').type('Testing blog')
            cy.get('#url').type('www.test.test')
            cy.get('#author').type('Testing author')
            cy.get('#save').click()
            cy.contains('Testing blog')

        })
        describe('and blog created', function() {
            beforeEach(function() {
                cy.createBlog({title: 'Test', url: "Testurl", author: 'TestAuthor'})
            })
            it(' can be liked', function() {
                cy.contains('View').click()
                cy.contains('like').click()
                cy.contains('likes: 1')
            })
            it('can be removed', function()   {
                cy.contains('View').click()
                cy.contains('remove').click()
                cy.contains('View').should('not.exist')
            })

        })
        
      })





  })
