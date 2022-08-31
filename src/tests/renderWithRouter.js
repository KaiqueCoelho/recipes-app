import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RecipeProvider from '../context/RecipeProvider';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  const allSelectors = render(
    <RecipeProvider>
      <Router history={ customHistory }>
        { component }
      </Router>
    </RecipeProvider>,
  );
  return { customHistory, ...allSelectors };
}

export default renderWithRouter;
