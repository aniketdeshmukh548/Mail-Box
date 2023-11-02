import { Fragment } from "react";
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import classes from './Layout.module.css'
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

const Layout = (props) => {
  const isAuth=useSelector(state=>state.auth.isAuthenticated)
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
      {isAuth && <div className={classes.mybutton}>
        <Link to='/mail'><button className={classes.feedback}>Compose</button></Link>
      </div>}
    </Fragment>
  );
};

export default Layout;
