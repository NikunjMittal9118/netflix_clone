import "./listItem.scss";
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListItem({ index, itemId }) {
  const [movie, setMovie] = useState({})
  useEffect(() =>{
    async function getMovie(){
      try{
        const res = await axios.get(`http://localhost:8100/api/movies/find/${itemId}`,{
          headers:{
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmViYjg1YWM5N2NkZTJhYmYzMjg3NyIsInVzZXJOYW1lIjoiTmlrdW5qIG1pdHRhbCIsImVtYWlsIjoibmlrdW5qbWl0dGFsMDExMEBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJwcm9maWxlUGljIjoiIiwiaWF0IjoxNjkwMzIxNjg1fQ.u9jLy96e5rOr07FdRUfnGGDSdOAEKDXExigU7cKwYdg"
          }
        })
        setMovie(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getMovie()
  }, [itemId])

  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link to={{pathname:'/watch', search: `${movie.trailer}` }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={movie?.img}
          alt=""
        />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>1 hour 14 mins</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">
                {movie.desc}
              </div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
