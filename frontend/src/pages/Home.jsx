import React from "react";
import AboutUs from "../components/AboutUs";
import BestRentedBooks from "../components/BestRentedBooks";
import Carousel from "../components/HomeCarousel";
import Services from "../components/Services";
import Trending from "../components/Trending";

const Home = () => {
    return (
        <div>
            <AboutUs />
            <Carousel />
            <Trending />
            <Services />
            <BestRentedBooks />
        </div>
    );
};

export default Home;
