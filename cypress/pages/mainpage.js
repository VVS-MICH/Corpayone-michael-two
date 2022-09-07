class MainP {

    UploadExp(){
        return  cy.get('#file[type=file]')
    }

    FirstExpOnly(){
        return  cy.get('.ExpensesSection__FileNameInfo-sc-1affuem-3')
    }
    SecoExp(){
        return  cy.get(':nth-child(4) > .ExpensesSection__FileNameContainer-sc-1affuem-2 > .ExpensesSection__FileNameInfo-sc-1affuem-3')
    }
    viewExpense1st(){
        return  cy.get(':nth-child(4) > .ExpensesSection__ButtonContainer-sc-1affuem-8 > .Button__ButtonStyled-sc-4p76xp-0')
    }
    ExpFileName(){
        return  cy.get(':nth-child(5) > .InfoItem__Info-sc-107h242-2')
    }
    ExpStatus(){
        return  cy.get(':nth-child(1) > .InfoItem__Title-sc-107h242-1')
    }
    ExpStatusVal(){
        return  cy.get('.ExpenseItemRoute__StatusInfo-sc-e3e9ev-2')
    }
    PayBtn(){
        return  cy.get('#root > div.sc-dkzDqf.xWqqK > div.SectionHeader__Container-sc-pl37pr-0.kicPKt > div > button.Button__ButtonStyled-sc-4p76xp-0.jByeaQ.ExpenseItemRoute__StyledButton-sc-e3e9ev-1.kSLmGQ')
    }
    DeleteExpBtn(){
        return  cy.get('.dhgrDu')
    }
    ShowAllExp(){
        return  cy.get('.Button__ButtonStyled-sc-4p76xp-0')
    }
    PageHeader(){
        return  cy.get('h2')
    }
    UnpaidHeader2(){
        return  cy.get('.sc-dkzDqf > :nth-child(2)')
    }
    PaidHeader2(){
        return  cy.get('.sc-dkzDqf > :nth-child(4)')
    }
    SettingsTab(){
        return  cy.get(':nth-child(2) > .nav-link')
    }
    SettingsPageHeader(){
        return  cy.get('h1')
    }
    DeleteAllExpBtn(){
        return  cy.get('.Button__ButtonStyled-sc-4p76xp-0')
    }
    Alert(){
        return  cy.get('.alert')
    }
    ExpTab(){
        return  cy.get(':nth-child(1) > .nav-link')
    }
    ViewExpense2nd(){
        return  cy.get(':nth-child(4) > .ExpensesSection__ButtonContainer-sc-1affuem-8 > .Button__ButtonStyled-sc-4p76xp-0')
    }
    

}
export default new MainP