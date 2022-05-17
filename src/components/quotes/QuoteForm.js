import { Fragment, useRef, useState } from 'react';
import { Prompt } from 'react-router-dom/cjs/react-router-dom.min';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const [isEntered, setIsEntered] = useState(false);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    // setIsEntered(true);  This does not work, since this is an asynchronous task.

    event.preventDefault();
    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  function finishedEnteringHandler(event) {
    setIsEntered(false);
  }

  const formFocuseHandler = () => {

    console.log("Form");
    setIsEntered(true);
  }

  return (
    <Fragment>
      <Prompt when={isEntered} message={(location) => 'Are you sure you want to leave'}>

      </Prompt>
      <Card>
        <form onFocus={formFocuseHandler} className={classes.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor='author'>Author</label>
            <input type='text' id='author' ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='text'>Text</label>
            <textarea id='text' rows='5' ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishedEnteringHandler} className='btn'>Add Quote</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
