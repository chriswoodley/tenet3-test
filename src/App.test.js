import App from './App';
import { render, screen } from './utils/test-utils';
import deepmerge from 'deepmerge';

const renderComponent = ({ props = {}, state={}, route='/' }) => {
  const defaultProps = {};
  const defaultState = {};
  const mergedProps = deepmerge(defaultProps, props);
  const preloadedState = deepmerge(defaultState, state);

  return render(
    <App {...mergedProps} />, 
    {
      route,
      preloadedState
    }
  );
}


describe('When the route is /', () => { 
  it('should not render the set time button', () => {
    renderComponent({route: '/'});
  
    const setTimesButton = screen.queryByRole('button', {
      name: /Set Times/
    });
    
    expect(setTimesButton).not.toBeInTheDocument();
  });
});


describe('When the route is /timer', () => {
  const route = '/timer';

  it('should render the enabled set times button', () => {
    renderComponent({route});
  
    const setTimesButton = screen.getByRole('button', {
      name: /Set Times/
    });
    
    expect(setTimesButton).toBeEnabled();
  });
  
  it(`should render the disabled set times button when elapsed time is
  greater than 0`, () => {
    const state = {time: {elapsedTime: 100}};
    renderComponent({route, state });
    
    const setTimesButton = screen.getByRole('button', {
      name: /Set Times/
    });
    
    expect(setTimesButton).toBeDisabled();
  });
});
