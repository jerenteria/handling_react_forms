import { useRef, useState } from 'react';


const SimpleInput = (props) => {
  // ref reads val when needed better to use when you need info submitted only once
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
  // update enteredName to setEnteredName with every key stroke that occurs during user input
  // automatically receives default event object describing the event from there get entered val 
  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  // dont sent http request to server(doesnt reload page)
  const formSubmissionHandler = event => {
    event.preventDefault();
    // if entered name is empty return(breaks function to not allow submission)
    if(enteredName.trim() == '') {
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

  // changes css style deending whether form is valid or invalid
  const nameInputClasses = enteredNameIsValid ? 'form-control' : 'form-control invalid';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' onChange = {nameInputChangeHandler} value={enteredName}/>
        {!enteredNameIsValid && <p className="error-text">Name must not be empty!</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
