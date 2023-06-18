import { useState } from 'react';

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false); // control whether user inputted something or not

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    // update enteredName to setEnteredName with every key stroke that occurs during user input
    // automatically receives default event object describing the event from there get entered val 
    const valueChangeHandler = event => {
        setEnteredValue(event.target.value);
    };

    // set error if user clicks on input box then clicks out to let them know box cannot be empty before trying submission
    const inputBlurHandler = (event) => {
        // set to true bc if input loses focus it means it was touched
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    // return object/arr {} bc we want to return more than one thing
    return {
        value: enteredValue, 
        isValid: valueIsValid,
        hasError,
        valueChangeHandler, 
        inputBlurHandler,
        reset
    };
};

export default useInput;