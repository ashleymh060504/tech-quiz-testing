import Quiz from '../../client/src/components/Quiz'; 
import { mount } from 'cypress/react18';
import '@testing-library/cypress/add-commands';

describe('<Quiz />', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      fixture: 'mockQuestions.json',
    })
  })

  it('should have an h2 element that has the question text', () => {
    mount(<Quiz />);
    cy.get("button").click()
    cy.get("h2").contains("Which of the following is a mutable data type in Python?").should('be.visible')
    cy.get("button").eq(0).should('contain.text', '1')
    cy.get("button").eq(1).should('contain.text', '2')

    cy.get(".alert").eq(0).should('contain.text', 'str')
    cy.get(".alert").eq(1).should('contain.text', 'tuple')
    cy.get(".alert").eq(2).should('contain.text', 'list')
    cy.get(".alert").eq(3).should('contain.text', 'int')

    cy.get("h2").contains("Quiz Completed").should('be.visible')
    cy.get(".alert-success").contains("Your score:").should('be.visible')
    cy.get("button").contains("Take New Quiz").should('be.visible')
  });



});
