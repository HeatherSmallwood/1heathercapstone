import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Post from './components/posts/Post';
import { getUserPosts } from './lib/getUserPosts';
import Navbar from './components/Navbar';

const UserProfile = () => {
  const { username } = useParams();

  const [userPosts,setUserPosts]=useState([])
  const navigator=useNavigate()
  useEffect(() => {
    const user_id = window.localStorage.getItem('user_id');
    const fetchData = async () => {
      const posts = await getUserPosts(user_id as string);
      setUserPosts(posts);
    };
  

    if (!user_id) {
      navigator('/sign-in');
    }
    else
    {    fetchData();


    }
  }, [navigator]);

  


  return (
    <>
        <Navbar username={username as string} location='profile'/>
    <div className='h-[80px] bg-black'/>
    <div className='flex-bg flex flex-col gap-3 items-center'>

    <div className="video-container">
          <iframe 
            src='/mp4/hydroflight.mp4?version=3&rel=0' 
            width="100%" 
            height="100%" 
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' 
            allowFullScreen
            title="User Video"
            autoPlay // This line is crucial to autoplay the video
            loop // This line is crucial to loop the video
          />
        </div>

      

     

    

{userPosts?.map((post,key) => (
        <Post key={key} post={post} setPosts={setUserPosts}/>
      ))}
    </div>
    </>
  );
};

export default UserProfile;
