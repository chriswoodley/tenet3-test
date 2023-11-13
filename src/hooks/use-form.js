import { useEffect, useState } from 'react';

const useForm = (submit, validate, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const hasErrors = !!Object.values(errors).filter(Boolean).length;

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      setHasSubmitted(true);
      const validationErrors = validate(values);

      if (Object.values(validationErrors).filter(Boolean).length) {
        setErrors(validationErrors)
      } else {
        submit(values);
      }
    }
  };

  const handleChange = (event) => {
    setValues((values) => {
      return {
        ...values,
        [event.target.name]: event.target.value
      }
    });
  };

  useEffect(() => {
    if (hasSubmitted) {
      const validationErrors = validate(values);
      setErrors(validationErrors)
    }
  }, [values, validate, hasSubmitted])
  
  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    hasErrors
  }
};

export default useForm;
