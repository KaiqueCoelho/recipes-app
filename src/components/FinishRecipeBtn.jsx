import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

function FinishRecipeBtn({ disabled }) {
  const history = useHistory();
  return (
    <Button
      variant="danger"
      data-testid="finish-recipe-btn"
      className="fixed-bottom"
      onClick={ () => history.push('/done-recipes') }
      disabled={ !disabled }
    >
      Finish Recipe
    </Button>
  );
}

FinishRecipeBtn.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default FinishRecipeBtn;
