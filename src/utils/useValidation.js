import { useState, useCallback } from "react";
import { validationMessages } from "./constants";

export default function useValidation(
  initialState = {
    values: {},
    isFormValid: true,
  },
  setErrorMessages = {}
) {
  const [values, setValues] = useState(initialState.values);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(initialState.isFormValid);

  const handleChange = (input) => {
    const name = input.name;
    const value = input.value;
    const minLength = input.minLength;
    const validityState = input.validity;
    let errorMessage = undefined;

    if (!validityState.valid) {
      const updateErrorMessages = {
        ...validationMessages,
        ...setErrorMessages[name],
      };

      const [, getValidationMessages] = Object.entries(
        updateErrorMessages
      ).find(([errorKey]) => {
        const isError = validityState[errorKey];
        if (isError) {
          return true;
        }
        return false;
      });

      errorMessage = getValidationMessages({ minLength });
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
    setIsFormValid(input.closest("form").checkValidity());
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setValues, setErrors, setIsFormValid]
  );

  return {
    values,
    setValues,
    handleChange,
    errors,
    setErrors,
    isFormValid,
    setIsFormValid,
    resetForm,
  };
}
