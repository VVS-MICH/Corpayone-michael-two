/// <reference types="cypress" />
import mainpage from '../pages/mainpage';
import MainP from '../pages/mainpage';


describe('Cypress', () => {

    const pngimage1 = 'passport.png'
    const pngimage2 = 'me.png'
   
    
    before('open the application', function() {
      cy.visit('http://localhost:3000')
      cy.clearLocalStorageSnapshot();
    })
  
    beforeEach(() => {
      cy.restoreLocalStorage();
    })
    afterEach(() => {
      cy.saveLocalStorage();
    });
   
    
    it('create expenses', () => {
  
      MainP.UploadExp().selectFile(pngimage1 , {force: true})     /////uploading the first file
      cy.wait(10000)
      MainP.FirstExpOnly().should('have.text', pngimage1 ) ////verifying that the file uploaded
      cy.wait(10000)
      MainP.UploadExp().selectFile(pngimage2, {force: true})     /////uploading the second file
      cy.wait(15000)
      MainP.SecoExp().should('have.text', pngimage2 )  ////verifying that the file uploaded
    
    })
  
  
    it('i should be able to view an expense (the first one)', () => {
      MainP.viewExpense1st().click() /////clicking the view the expense button
      MainP.ExpFileName().should('have.text', pngimage2 )    /////verifying that we are viewing expense of the exact image
      cy.wait(4000)
    })
  
    it('i should be able to pay for an expense', () => { 
  
      MainP.ExpStatus().should('have.text', 'Status' )    ///verifying that the status is unpaid
      MainP.ExpStatusVal().should('have.text', 'Unpaid')
      MainP.PayBtn().click()
       //clicking the pay button
      cy.wait(1000)
      MainP.ExpStatusVal().should('have.text', 'Paid')   ////verifying that it has been indicated as paid
  
    })
      
      it('user should not be able to delete an already paid expense', () => {
      ///verify that user is able to unable to delete the paid expenses
       MainP.DeleteExpBtn().should('not.exist') ////the delete button should not exist as it is deleted
      })
  
  
      it('user should be able to navigate back to the expenses lists', () => {
       ////verify that user is able to view all expenses/go back to expenses list
       MainP.ShowAllExp().click()
       MainP.PageHeader().should('have.text' , 'Expenses') ///verifying the page
  
      })



      it ('the paid an unpaid expenses should be grouped into their respective fields', () => {

        cy.wait(4000)
        MainP.UnpaidHeader2().next().should('contain.text', pngimage1) ///unpaid
        MainP.PaidHeader2().next().should('contain.text', pngimage2) ///paid
       })


       
      it('user should be able to navigate to settinngs page and delete all expenses', () => {
       ////verify that the user is able to navigate to settings
       MainP.SettingsTab().click()
       MainP.SettingsPageHeader().should('have.text' , 'Data reset') //////verifying the page
       ////verifying that user should be able to delete all the expenses
       MainP.DeleteAllExpBtn().click()
       MainP.Alert().should('have.text' , 'All expenses were deleted.')///verifying the recieved alert
       MainP.ExpTab().click() ///navigating back to the expenses page
       MainP.viewExpense1st().should('not.exist')
       ////if there are no expenses the view expense button would not exist,
       // so one can use the presence of the buttons as a test for that
      })


      it('user should be able to delete individual unpaid  expenses', () => {
        MainP.UploadExp().selectFile(pngimage1, {force: true})     /////uploading the first file
        cy.wait(15000)
        MainP.UploadExp().selectFile(pngimage2, {force: true})     /////uploading the second file
        cy.wait(15000)
       //navigating to the second epense
        MainP.ViewExpense2nd().click() /////clicking the view the expense button
        MainP.ExpFileName().should('have.text', pngimage2 )    /////verifying that we are viewing expense of the exact image
        cy.wait(4000)
        MainP.DeleteExpBtn().click() //deleting the expense
       ///verifying that the expense is deleted
        cy.wait(4000)
        cy.get('.sc-dkzDqf').find('.ExpensesSection__FileNameInfo-sc-1affuem-3').should('have.text', pngimage1)
        cy.get('.sc-dkzDqf').find(':nth-child(4) > .ExpensesSection__FileNameContainer-sc-1affuem-2 > .ExpensesSection__FileNameInfo-sc-1affuem-3').should('not.exist')
    })
    
  })