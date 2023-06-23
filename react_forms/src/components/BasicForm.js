import useInput from '../hooks/use-input';


const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

const BasicForm = (props) => {
  // call useInput 3 times for 3 inputs
  // custom hook returns an object full of data like values(first name, last name, email)
  // object destructoring to pull out keys from returned object and store val in brand new constants
  // extract value an assign alias firstNameValue
  const { 
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,    
    valueChangeHandler: firstNameChangeHandler, 
    inputBlurHandler: firstNameBlurHandler, 
    reset: resetFirstName,
   } = useInput(isNotEmpty);
  useInput(isNotEmpty);
  useInput(isEmail);
  const { 
    value: lastNameValue,
    isValid: lastNameIsValid, 
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler, 
    inputBlurHandler: lastNameBlurHandler, 
    reset: resetLastName,
   } = useInput(isNotEmpty);
  useInput(isNotEmpty);
  useInput(isEmail);
  const { 
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError, 
    valueChangeHandler: emailChangeHandler, 
    inputBlurHandler: emailBlurHandler, 
    reset: resetEmail,
   } = useInput(isNotEmpty);
  useInput(isNotEmpty);
  useInput(isEmail);

  // start with formIsValid set to false to disable submit button right off the bat
  let formIsValid = false;
  // if all 3 inputs are valid
  if(firstNameIsValid && lastNameIsValid && emailIsValid) {
    // then set the form is valid to true
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if(!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(firstNameValue, lastNameValue, emailValue);

    resetFirstName();
    resetLastName();
    resetEmail();
  };

   // error stored in constant var if firstName has error then render css style for class "form-control invalid" otherwise use class "form-control"
  const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
  const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' value={firstNameValue} onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler} />
          {/* if error show this */}
          {firstNameHasError && <p>Please Enter a first name.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' value={lastNameValue} onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler} />
          {/* if error show this */}
          {lastNameHasError && <p>Please Enter a last name.</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' value={emailValue} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
        {/* if error show this */}
        {emailHasError && <p>Please Enter a email.</p>}
      </div>
      <div className='form-actions'>
        {/* if form is not valid then disable submit button */}
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
