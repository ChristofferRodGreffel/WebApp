import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { staticMovies } from "../staticmovies";

function SingleMovieOverview() {
  const { imdbid } = useParams();

    const [movieData, setMovieData] = useState()

  useEffect(() => {
    const getStreamingData = async () => {
      const url = `https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id=${imdbid}`;
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
        setMovieData(result)
      } catch (error) {
        console.error(error);
      }
    };
    getStreamingData()
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
