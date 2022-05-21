import { useRef, useEffect } from 'react';

import useHttp from "../../hooks/use-http";
import { addComment } from "../../components/lib/api";
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment, quoteId } = props;
  
  useEffect(() => {
    if ((status === 'completed') && !error){
      onAddedComment();
    }

  }, [status, error, onAddedComment]);


  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    console.log(`submit - quoteId = ${quoteId}`);
    sendRequest({commentData: { text: enteredText }, quoteId: quoteId});

    // optional: Could validate here

    // send comment to server
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>

      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}

      <div className={classes.control} >
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;


// const {sendRequest, status} = useHttp(addQuote);
// const history = useHistory();

// useEffect(() => {
//   if (status === 'completed'){
//     history.push('/quotes');
//   }
// }, [status, history])

// const addQuoteHandler = (quoteData) => {
//   console.log ("hello");

//   sendRequest(quoteData); // Will execute sendRequest = useCallback( ---->  which executes addQuote
//   // history.push('/quotes');

// }