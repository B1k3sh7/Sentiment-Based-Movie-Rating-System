import React from "react";
import tmdb from "../api/tmdb";
import Hero from "../components/Hero";
import Main from "../components/Main";

const Home = () => {
  return (
    <div>
      <div className="font-poppins">
        <Hero />
        <Main />
      </div>
    </div>
  );
};

export default Home;

export async function loader() {
  try {
    const response = await tmdb.get("/genre/movie/list?language=en");
    return response.data.genres;
  } catch (error) {
    console.log(error);
  }
}
