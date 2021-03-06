import React, {useState, useEffect} from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart } from './components';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	const fetchProducts = async() => {
		const { data } = await commerce.products.list();

		setProducts(data);
	}

	const fetchCart = async() => {
		const { cart } = await commerce.cart.retrieve();

		setCart(cart);
	}

	const handleAddToCart = async(productId, quantity) => {
		const { cart } = await commerce.cart.add(productId, quantity);

		setCart(cart);
	}

	const handleUpdateCartQuantity = async (productId, quantity) => {
		const { cart } = await commerce.cart.update(productId, {quantity});

		setCart(cart);
	}

	const handleRemoveFromCart = async (productId) => {
		const { cart } = await commerce.cart.remove(productId);

		setCart(cart);
	}

	const handleEmptyCart = async () => {
		const { cart } = await commerce.cart.empty();

		setCart(cart);
	}

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	console.log(cart);

	return (
		<Router>
			<div>
				<Navbar totalItems={cart.totalItems} />
				<Routes>
					<Route exact path = "/">
						<Products products={products} onAddToCart={handleAddToCart} />
					</Route>
					<Route exact path = "/cart">
						<Cart
							cart={cart}
							handleUpdateCartQuantity={handleUpdateCartQuantity}
							handleRemoveFromCart={handleRemoveFromCart}
							handleEmptyCart={handleEmptyCart}
						/>
					</Route>
				</Routes>
			</div>
		</Router>	
	);
}

export default App;