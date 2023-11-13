import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTime } from '../features/time/time-slice';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/use-form';
import { between } from '../utils/validation';
import buttonStyles from '../styles/button.module.css';
import classNames from 'classnames';
import layoutStyles from '../styles/layout.module.css';
import textStyles from '../styles/text.module.css';
import spaceStyles from '../styles/space.module.css';
import inputStyles from '../styles/input.module.css';

const MIN_NUMBER = 2;
const MAX_NUMBER = 10;
const betweenTwoAndTen = between(2, 10);

export function SetTimes() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate()
  const fizz = useSelector(state => state.time.fizz);
  const buzz = useSelector(state => state.time.buzz);

  const validate = useCallback((values) => {
    const errors = {};
  
    Object.entries(values).forEach(([key, value]) => {
      const error = betweenTwoAndTen(key, value)
      errors[key] = error;
    });
  
    return errors;
  }, []);

  const goToTimer = useCallback((values) => {
    dispatch(setTime(values))
    navigate('/timer')
  }, [dispatch, navigate])

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    hasErrors
  } = useForm(
    goToTimer,
    validate,
    {
      fizz,
      buzz
    }
  )

  return (
    <div className={classNames(textStyles.center)}>
      <p
        className={classNames(
          textStyles.lg,
          spaceStyles['mt-0'],
          spaceStyles['mb-1']
        )}
      >
        Please enter a fizz and buzz time in seconds. <strong>Values should be 
        2 to 10, inclusive</strong>.
      </p>

      <form
        onSubmit={handleSubmit}
      >
        <div
          className={classNames(layoutStyles['inline-flex'])}
        >
          <div 
            className={classNames(
              inputStyles.control,
              spaceStyles['mr-1'],
              textStyles.left
            )}
          >
            <label 
              htmlFor="fizz"
            >
              Fizz:&nbsp;
            </label>

            <input
              type="number"
              name="fizz" 
              id="fizz" 
              min={MIN_NUMBER}
              max={MAX_NUMBER}
              value={values.fizz}
              onChange={handleChange}
            />

            <div
              className={classNames(
                inputStyles.error
              )}
            >
              {errors.fizz}
            </div>
          </div>
          
          <div 
            className={classNames(
              inputStyles.control,
              textStyles.left
            )}
          >
            <label 
              htmlFor="buzz"
            >
              Buzz:&nbsp;
            </label>

            <input
              type="number"
              name="buzz"
              id="buzz"
              min={MIN_NUMBER}
              max={MAX_NUMBER}
              value={values.buzz}
              onChange={handleChange}
            />

            <div className={classNames(inputStyles.error)}>
              {errors.buzz}
            </div>
          </div>
        </div>
        
        <div
          className={classNames(spaceStyles['mt-2'])}
        >
          <button
            className={classNames(buttonStyles.default)}
            type="submit"
            disabled={hasErrors}
          >
            Go to Timer &gt;
          </button>
        </div>
      </form>
    </div>
  )
}
