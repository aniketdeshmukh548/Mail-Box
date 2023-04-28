import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { authAction } from '../../Store-Redux/authSlice';
const AuthForm = () => {
  const emailInputRef=useRef();
  const passRef=useRef();
  const confirmpassRef=useRef();
  const navigateMail=useNavigate()
  const dispatch=useDispatch()
  const [isLogin, setIsLogin] = useState(true);
  const [load,setLoad]=useState(false)
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(event)=>{
    dispatch(authAction.isLogin())
    event.preventDefault();
    const enteredEmail=emailInputRef.current.value;
    const enteredPass=passRef.current.value;
    const confirmPassword=confirmpassRef.current.value;
    setLoad(true);
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2cscbhhl2PHO0lD5alxIQQHudC5OHxh4'
    }
    else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2cscbhhl2PHO0lD5alxIQQHudC5OHxh4'
    }
    
    fetch(url,
      {
        method:'POST',
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPass,
          confirm:confirmPassword,
          returnSecureToken:true,
        }),
        headers:{'Content-Type':'application/JSON'}
      }).then((res)=>{
        setLoad(false)
        if(res.ok){
          return res.json();
        }
        else{
          return res.json().then(data=>{
            let errorMessage='Authentication Failed!'
            throw new Error(errorMessage);
          })
        }
      }).then(data=>{
        localStorage.setItem('localId',data.localId)
       dispatch(authAction.isLogin(data.localId))
        dispatch(authAction.isLogin(data.idToken))
        console.log(data)
        navigateMail('/mail')
      }).catch(err=>{
        alert(err.message)
      })
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up' }</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passRef}
          />
        </div>
      <div className={classes.control}>
        <label htmlFor='password'>Confirm Password</label>
        <input
          type='password'
          id='password'
          required ref={confirmpassRef}
        />
      </div>
        <button type='button' className={classes.button} >Forgot Password?</button>
        <div className={classes.actions}>
          {!load && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {load && <p>Sending Request</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;