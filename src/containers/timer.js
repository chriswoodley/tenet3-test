import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { getElapsedTime } from '../utils/time';
import { setElapsedTime } from '../features/time/time-slice';
import buttonStyles from '../styles/button.module.css';
import counterStyles from '../styles/counter.module.css';
import FizzBuzz from '../components/fizz-buzz';
import spaceStyles from '../styles/space.module.css';
import StopButton from '../components/stop-button';
import textStyles from '../styles/text.module.css';

export function Timer() {
  const dispatch = useDispatch(); 
  const fizz = useSelector(state => state.time.fizz);
  const buzz = useSelector(state => state.time.buzz);
  const time = useSelector(state => state.time.elapsedTime);
  const [isPaused, setIsPaused] = useState(true);
  const intervalId = useRef();

  const start = useCallback(() => {
    setIsPaused(false);
  }, []);
  
  const stop = useCallback(() => {
    clearInterval(intervalId.current);
    
    if (!isPaused) {
      setIsPaused(true);
    } else {
      // reset the time
      dispatch(setElapsedTime(0));
    }
  }, [dispatch, isPaused]);

  useEffect(() => {
    if (!isPaused) {
      // always start from the current time
      // Date.now will give us a more accurate result since we are polling 
      // every 100ms (we don't have to do weird math to account for that)
      const startTime = Date.now() - time; 

      intervalId.current = setInterval(() => {
        const newTime = Date.now() - startTime;
        dispatch(setElapsedTime(newTime))
      }, 100);
    }

    // clear our timers when the component is destroyed.
    // otherwise, memory leaks will happen.
    return () => clearInterval(intervalId.current);
  }, [dispatch, isPaused, time]);

  return (
    <div>
      <p
        className={classNames(
          textStyles.lg,
          spaceStyles['mt-0'],
          spaceStyles['mb-2']
        )}
      >
        Time Elapsed
      </p>

      <div
        className={classNames(
          counterStyles.container,
          spaceStyles['mb-2']
        )}
      >
        {getElapsedTime(time)}
      </div>

      <div
        className={classNames(
          spaceStyles['mb-3']
        )}
      >
        <button
          type="button"
          onClick={start}
          disabled={!isPaused}
          className={classNames(
            buttonStyles.start,
            spaceStyles['mr-1']
          )}
        >
          Start
        </button>

        <StopButton
          hasStopped={isPaused}
          onClick={stop}
          className={classNames(buttonStyles.stop)}
        />
      </div>

      <FizzBuzz
        fizz={fizz}
        buzz={buzz}
        time={time}
      />
    </div>
  );
}