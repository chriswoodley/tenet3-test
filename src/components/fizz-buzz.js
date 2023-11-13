import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { getElapsedSeconds } from '../utils/time';
import counterStyles from '../styles/counter.module.css';

const getFizzBuzz = ({fizz, buzz, totalSeconds, currentText}) => {
  if (totalSeconds > 0) {
    if (totalSeconds % fizz === 0 && totalSeconds % buzz === 0) {
      return 'fizzbuzz';
    } else if (totalSeconds % fizz === 0) {
      return 'fizz';
    } else if (totalSeconds % buzz === 0) {
      return 'buzz';
    } else {
      return currentText;
    }
  }

  return currentText;
}

function FizzBuzz({ time, fizz, buzz }) {
  const [text, setText] = useState();

  useEffect(() => {
    const totalSeconds = getElapsedSeconds(time);

    setText((currentText) => {
      return getFizzBuzz({ fizz, buzz, totalSeconds, currentText });
    });
  }, [time, fizz, buzz])

  if (fizz && buzz) {
    return (
      <div
        className={classNames(
          counterStyles.result,
        )}
      >
        {text}
      </div>
    );
  }

  return (
    <div>You need to set the Fizz and Buzz times.</div>
  );
}

export default FizzBuzz;