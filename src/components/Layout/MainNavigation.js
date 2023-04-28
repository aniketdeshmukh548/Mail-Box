import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { authAction } from "../../Store-Redux/authSlice";

const MainNavigation = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LogoutHandler = () => {
    dispatch(authAction.isLogout());
    localStorage.clear();
    navigate("/auth");
  };
  return (
    <div>
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Mail Box</div>
      </Link>
      <nav>
        <ul>
          {!isAuth && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isAuth && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isAuth && (
            <li>
              <button onClick={LogoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
{ isAuth &&    <header className={classes.icon}>
    <ul>
    <li>
      <Link to='/inbox'>Inbox</Link>
    </li>
    <li>
      <Link to='/outbox'>OutBox</Link>
    </li>
    <li>
      <Link to=''>Archive</Link>
    </li>
    <li>
      <Link to=''>Deleted items</Link>
    </li>
    <li>
      <Link to=''>Draft</Link>
    </li>
    </ul>
    </header>}
    </div>
  
  );
};

export default MainNavigation;
