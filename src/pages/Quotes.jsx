import QuoteList from '../components/quotes/QuoteList';

const DUMMY_QUOTES = [
  {id: '1', author: 'Max', text: 'Learning React'},
  {id: '2', author: 'Roger', text: 'How to build a computer'}
];

const Quotes = () => {
  return(
    <QuoteList quotes={DUMMY_QUOTES}></QuoteList>
  );
};

export default Quotes;