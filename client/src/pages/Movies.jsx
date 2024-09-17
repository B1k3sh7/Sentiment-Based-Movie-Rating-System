import React, { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout.js";
import getAccessToken from "../utils/auth.js";

function Movies(props) {
  const [data, setData] = useState("");
  const handleLogout = useLogout();

  useEffect(() => {
    async function getMovies() {
      const accessToken = getAccessToken();

      try {
        const response = await jwtInterceptor.get(
          "http://localhost:5000/movies",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setData(response.data.message);
        console.log("In movie route", response);
      } catch (error) {
        handleLogout();
        console.log(error);
      }
    }
    getMovies();
  }, []);

  return (
    <div>
      <h2 className="text-white">{data}</h2>
    </div>
  );
}

export default Movies;
