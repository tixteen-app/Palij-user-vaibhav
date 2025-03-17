// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useCoupon from "../../hook/coupanHook";
// import styles from './CartCalculation.module.css';

// function CartCalculation({
// 	tax,
// 	shipping,
// 	CoupanApplied,
// 	total,
// 	Final,
// 	ButtonName,
// 	disabled,
// 	isCashOnDelivery,
// 	totalwithoutgst

// }) {
// 	const [loadingData, setLoadingData] = useState({
// 		final: true,
// 		discount: true,
// 		shipping: true,
// 	});

// 	const formatNumber = (number) => {
// 		return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number);
// 	};

// 	const {
// 		couponCode,
// 		setCouponCode,
// 		appliedCoupon,
// 		couponDiscount,
// 		applyCoupon,
// 		removeCoupon,

// 	} = useCoupon();
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		// Simulate data fetching
// 		setTimeout(() => {
// 			setLoadingData({
// 				final: false,
// 				discount: false,
// 				shipping: false,
// 			});
// 		}, 2000); // Simulating 2 seconds delay
// 	}, []);

// 	const roundValue = (value) => {
// 		return isCashOnDelivery ? Math.round(value) : value;
// 	};

// 	const discount = (total) - Final;
// 	const roundedDiscount = roundValue(discount);
// 	const roundedFinal = roundValue(Final);

// 	const ShimmerEffect = () => (
// 		<div className={styles.shimmer}>
// 			<div className={styles.shimmerInner}></div>
// 		</div>
// 	);

// 	return (
// 		<div className={styles.orderSummary}>
// 			<h2 className={styles.title}>Order Details</h2>

// 			<div className={styles.details}>
// 				<div className={styles.row}>
// 					<span>Order Amount:</span>
// 					<>
// 					 {loadingData.final ? <ShimmerEffect /> : <span>{formatNumber(total)}</span>} 
// 					</>
// 				</div>

// 				<div className={styles.row}>
// 					<span>Discount:</span>
// 					{loadingData.discount ? (
// 						<ShimmerEffect />
// 					) : (
// 						<span className={styles.savings}>
// 							{formatNumber(isCashOnDelivery ? roundedDiscount : discount)}
// 						</span>
// 					)}
// 				</div>
// 				<div className={styles.row}>
// 					<span>Taxble  Amount:</span>
// 					<>
// 					 {loadingData.final ? <ShimmerEffect /> : <span>{formatNumber(totalwithoutgst)}</span>} 
// 					</>
// 				</div>

// 				<div className={styles.row}>
// 					<span>Delivery Fee:</span>
// 					{loadingData.shipping ? (
// 						<ShimmerEffect />
// 					) : (
// 						<span>
// 							{shipping === 0 ? (
// 								<>Free</>
// 							) : (
// 								formatNumber(shipping)
// 							)}
// 						</span>
// 					)}
// 				</div>
// 				{tax !== 0 &&
// 				<div className={styles.row}>
// 					<span>Tax added:</span>
// 					{loadingData.tax ? (
// 						<ShimmerEffect />
// 					) : (
// 						<span>
// 							₹{tax.toFixed(2)}
// 							{/* ₹{Math.round(tax * 100) / 100} */}
// 						</span>
// 					)}
// 				</div>
// 				}
// 			</div>

// 			<div className={styles.total}>
// 				<span>Order Total:</span>
// 				{loadingData.final ? (
// 					<ShimmerEffect />
// 				) : (
// 					<span>{formatNumber(isCashOnDelivery ? roundedFinal : Final)}</span>
// 				)}
// 			</div>

// 			<div className={styles.actions}>
// 				<button
// 					className={styles.process_to_check}
// 					disabled={disabled || loadingData.final}
// 					style={{ opacity: disabled || loadingData.final ? 0.5 : 1 }}
// 					onClick={() => navigate("/cart/checkout/")}
// 				>
// 					{ButtonName}
// 				</button>  
// 			</div>
// 		</div>
// 	);
// }

// export default CartCalculation;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCoupon from "../../hook/coupanHook";
import styles from './CartCalculation.module.css';

