import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import Slider from "../Components/Slider";
function Explore() {
  return (
    <div className="explore">
      <header className="pageHeader">Explore</header>
      <main>
        {/* Slider */}
        <Slider />
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="Rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Place for rent</p>
          </Link>

          <Link to="/category/sale  ">
            <img
              src={sellCategoryImage}
              alt="Sell"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Place for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
