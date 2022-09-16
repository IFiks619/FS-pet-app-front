import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, fetchRegister } from "../../redux/slices/auth";

import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert('Something went wrong')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

// /////////////////////////////////////// 3:20:00
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          {...register('fullName', { required: 'Write your full name' })}
          helperText={errors.fullName?.message}
          className={styles.field}
          label="Full name"
          fullWidth />
        <TextField
          type='email'
          error={Boolean(errors.email?.message)}
          {...register('email', { required: 'Write your email' })}
          helperText={errors.email?.message}
          className={styles.field}
          label="E-Mail"
          fullWidth />
        <TextField
          type='password'
          error={Boolean(errors.password?.message)}
          {...register('password', { required: 'Write your password' })}
          helperText={errors.password?.message}
          className={styles.field}
          label="Password"
          fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
