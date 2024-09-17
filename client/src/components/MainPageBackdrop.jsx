import React from "react";

function MainPageBackdrop({ backdrop_path }) {
  return (
    <>
      <div className="w-full h-screen bg-white z-50">
        <img
          src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
          alt=""
          className="w-full h-screen object-cover"
        />
        <div className="absolute h-screen w-full top-0 left-0 bg-gradient-to-t from-black/80 to-transparent">
          <div className="w-full h-screen absolute top-0 left-0"></div>
        </div>
      </div>
    </>
  );
}

export default MainPageBackdrop;
