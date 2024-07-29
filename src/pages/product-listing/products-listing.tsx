import ProductListingItem from "../../components/product-listing-item/product-listing-item"
import Product from "../../entities/product"


const ProductsListing = (props: {products:Product[]}) => {
  return (
    <div>
    <h1>Shop</h1>
    <div className="products-listing-grid">
        {props.products.map((product)=> <ProductListingItem key={product.id} product={product}/>)}
    </div>
    </div>
  )
}

export default ProductsListing