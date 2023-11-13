import { Timer } from './timer';
import { render, screen, fireEvent, act } from '../utils/test-utils';
import deepmerge from 'deepmerge';

const renderComponent = ({ props = {}, state={}, route='/' } = {}) => {
  const defaultProps = {};
  const defaultState = {};
  const mergedProps = deepmerge(defaultProps, props);
  const preloadedState = deepmerge(defaultState, state);

  return render(
    <Timer {...mergedProps} />, 
    {
      route,
      preloadedState
    }
  );
}

describe('When rendered without setting the fizz and buzz times', () => {
  it('should display a reminder message', () => {
    renderComponent();

    const message = screen.getByText('You need to set the Fizz and Buzz times.');

    expect(message).toBeInTheDocument()
  });
});

describe('When rendered with the fizz and buzz times entered', () => {
  it('should not display a reminder message', () => {
    const state = {
      time: {
        fizz: 2,
        buzz: 3
      }
    }
    renderComponent({state});

    const message = screen.queryByText('You need to set the Fizz and Buzz times.');

    expect(message).not.toBeInTheDocument()
  });
  
  it('should display 0:00:00 when the elapsed time is 0', () => {
    const state = {
      time: {
        fizz: 2,
        buzz: 3,
        elapsedTime: 0
      }
    };
    renderComponent({state});

    const message = screen.getByText('0:00:00');

    expect(message).toBeInTheDocument()
  });

  describe('When the Start Button is clicked', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it(`should render Fizz when fizz is a multiple of the total 
    elapsed seconds`, async () => {
      const state = {
        time: {
          fizz: 2,
          buzz: 3,
          elapsedTime: 0
        }
      };
      renderComponent({state});
      const startButton = screen.getByRole('button', {
        name: 'Start'
      });

      fireEvent.click(startButton);
      act(() => {
        jest.advanceTimersByTime(4000);
      });
      const time = await screen.findByText('0:00:04');
      const result = await screen.findByText('fizz');

      expect(time).toBeInTheDocument();
      expect(result).toBeInTheDocument();
    });
    
    it(`should render Buzz when buzz is a multiple of the total 
    elapsed seconds`, async () => {
      const state = {
        time: {
          fizz: 2,
          buzz: 3,
          elapsedTime: 0
        }
      };
      renderComponent({state});
      const startButton = screen.getByRole('button', {
        name: 'Start'
      });

      fireEvent.click(startButton);
      act(() => {
        jest.advanceTimersByTime(9000);
      });
      const time = await screen.findByText('0:00:09');
      const result = await screen.findByText('buzz');

      expect(time).toBeInTheDocument();
      expect(result).toBeInTheDocument();
    });
    
    it(`should render fizzbuzz when both fizz and buzz is a multiple of 
    the total elapsed seconds`, async () => {
      const state = {
        time: {
          fizz: 2,
          buzz: 3,
          elapsedTime: 0
        }
      };
      renderComponent({state});
      const startButton = screen.getByRole('button', {
        name: 'Start'
      });

      fireEvent.click(startButton);
      act(() => {
        jest.advanceTimersByTime(6000);
      });
      const time = await screen.findByText('0:00:06');
      const result = await screen.findByText('fizzbuzz');

      expect(time).toBeInTheDocument();
      expect(result).toBeInTheDocument();
    });

    describe('When the stop button is clicked', () => {
      it(`should handle stopping and resetting the timer`, async () => {
        const state = {
          time: {
            fizz: 2,
            buzz: 3,
            elapsedTime: 0
          }
        };
        renderComponent({state});
        const startButton = screen.getByRole('button', {
          name: 'Start'
        });

        fireEvent.click(startButton);
        act(() => {
          jest.advanceTimersByTime(6000);
        });
        const time = await screen.findByText('0:00:06');
        const result = await screen.findByText('fizzbuzz');
        const stopButton = screen.getByRole('button', {
          name: 'Stop'
        });
        fireEvent.click(stopButton)
        expect(time).toBeInTheDocument();
        expect(result).toBeInTheDocument();
        expect(stopButton).toHaveTextContent('Reset');
        
        const resetButton = screen.getByRole('button', {
          name: 'Reset'
        });
        fireEvent.click(resetButton)
        const defaultTime = await screen.findByText('0:00:00');
        expect(defaultTime).toBeInTheDocument();
      });
    });
  });
});