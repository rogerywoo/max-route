import { Fragment } from 'react';
import { Route, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
  { id: '1', author: 'Max', text: 'Learning React' },
  { id: '2', author: 'Roger', text: 'How to build a computer' }
];


const Quote = () => {
  const params = useParams();

  const quoteId = params.quoteId;

  let quote = DUMMY_QUOTES.find((quote) => quote.id === quoteId);

  if (!quote) {
    quote = { author: "Unknown", text: "Unknown" };
  }

  return (
    <Fragment>

      <HighlightedQuote author={quote.author} text={quote.text}> </HighlightedQuote>
      <Route path={`/quote/${quoteId}`} exact>
        <div className='centered'>
          <NavLink className='btn--flat' to={`/quote/${quoteId}/comments`} >Show Comments</NavLink >
        </div>
      </Route>

      <Route path={`/quote/${quoteId}/comments`}>
        <Comments></Comments>
      </Route>
    </Fragment>
  )
};

export default Quote;
