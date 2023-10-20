import React from 'react'
import { useParams } from "react-router-dom";
import { staticMovies } from '../staticmovies';

function SingleMovieOverview() {

    const { imdbid } = useParams();


    return (
        <>
            {staticMovies.movies.map((listItem) => {
                if (listItem.imdb_id === imdbid) {
                    return (
                        <div key={listItem.imdb_id}>
                            <img style={{width: '20%'}} src={listItem.poster_image} alt={`${listItem.title} poster`} />
                        </div>
                    );
                }
            })}

            <div style={{ fontSize: 128 }}>{imdbid}</div>
        </>
    )
}

export default SingleMovieOverview