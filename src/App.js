import { Redirect, Route, Switch } from 'react-router-dom';

import MainNavigation from './components/layout/MainNavigation';
import Quote from './pages/Quote';
import Quotes from './pages/Quotes';
import NewQuote from './pages/NewQuote';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/quotes' />
        </Route>
        <Route path='/quote/:quoteId'>
          <Quote />
        </Route>
        <Route path='/quotes'>
          <Quotes />
        </Route>
        <Route path='/add-quote'>
          <NewQuote />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>        
      </Switch>
    </Layout>
  );
}

export default App;
