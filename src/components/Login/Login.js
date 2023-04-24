import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../Context/auth-context';
import Input from '../Input/Input';


const emailReducer = (state,action) => {

  if(action.type === 'USER_INPUT'){
    return {
      value: action.val, isValid:action.val.includes('@')
    }
  }
  if(action.type === 'USER_BLUR'){
    return {
      value: state.value, isValid: state.value.includes('@')
    }
  }
  return {
    value: '',
    isValid: false
  }
}

const passwordReducer = (state,action) => {
  if(action.type === 'USER_INPUT'){
  return {
    value: action.val, isValid:action.val.trim().length > 6
  }
}
if(action.type === 'USER_BLUR'){
  return {
    value: state.value, isValid: state.value.trim().length > 6
  }
}
  return{
    value: '',
    isValid: false
  };
};

const Login = () => {
    const [emailState, dispatchEmail] = useReducer(emailReducer,{
    value: '',
    isValid: null
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer,{
    value: '',
    isValid: null
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const ctx = useContext(AuthContext);

  useEffect(()=>{
    const identyfier = setTimeout(() =>{
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      )
    },500)
      return () => {
        clearTimeout(identyfier)
      }
  },[emailState.isValid,passwordState.isValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val:event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val:event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'USER_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'USER_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id='email'
          type='email'
          label='E-mail'
          value={ emailState.value }
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={emailState.isValid}
        />
        <Input 
          id='password'
          type='password'
          label='Password'
          value={ passwordState.value }
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={passwordState.isValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
