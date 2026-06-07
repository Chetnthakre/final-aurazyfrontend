import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../api';

interface Product {
  _id: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  image: string;
  stock: 'in' | 'out';
  type: string;
  newness: number;
  bestSelling: number;
}

const Collection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get('type');
  const searchFilter = searchParams.get('search');

  const [availability, setAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  

  const BASE_URL = "https://aurazy-backend-2.onrender.com";



  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (typeFilter) {
      result = result.filter(p => p.type === typeFilter);
    }

    if (searchFilter) {
      const query = searchFilter.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.type.toLowerCase().includes(query)
      );
    }

    if (availability !== 'all') {
      result = result.filter(p => p.stock === availability);
    }

    switch (sortBy) {
      case 'low':
        result.sort((a, b) => a.newPrice - b.newPrice);
        break;
      case 'high':
        result.sort((a, b) => b.newPrice - a.newPrice);
        break;
      case 'new':
        result.sort((a, b) => b.newness - a.newness);
        break;
      case 'best':
        result.sort((a, b) => b.bestSelling - a.bestSelling);
        break;
      default:
        break;
    }

    return result;
  }, [products, availability, sortBy, typeFilter, searchFilter]);

  if (loading) return <div className="section__container">Loading products...</div>;
  if (error) return <div className="section__container">{error}</div>;

  return (
    <section className="section__container collection__container">
      {searchFilter && (
        <h3 style={{ marginBottom: '2rem', color: '#000' }}>
          Showing results for "{searchFilter}" 
          <span 
            style={{ marginLeft: '10px', fontSize: '0.9rem', color: 'var(--text-light)', cursor: 'pointer' }}
            onClick={() => window.location.href = '/collection'}
          >
            (Clear)
          </span>
        </h3>
      )}
      <div className="collection__top">
        <div className="filters">
          <select 
            id="availability-filter" 
            value={availability} 
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="all">Availability</option>
            <option value="in">In stock</option>
            <option value="out">Out of stock</option>
          </select>
        </div>

        <div className="sort">
          <select 
            id="sort-filter" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="best">Best Selling</option>
            <option value="new">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product__grid">
        {filteredProducts.length === 0 ? (
          <p>No products found matching your criteria.</p>
        ) : (
          filteredProducts.map(product => (
            <div className="product__card" key={product._id}>
              <Link to={`/product/${product._id}`} className="product__image__container">


<img
  src={
    product.image.startsWith("http")
      ? product.image
      : `${BASE_URL}${product.image}`
  }
  alt={product.name}
/>


              </Link>
              <div className="product__details">
                <h4>{product.name}</h4>
                <div className="price__container">
                  <span className="old">Rs. {product.oldPrice}</span>
                  <span className="new">Rs. {product.newPrice}</span>
                </div>
                <Link to={`/product/${product._id}`} className="btn">Choose Options</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Collection;
