import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Featured({ type }) {

  const [randomMovie, setRandomMovie] = useState({})

  useEffect(() => {
    async function getRandomMovies(){
      try{
        const random = await axios.get(`http://localhost:8100/api/movies/random${type ? '?type='+type : ""}`, {
          headers:{
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmViYjg1YWM5N2NkZTJhYmYzMjg3NyIsInVzZXJOYW1lIjoiTmlrdW5qIG1pdHRhbCIsImVtYWlsIjoibmlrdW5qbWl0dGFsMDExMEBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJwcm9maWxlUGljIjoiIiwiaWF0IjoxNjkwMzIxNjg1fQ.u9jLy96e5rOr07FdRUfnGGDSdOAEKDXExigU7cKwYdg"
          }
        })
        console.log(random.data)
        setRandomMovie(random.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getRandomMovies()
  }, [type])

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <div className="info">
        <img
          src={randomMovie.img}
          alt=""
        />
        <span className="desc">
          {randomMovie.desc}
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
