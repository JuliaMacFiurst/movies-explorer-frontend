import { useState, useCallback } from "react";
import { validationMessages } from "./constants";

// export function useValidation(inputs) {
//     const [values, setValues] = useState(inputs);
//     const [errors, setErrors] = useState({});
//     const [isFormValid, setIsFormValid] = useState(false);

//     const handleChange = (evt) => {
//     const input = evt.target
//     const { value } = input
//     const { name } = input
//     setValues({ ...values, [name]: value })
//     setErrors({ ...errors, [name]: input.validationMessage })
//     setIsFormValid(input.closest('form').checkValidity())
//     }

//     const resetFrom = useCallback(
//         (newValues = {}, newErrors = {}, newIsValid = false) => {
//           setValues(newValues)
//           setErrors(newErrors)
//           setIsFormValid(newIsValid)
//         },
//         [setValues, setErrors, setIsFormValid],
//       )

//       return { values, handleChange, resetFrom, errors, isFormValid }
// }

export function useValidation(
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

      const [, getValidationMessage] = Object.entries(
        updateErrorMessages
      ).find(([errorKey]) => {
        const isError = validityState[errorKey];
        if (isError) {
          return true;
        }
        return false;
      });

      errorMessage = getValidationMessage({ minLength });
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
    setIsFormValid(input.closest('form').checkValidity());
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
