import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";

import useHttp from "../hooks/use-http";
import { addQuote } from "../components/lib/api";


const NewQuote = () => {
  const {sendRequest, status} = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed'){
      history.push('/quotes');
    }
  }, [status, history])

  const addQuoteHandler = (quoteData) => {
    console.log ("hello");

    sendRequest(quoteData); // Will execute sendRequest = useCallback( ---->  which executes addQuote
    // history.push('/quotes');
  
  }
  return <QuoteForm isLoading={status ==='pending'} onAddQuote={addQuoteHandler}></QuoteForm>
};

export default NewQuote;

// ==========  addQuote ==============
// export async function addQuote(quoteData) {
//   const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
//     method: 'POST',
//     body: JSON.stringify(quoteData),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || 'Could not create quote.');
//   }

//   return null;
// }
// ==========  useHttp ==============
// function useHttp(requestFunction, startWithPending = false) {
//   const [httpState, dispatch] = useReducer(httpReducer, {
//     status: startWithPending ? 'pending' : null,
//     data: null,
//     error: null,
//   });

//   const sendRequest = useCallback(
//     async function (requestData) {
//       dispatch({ type: 'SEND' });
//       try {
//         const responseData = await requestFunction(requestData);  // Here the function is being executed.  In this case it will be addQuote
//         dispatch({ type: 'SUCCESS', responseData });
//       } catch (error) {
//         dispatch({
//           type: 'ERROR',
//           errorMessage: error.message || 'Something went wrong!',
//         });
//       }
//     },
//     [requestFunction]
//   );

//   return {     // const {sendRequest, status} = useHttp(addQuote);
//     sendRequest,
//     ...httpState,
//   };
// }