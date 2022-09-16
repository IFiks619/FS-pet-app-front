import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if(!data.payload) {
      return  alert('Something went wrong')
    }

    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
    } 
  }

  if(isAuth){
    return <Navigate to='/' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type='email'
          error={Boolean(errors.email?.message)}
          {...register('email', {required: 'Write your email'})}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField 
        className={styles.field} 
        label="Пароль" 
        type='password'
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        fullWidth 
        {...register('password', {required: 'Write password'})} 
        />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
