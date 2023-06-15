import { useRef, useState, useEffect } from 'react';


const SimpleInput = (props) => {
  // ref reads val when needed better to use when you need info submitted only once
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false); // control whether user inputted something or not

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log('Name input is valid');
    }
  }, [enteredNameIsValid]);

  // update enteredName to setEnteredName with every key stroke that occurs during user input
  // automatically receives default event object describing the event from there get entered val 
  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  // set error if user clicks on input box then clicks out to let them know box cannot be empty before trying submission
  const nameInputBlurHandler = (event) => {
    // set to true bc if input loses focus it means it was touched
    setEnteredNameTouched(true);

    // if entered name is empty return(breaks function to not allow submission)
    if (enteredName.trim() == '') {
      setEnteredNameIsValid(false);
      return;
    }
  }

  // dont sent http request to server(doesnt reload page)
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // before the form is submitted set the enterednametouched to true
    // check after form is submitted bc thats when user is confirming input
    setEnteredNameTouched(true);

    // if entered name is empty return(breaks function to not allow submission)
    if (enteredName.trim() == '') {
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredName(true);

    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    // clears input box after form submission when using useState()
    setEnteredName('');
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // changes css style depending whether form is valid or invalid
  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {enteredNameIsValid && <p className="error-text">Name must not be empty!</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
