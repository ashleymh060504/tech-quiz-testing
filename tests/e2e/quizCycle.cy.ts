import { cy } from 'cypress';
import '@testing-library/cypress/add-commands';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Cycle', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/questions/random', {
        statusCode: 200,
        fixture: 'mockQuestions.json',
      })

      cy.visit('/');
    });

    it('should have a Start Quiz button', () => {
      cy.get('button').contains('Start Quiz').should('exist');
    });

    it('should start the quiz when the Start Quiz button is clicked', () => {
      cy.get('button').contains('Start Quiz').click();
      
      cy.get('h2').contains('What is the output of print(2 ** 3)?').should('exist'); 
    });

    it('should show the 2nd question after clicking on an answer', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('button').contains('1').click();
        
        cy.get('h2').contains('Which of the following is a mutable data type in Python?').should('exist'); 
    });



});
