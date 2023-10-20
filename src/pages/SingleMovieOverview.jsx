import React from 'react'
import { useParams } from "react-router-dom";

function SingleMovieOverview() {
    
    const { imdbid } = useParams();


    return (
        <div style={{fontSize: 128}}>{imdbid}</div>
    )
}

export default SingleMovieOverview