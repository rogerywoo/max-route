import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
  const history = useHistory();
  const addQuote = (author, text) => {
    console.log ("hello");

    history.push('/quotes');
  
  }
  return <QuoteForm onAddQuote={addQuote}></QuoteForm>
};

export default NewQuote;