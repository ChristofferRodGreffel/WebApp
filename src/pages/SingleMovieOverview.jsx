import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { staticMovies } from "../staticmovies";

function SingleMovieOverview() {
  const { imdbid } = useParams();

  useEffect(() => {
    const getStreamingInfo = async () => {
      const url = "https://streaming-availability.p.rapidapi.com/countries";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "0483b93bf4msh60c54eb3f79171dp13500ajsn06d4c55a084d",
          "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);

  return (
    <>
      {staticMovies.movies.map((listItem) => {
        if (listItem.imdb_id === imdbid) {
          return (
            <div key={listItem.imdb_id}>
              <img style={{ width: "20%" }} src={listItem.poster_image} alt={`${listItem.title} poster`} />
            </div>
          );
        }
      })}

      <div style={{ fontSize: 128 }}>{imdbid}</div>
    </>
  );
}

export default SingleMovieOverview;
