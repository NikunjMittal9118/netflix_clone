import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = ({type}) => {
  const [lists, setLists] = useState([])
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    async function getHomePageLists(){
      try{
        const getLists = await axios.get(`http://localhost:8100/api/list${type ? "?type="+type : ""}${genre ? "&genre="+genre : ""}`,{
          headers:{
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmViYjg1YWM5N2NkZTJhYmYzMjg3NyIsInVzZXJOYW1lIjoiTmlrdW5qIG1pdHRhbCIsImVtYWlsIjoibmlrdW5qbWl0dGFsMDExMEBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJwcm9maWxlUGljIjoiIiwiaWF0IjoxNjkwMzIxNjg1fQ.u9jLy96e5rOr07FdRUfnGGDSdOAEKDXExigU7cKwYdg"
          }
        })
        setLists(getLists.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getHomePageLists()
  },[type, genre])
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {
        lists.map((list) => {
          return <List list={list} key={list._id}/>
        })
      }
    </div>
  );
};

export default Home;
