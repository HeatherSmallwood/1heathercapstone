
const NotLoggedInHome = () => {
  return (
    <div className="notLoggedIn">
 
    <a href="/sign-in">
      <button type="submit">Sign In</button>
    </a>
    <a href="/sign-up">
      <button type="submit">Sign Up</button>
    </a>
  </div>
  )
}

export default NotLoggedInHome