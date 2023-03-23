import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import Slider from "../components/Slider";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";

const Explore = () => {
	return (
		<div className="explore">
			<header>
				<p className="pageHeader">Explore</p>
			</header>
			<main>
				<Slider />
				<p className="exploreCategoryHeading">Categories</p>
				
				<div className="exploreCategories">
					<Link to="/category/rent">
						<img
							src={rentCategoryImage}
							alt="rent"
							className="exploreCategoryImg"
						/>
						<p className="exploreCategoryName">places for rent</p>
					</Link>
					<Link to="/category/sale">
						<img
							src={sellCategoryImage}
							alt="sell"
							className="exploreCategoryImg"
						/>
						<p className="exploreCategoryName">places for sell</p>
					</Link>
				</div>
				<div className="space">
				</div>
			</main>
		</div>
	);
};

export default Explore;
