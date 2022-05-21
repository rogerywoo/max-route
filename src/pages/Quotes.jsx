import { useEffect } from "react";

import QuoteList from '../components/quotes/QuoteList';
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../components/lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from '../components/quotes/NoQuotesFound';

const DUMMY_QUOTES = [
  { id: '1', author: 'Max', text: 'Learning React' },
  { id: '2', author: 'Roger', text: 'How to build a computer' }
];

const Quotes = () => {
  const { sendRequest, status, data: loadedQuotes, error } = useHttp(getAllQuotes, true);


  useEffect(() => {
    const getQuotes = () => {
      sendRequest();
    }
    sendRequest();    
  }, [sendRequest])
  
  if (status === 'pending'){
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );    
  }

  if (error) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );    
  }

  if ((status === 'completed') && (!loadedQuotes || loadedQuotes.length === 0 )) {
    return (
      <NoQuotesFound />
    );
  
  }

  return (
    <QuoteList quotes={loadedQuotes}></QuoteList>
  );
};

export default Quotes;


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