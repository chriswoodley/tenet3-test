import StopButton from './stop-button';
import { render, screen, fireEvent } from '../utils/test-utils';
import deepmerge from 'deepmerge';

const renderComponent = ({ props = {}, state={}, route='/timer' } = {}) => {
  const defaultProps = {};
  const defaultState = {};
  const mergedProps = deepmerge(defaultProps, props);
  const preloadedState = deepmerge(defaultState, state);

  return render(
    <StopButton {...mergedProps} />, 
    {
      route,
      preloadedState
    }
  );
}

describe('When it has not stopped', () => {
  it('should render the button with the word Stop', () => {
    renderComponent();
  
    const button = screen.getByRole('button', {
      name: 'Stop'
    });
    
    expect(button).toBeEnabled();
  });
});

describe('When it has stopped', () => {
  it('should render the button with the word Reset', () => {
    const props = {
      hasStopped: true
    };
    renderComponent({props});
  
    const button = screen.getByRole('button', {
      name: 'Reset'
    });
    
    expect(button).toBeEnabled();
  });
});

describe('When the onClick handler is passed in', () => {
  it('should call it when the button is clicked on', () => {
    const props = {
      onClick: jest.fn()
    };
    renderComponent({props});
    const button = screen.getByRole('button', {
      name: 'Stop'
    });

    fireEvent.click(button);

    expect(props.onClick).toHaveBeenCalled();
  });
});
