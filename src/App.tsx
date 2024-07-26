import './app.scss';
import PageLayout from "./components/page-layout/page-layout";
import SingleProduct from './components/single-product/single-product';
import { PRODUCTS } from './static-content';

function App() {

  return (
    <PageLayout>
      {/* <ProductsListing products={PRODUCTS}/> */}
      <SingleProduct product={PRODUCTS[2]}/>
    </PageLayout>
  );
}

export default App;
