// cypress/component/Game.cy.tsx

import React from 'react';
import Quiz from '../../client/src/components/Quiz'; // Adjust the import path as necessary
import { mount } from 'cypress/react18';
import { mockState } from '../support/utils/helpers';
import '@testing-library/cypress/add-commands';

describe('<GamePage />', () => {
  beforeEach(() => {

  it('should render the game page, word with underscores, keyboard, and countdown', () => {
    mount(<GamePage />);
    cy.get('[data-cy=game]').should('be.visible');
    cy.get('[data-cy=game]').should('contain', mockState.maskedWord);
    cy.get('[data-cy=keyboard]').should('be.visible');
    cy.get('[data-cy=countdown]').should('be.visible').and('contain', mockState.guessesRemaining);
  });

  it('should hide the game area and show "You won!" when the game is won', () => {
    mount(<GamePage />);

    // Wait for the game to start
    cy.wait('@getRandomWord');

    // Simulate final correct guess
    cy.get('[data-cy=s]').click();
    cy.wait('@postGuess');

    // Check if the winning message is displayed
    cy.get('[data-cy=game-area]').should('not.exist');
    cy.contains('You won!').should('be.visible');
  });

  it('should hide the game area and show a loss message when the game is complete but the word contains underscores', () => {
    mount(<GamePage />);

    // Wait for the game to start
    cy.wait('@getRandomWord');

    // Simulate incorrect guesses
    cy.get('[data-cy=a]').click();
    cy.wait('@postGuess');

    // Check if the loss message is displayed
    cy.get('[data-cy=game-area]').should('not.exist');
    cy.contains('You lost!').should('be.visible'); // Adjust the text based on the actual implementation
  });
});
