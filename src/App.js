import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Welcome from "./page/Welcome";
import Products from "./page/Products";
import MainHeader from "./component/MainHeader";
import ProductDetail from "./page/ProductDetail";


function App() {
  return (
    <div>
      <MainHeader>

      </MainHeader>
      <main>
        <Switch>
          {/* All routes will checked.  Not just one.  Switch component will act as a switch */}
          <Route path="/welcome">
            <Welcome></Welcome>
          </Route>
          {/* The product detail needs to be before the products page or use exact */}
          <Route path="/products/:productId">  
            <ProductDetail />
          </Route>          
          {/* You can use <Route path="/producst" exact> in order to force exact match  */}
          <Route path="/products">
            <Products></Products>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
