import { useState, useCallback } from "react";

export function useValidation(
  initialState = {
    values: {},
    isValid: true,
  },
  setErrorMessages = {}
) {
  const [values, setValues] = useState(initialState.values);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(initialState.isValid);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    //  === 'checkbox' ? target.checked : target.value;

    setValues({
      ...values,
      [name]: value
    });

    setErrors({
      ...errors, [name]: target.validationMessage
    });

     setIsValid(target.closest('form').checkValidity());
    }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    setValues,
    handleChange,
    errors,
    setErrors,
    isValid,
    resetForm,
  };
}
