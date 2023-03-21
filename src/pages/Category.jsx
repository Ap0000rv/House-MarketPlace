import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

const Category = () => {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [lastFetchedListing, setLastFetchedListing] = useState(null)

	const params = useParams();

	useEffect(() => {
		const fetchListings = async () => {
			try {
				//Get reference
				const listingRef = collection(db, "listings");

				// create a query

				const q = query(
					listingRef,
					where("type", "==", params.categoryName),
					orderBy("timestamp", "desc"),
					limit(5)
				);

				// Execute query
				const querySnap = await getDocs(q);

				const lastVisible = querySnap.docs[querySnap.docs.length - 1]
				setLastFetchedListing(lastVisible)

				let listings = [];
				querySnap.forEach((doc) => {
					console.log(doc);

					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});

				setListings(listings);
				setLoading(false);
			} catch (error) {
				toast.error("Could not fetch Listings");
			}
		}
		fetchListings();
	}, [params.categoryName]);

	// Pagination / load more

	const onFetchMoreListings = async () => {
		try {
			//Get reference
			const listingRef = collection(db, "listings");

			// create a query

			const q = query(
				listingRef,
				where("type", "==", params.categoryName),
				orderBy("timestamp", "desc"),
				startAfter(lastFetchedListing),
				limit(5)
			);

			// Execute query
			const querySnap = await getDocs(q);

			const lastVisible = querySnap.docs[querySnap.docs.length - 1]
			setLastFetchedListing(lastVisible)

			let listings = [];
			querySnap.forEach((doc) => {
				console.log(doc);

				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});

			setListings((prevState) => [...prevState, ...listings])
			setLoading(false);
		} catch (error) {
			toast.error("Could not fetch Listings");
		}
	};

	return (
		<div className="category">
			<header>
				<p className="pageHeader">
					{params.categoryName === "rent"
						? "places for rent"
						: "places for sell"}
				</p>
			</header>
			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<ul className="categoryListings">
							{listings.map((listings) => (
								<ListingItem
									listing={listings.data}
									id={listings.id}
									key={listings.id}
								/>
							))}
						</ul>
						</main>
						<br />
						<br />
						{lastFetchedListing && (
							<p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
						)}
				</>
			) : (
				<p>NO listings for {params.categoryName}</p>
			)}
		</div>
	);
};

export default Category;
