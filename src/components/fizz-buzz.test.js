import FizzBuzz from './fizz-buzz';
import { render, screen } from '../utils/test-utils';
import deepmerge from 'deepmerge';

const renderComponent = ({ props = {}, state={}, route='/timer' }) => {
  const defaultProps = {};
  const defaultState = {};
  const mergedProps = deepmerge(defaultProps, props);
  const preloadedState = deepmerge(defaultState, state);

  return render(
    <FizzBuzz {...mergedProps} />, 
    {
      route,
      preloadedState
    }
  );
}

describe('When fizz is 2 and buzz is 3', () => {
  const fizz = 2;
  const buzz = 3;

  it('should render fizzbuzz when 6 seconds has elapsed', () => {
    const props = {
      fizz,
      buzz,
      time: 6000
    }
    renderComponent({props});
  
    const result = screen.getByText('fizzbuzz');
    
    expect(result).toBeInTheDocument();
  });
  
  it('should render fizz when 4 seconds has elapsed', () => {
    const props = {
      fizz,
      buzz,
      time: 4000
    }
    renderComponent({props});
  
    const result = screen.getByText('fizz');
    
    expect(result).toBeInTheDocument();
  });
  
  it('should render buzz when 9 seconds has elapsed', () => {
    const props = {
      fizz,
      buzz,
      time: 9000
    }
    renderComponent({props});
  
    const result = screen.getByText('buzz');
    
    expect(result).toBeInTheDocument();
  });
});

describe('When fizz and buzz is not set', () => { 
  it('should render fizzbuzz when 6 seconds has elapsed', () => {
    const props = {};
    renderComponent({props});
  
    const result = screen.getByText('You need to set the Fizz and Buzz times.');
    
    expect(result).toBeInTheDocument();
  });
})
