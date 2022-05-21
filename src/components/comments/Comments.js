import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../components/lib/api";
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';


import classes from './Comments.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  const params = useParams();
  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);
  
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  //The React useCallback Hook returns a memoized callback function. Think of 
  // memoization as caching a value so that it does not need to be recalculated.
  // using useCallback ensures that this function is not
  // being recreated in NewCommentForm where onAddedComment 
  // is used to determine if useEffect should rerun:
  // useEffect(() => {
  //   if (status === 'completed' && !error) {
  //     onAddedComment();
  //   }
  // }, [status, error, onAddedComment]);
  const addedCommentHandler =  useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);



  let comments;
  if (status === 'pending') {
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if (status === 'completed') {
    if (loadedComments && loadedComments.length > 0) {
      comments = <CommentsList comments={loadedComments} />
    } else {
      comments = (
        <div className='centered'>
          No comments have yet been entered
        </div>
      )
    }
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
