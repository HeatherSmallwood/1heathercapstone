import { useEffect, useState } from "react";
import CreatePost from "../posts/CreatePost";
import { getPosts } from "../../lib/getPosts";
import Post from "../posts/Post";
import Navbar from "../Navbar";

const LoggedInHome = () => {
  const username = window.localStorage.getItem('username');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };
  
    fetchData();
  }, []);
  

  return (
    <>
    <Navbar username={username as string} location='home'/>
    <div className="flex mt-[80px] flex-col gap-5 items-center">
     
     


      <CreatePost setPosts={setPosts}  />
 

      {posts?.map((post,key) => (
        <Post key={key} post={post} setPosts={setPosts}/>
      ))}
    </div>
    </>
  );
}

export default LoggedInHome;
