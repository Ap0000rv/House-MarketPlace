import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Spinner from "./Spinner";
import { list } from "firebase/storage";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

function Slider() {
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchListings = async () => {
			const listingsRef = collection(db, "listings");
			const q = query(
				listingsRef,
				orderBy("timestamp", "desc"),
				limit(10)
			);
			const querySnap = await getDocs(q);
			let listing = [];

			querySnap.forEach((doc) => {
				return listing.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			console.log(listing);
			setListings(listing);
			setLoading(false);
		};

		fetchListings();
	}, []);

	if (loading) {
		return <Spinner />;
	}

	if (listings.length === 0) {
		return <></>;
	}

	return (
		listings && (
			<>
				<p className="exploreHeading">Recommended</p>

				<Swiper
					slidesPerView={1}
					pagination={{ clickable: true }}
					loop={true}
					autoplay={{
						delay: 3000,
						pauseOnMouseEnter: true,
						disableOnInteraction: false,
					}}>
					{listings.map(({ data, id }) => (
						<SwiperSlide
							key={id}
							onClick={() =>
								navigate(`/category/${data.type}/${id}`)
							}>
							<div
								style={{
									background: `url(${data.imgUrls[0]}) center no-repeat`,
									backgroundSize: "cover",
								}}
								className="swiperSlideDiv">
								<p className="swiperSlideText">{data.name}</p>
								<p className="swiperSlidePrice">
									${data.discountedPrice ?? data.regularPrice}{" "}
									{data.type === "rent" && "/month"}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</>
		)
	);
}

export default Slider;