function CartCalculation({
	tax,
	shipping,
	CoupanApplied,
	total,
	Final,
	ButtonName,
	disabled,
	isCashOnDelivery,
	totalwithoutgst
}) {
	
	const [loadingData, setLoadingData] = useState({
		final: true,
		discount: true,
		shipping: true,
	});

	const formatNumber = (number) => {
		return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number);
	};

	const {
		couponCode,
		setCouponCode,
		appliedCoupon,
		couponDiscount,
		applyCoupon,
		removeCoupon,
	} = useCoupon();
	const navigate = useNavigate();

	useEffect(() => {
		// Simulate data fetching
		setTimeout(() => {
			setLoadingData({
				final: false,
				discount: false,
				shipping: false,
			});
		}, 2000); // Simulating 2 seconds delay
	}, []);

	const roundValue = (value) => {
		return isCashOnDelivery ? Math.round(value) : value;
	};

	const discount = (total) - Final;
	const roundedDiscount = roundValue(discount);
	const roundedFinal = roundValue(Final);

	const ShimmerEffect = () => (
		<div className={styles.shimmer}>
			<div className={styles.shimmerInner}></div>
		</div>
	);

	return (
		<>
			{/* <div className={styles.orderSummary}>
				<h2 className={styles.title}>Order Details</h2>

				<div className={styles.details}>
					<div className={styles.row}>
						<span>Order Amount:</span>
						<>
							{loadingData.final ? <ShimmerEffect /> : <span>{formatNumber(total)}</span>}
						</>
					</div>
					{totalwithoutgst &&
						<div className={styles.row}>
							<span>Taxble Amount:</span>
							<>
								{loadingData.final ? <ShimmerEffect /> : <span>{formatNumber(totalwithoutgst)}</span>}
							</>
						</div>
					}

					<div className={styles.row}>
						<span>Delivery Fee:</span>
						{loadingData.shipping ? (
							<ShimmerEffect />
						) : (
							<span>
								{shipping === 0 ? (
									<>Free</>
								) : (
									formatNumber(shipping)
								)}
							</span>
						)}
					</div>
					{tax !== 0 &&
						<div className={styles.row}>
							<span>Tax added:</span>
							{loadingData.tax ? (
								<ShimmerEffect />
							) : (
								<span>
									₹{tax.toFixed(2)}
								</span>
							)}
						</div>
					}
				</div>

				<div className={styles.total}>
					<span>Order Total:</span>
					{loadingData.final ? (
						<ShimmerEffect />
					) : (
						<span>{formatNumber(total)}</span>
					)}
				</div>

				<div className={styles.discountSection}>
					<div className={styles.row}>
						<span>Discount:</span>
						{loadingData.discount ? (
							<ShimmerEffect />
						) : (
							<span className={styles.savings}>
								{formatNumber(isCashOnDelivery ? roundedDiscount : discount)}
							</span>
						)}
					</div>
				</div>

				<div className={styles.finalPrice}>
					<span>Final Price:</span>
					{loadingData.final ? (
						<ShimmerEffect />
					) : (
						<span>{formatNumber(isCashOnDelivery ? roundedFinal : Final)}</span>
					)}
				</div>

				<div className={styles.actions}>
					<button
						className={styles.process_to_check}
						disabled={disabled || loadingData.final}
						style={{ opacity: disabled || loadingData.final ? 0.5 : 1 }}
						onClick={() => navigate("/cart/checkout/")}
					>
						{ButtonName}
					</button>
				</div>
			</div> */}


			{/* <div className={styles.orderSummary} style={{ marginTop: "100px" }} >
				<h2 className={styles.title}>Order Details</h2>

				<div className={styles.details}>
					<div className={styles.row}>
						<span>Order Amount:</span>
						<>
							{loadingData.final ? <ShimmerEffect /> : <span>{formatNumber(total)}</span>}
						</>
					</div>
					<div className={styles.discountSection}>
						<div className={styles.row}>
							<span>Discount:</span>
							{loadingData.discount ? (
								<ShimmerEffect />
							) : (
								<span className={styles.savings}>
									{formatNumber(isCashOnDelivery ? roundedDiscount : discount)}
								</span>
							)}
						</div>
					</div>

					<div className={styles.finalPrice}>
						<span>Salling Price:</span>
						{loadingData.final ? (
							<ShimmerEffect />
						) : (
							<span>{formatNumber(isCashOnDelivery ? roundedFinal : Final)}</span>
						)}
					</div>
					{totalwithoutgst &&
						<div className={styles.discountSection}>
							<div className={styles.row}>
								<span>Taxable Amount:</span>
								<>
									{loadingData.final ? <ShimmerEffect /> : <span>{formatNumber(totalwithoutgst)}</span>}
								</>
							</div>
						</div>
					}

					<div className={styles.row}>
						<span>Delivery Fee:</span>
						{loadingData.shipping ? (
							<ShimmerEffect />
						) : (
							<span>
								{shipping === 0 ? (
									<>Free</>
								) : (
									formatNumber(shipping)
								)}
							</span>
						)}
					</div>
					{tax !== 0 &&
						<div className={styles.row}>
							<span>Tax added:</span>
							{loadingData.tax ? (
								<ShimmerEffect />
							) : (
								<span>
									₹{tax.toFixed(2)}
								</span>
							)}
						</div>
					}
				</div>

				<div className={styles.total}>
					<span>Order Total:</span>
					{loadingData.final ? (
						<ShimmerEffect />
					) : (
						<span>{formatNumber(isCashOnDelivery ? roundedFinal : Final)}</span>
					)}
				</div>



				<div className={styles.actions}>
					<button
						className={styles.process_to_check}
						disabled={disabled || loadingData.final}
						style={{ opacity: disabled || loadingData.final ? 0.5 : 1 }}
						onClick={() => navigate("/cart/checkout/")}
					>
						{ButtonName}
					</button>
				</div>
			</div> */}


			<div className={styles.orderSummary}  >
				<h2 className={styles.title}>Order Details</h2>

				<div className={styles.details}>
					<div className={styles.row}>
						<span>MRP:</span>
						<>
							{loadingData.final ? <ShimmerEffect /> : <span>{formatNumber(total)}</span>}
						</>
					</div>
					<div className={styles.discountSection}>
						<div className={styles.row}>
							<span>Discount:</span>
							{loadingData.discount ? (
								<ShimmerEffect />
							) : (
								<span className={styles.savings}>
									{formatNumber(isCashOnDelivery ? roundedDiscount : discount)}
								</span>
							)}
						</div>
					</div>

					<div className={styles.finalPrice}>
						<span>Salling Price:</span>
						{loadingData.final ? (
							<ShimmerEffect />
						) : (
							<span>{formatNumber(isCashOnDelivery ? roundedFinal : Final)}</span>
						)}
					</div>
					{totalwithoutgst &&
						<div className={styles.row}>
							<span>Taxble Amount:</span>
							<>
								{loadingData.final ? <ShimmerEffect /> : <span>{formatNumber(totalwithoutgst)}</span>}
							</>
						</div>
					}
					<div className={styles.row}>
						<span>Delivery Fee:</span>
						{loadingData.shipping ? (
							<ShimmerEffect />
						) : (
							<span>
								{shipping === 0 ? (
									<>Free</>
								) : (
									formatNumber(shipping)
								)}
							</span>
						)}
					</div>
					{tax !== 0 &&
						<div className={styles.row}>
							<span>Tax added:</span>
							{loadingData.tax ? (
								<ShimmerEffect />
							) : (
								<span>
									₹{tax.toFixed(2)}
								</span>
							)}
						</div>
					}
				</div>

				<div className={styles.total}>
					<span>Order Total:</span>
					{loadingData.final ? (
						<ShimmerEffect />
					) : (
						<span>{formatNumber(isCashOnDelivery ? roundedFinal : Final)}</span>
					)}
				</div>



				<div className={styles.actions}>
					<button
						className={styles.process_to_check}
						disabled={disabled || loadingData.final}
						style={{ opacity: disabled || loadingData.final ? 0.5 : 1 }}
						onClick={() => navigate("/cart/checkout/")}
					>
						{ButtonName}
					</button>
				</div>
			</div>
		</>

	);
}

export default CartCalculation;