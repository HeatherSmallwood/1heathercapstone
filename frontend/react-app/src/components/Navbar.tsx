import { useNavigate } from "react-router-dom";

const Navbar = ({username,location}:{username:string,location?:string}) => {
  
    return (
    <div className="bg-black pr-5 fixed top-0 h-[40px]  flex w-full items-center justify-end flex-row gap-2">
    <a href={location=='home'?`/${username}`:'/'}>
      {location=='home'?'Profile':'Home'}
    </a>
    <a href="/sign-in"  onClick={() => {
        window.localStorage.removeItem('user_id');
        window.localStorage.removeItem('username');
      }}>
     Logout
    </a>
    </div>
  )
}
export default Navbar