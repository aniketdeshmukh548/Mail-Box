import { useSelector } from 'react-redux';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  const isAuth=useSelector(state=>state.auth.isAuthenticated)
  return (
    <section className={classes.starting}>
      <h1>Welcome To Mail Box</h1>
      {!isAuth && <h3>Please Login To Continue...</h3>}
    </section>
  );
};

export default StartingPageContent;
