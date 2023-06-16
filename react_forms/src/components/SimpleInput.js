import { useState, useEffect } from 'react';


const SimpleInput = (props) => {
  // ref reads val when needed better to use when you need info submitted only once
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false); // control whether user inputted something or not

  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }

  // update enteredName to setEnteredName with every key stroke that occurs during user input
  // automatically receives default event object describing the event from there get entered val 
  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  // set error if user clicks on input box then clicks out to let them know box cannot be empty before trying submission
  const nameInputBlurHandler = (event) => {
    // set to true bc if input loses focus it means it was touched
    setEnteredNameTouched(true);

  }

  // dont sent http request to server(doesnt reload page)
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // before the form is submitted set the enterednametouched to true
    // check after form is submitted bc thats when user is confirming input
    setEnteredNameTouched(true);

    // if entered name is empty return(breaks function to not allow submission)
    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    // clears input box after form submission when using useState()
    setEnteredName('');
    // reset code when user submit to get rid of invalid input error after submission
    setEnteredNameTouched(false);
  };


  // changes css style depending whether form is valid or invalid
  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {enteredNameIsValid && <p className="error-text">Name must not be empty!</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
