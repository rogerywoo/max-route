import { Fragment, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import Comments from '../components/comments/Comments';
import { getSingleQuote } from '../components/lib/api';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import useHttp from "../hooks/use-http";

const DUMMY_QUOTES = [
  { id: '1', author: 'Max', text: 'Learning React' },
  { id: '2', author: 'Roger', text: 'How to build a computer' }
];


const Quote = () => {
  const params = useParams();

  const {quoteId} = params;  // same as this  const quoteId = params.quoteId;

  const { sendRequest, status, data: quote, error } = useHttp(getSingleQuote, true);

  const routeMatch = useRouteMatch();

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId]);

  //let quote = DUMMY_QUOTES.find((quote) => quote.id === quoteId);
  
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

  if ((status === 'completed') && (!quote || quote.length === 0 )) {
    return (
      <NoQuotesFound />
    );
  
  }



  return (
    <Fragment>

      <HighlightedQuote author={quote.author} text={quote.text}> </HighlightedQuote>
      <Route path={`/quote/${quoteId}`} exact>
        <div className='centered'>
          <NavLink className='btn--flat' to={`/quote/${quoteId}/comments`} >Show Comments</NavLink >
        </div>
      </Route>

      <Route path={`${routeMatch.path}/comments`}>
        <Comments></Comments>
      </Route>
    </Fragment>
  )
};

export default Quote;
