import {SetTimes} from './set-times';
import { render, screen, fireEvent } from '../utils/test-utils';
import deepmerge from 'deepmerge';

const renderComponent = ({ props = {}, state={}, route='/' } = {}) => {
  const defaultProps = {};
  const defaultState = {};
  const mergedProps = deepmerge(defaultProps, props);
  const preloadedState = deepmerge(defaultState, state);

  return render(
    <SetTimes {...mergedProps} />, 
    {
      route,
      preloadedState
    }
  );
}

describe('When the form is rendered', () => {
  it('should not render an error message for the fizz field', () => {
    renderComponent();

    const error = screen.queryByText('fizz must be between 2 and 10');

    expect(error).not.toBeInTheDocument();
  });
  
  it('should not render an error message for the buzz field', () => {
    renderComponent();

    const error = screen.queryByText('buzz must be between 2 and 10');

    expect(error).not.toBeInTheDocument();
  });
});

describe('When the form is submitted without values', () => {
  it('should render an error messages for the fizz field', () => {
    renderComponent();
    const submitButton = screen.getByRole('button', {
      name: /Go to Timer/
    });

    fireEvent.click(submitButton);
    const error = screen.queryByText('fizz must be between 2 and 10');

    expect(error).toBeInTheDocument();
  });
  
  it('should render an error messages for the buzz field', () => {
    renderComponent();
    const submitButton = screen.getByRole('button', {
      name: /Go to Timer/
    });

    fireEvent.click(submitButton);
    const error = screen.queryByText('buzz must be between 2 and 10');

    expect(error).toBeInTheDocument();
  });
});

describe('When the form is submitted with incorrect values', () => {
  it('should render an error messages for the fizz field', () => {
    renderComponent();
    const submitButton = screen.getByRole('button', {
      name: /Go to Timer/
    });
    const fizzField = screen.getByLabelText(/Fizz/)

    fireEvent.input(fizzField, {
      target: {
        value: '1'
      }
    });
    fireEvent.click(submitButton);
    const error = screen.getByText('fizz must be between 2 and 10');

    expect(error).toBeInTheDocument();
  });
  
  it('should render an error messages for the buzz field', () => {
    renderComponent();
    const submitButton = screen.getByRole('button', {
      name: /Go to Timer/
    });
    const buzzField = screen.getByLabelText(/Buzz/)

    fireEvent.input(buzzField, {
      target: {
        value: '11'
      }
    });
    fireEvent.click(submitButton);
    const error = screen.getByText('buzz must be between 2 and 10');

    expect(error).toBeInTheDocument();
  });
});

describe('When the form is submitted with correct values', () => {
  it('should render an error messages for the fizz field', () => {
    renderComponent();
    const submitButton = screen.getByRole('button', {
      name: /Go to Timer/
    });
    const fizzField = screen.getByLabelText(/Fizz/)

    fireEvent.input(fizzField, {
      target: {
        value: '2'
      }
    });
    fireEvent.click(submitButton);
    const error = screen.queryByText('fizz must be between 2 and 10');

    expect(error).not.toBeInTheDocument();
  });
  
  it('should render an error messages for the buzz field', () => {
    renderComponent();
    const submitButton = screen.getByRole('button', {
      name: /Go to Timer/
    });
    const buzzField = screen.getByLabelText(/Buzz/)

    fireEvent.input(buzzField, {
      target: {
        value: '10'
      }
    });
    fireEvent.click(submitButton);
    const error = screen.queryByText('buzz must be between 2 and 10');

    expect(error).not.toBeInTheDocument();
  });
});