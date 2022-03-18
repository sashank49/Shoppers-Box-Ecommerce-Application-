import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router-dom";

const Success = () => {
	const location = useLocation();
	const history = useHistory();
	//in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
	// const data = location.state.stripeData;
	const cart = location.state.products;
	const currentUser = useSelector((state) => state.user.currentUser);
	const [orderId, setOrderId] = useState(null);
	const data = location.state.stripeData;
	const toHome = () => {
		history.push("/");
		console.log("111");
	};
	useEffect(() => {
		const createOrder = async () => {
			try {
				const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
				const currentUser = user && JSON.parse(user).currentUser;
				const TOKEN = currentUser?.accessToken;
				const res = await userRequest.post(
					"http://localhost:5000/api/orders",
					{
						userId: currentUser._id,
						products: cart.products.map((item) => ({
							productId: item._id,
							quantity: item._quantity,
						})),
						amount: cart.total,
					},
					{
						headers: { token: `Bearer ${TOKEN}` },
					}
				);
				console.log(res);
				setOrderId(res.data._id);
			} catch {}
		};
		createOrder();
	}, [cart, data, currentUser]);

	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{orderId
				? `Order has been created successfully. Your order number is ${orderId}`
				: `Successfull. Your order is being prepared...`}
			<button style={{ padding: 10, marginTop: 20 }} onClick={toHome}>
				Go to Homepage
			</button>
		</div>
	);
};

export default Success;
