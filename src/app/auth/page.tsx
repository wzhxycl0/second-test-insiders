'use client';

import {Button, Paper, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {AuthType} from "@/app/auth/types/auth.type";
import {Controller, useForm} from "react-hook-form";
import {AuthFormType} from "@/app/auth/types/auth-form.type";
import {useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "@/configs/firebase.config";
import {useRouter} from "next/navigation";


export default function Page() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormType>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const onSubmit = async (data: AuthFormType) => {
    reset();

    if (authType === AuthType.REGISTER) {
      try {
        const res = await createUserWithEmailAndPassword(data.email, data.password);
        router.push("/");
      } catch (e) {
        console.error(e)
      }
    }

    if (authType === AuthType.LOGIN) {
      try {
        const res = await signInWithEmailAndPassword(data.email, data.password);
        router.push("/");
      } catch (e) {
        console.error(e)
      }
    }
  }

  const [authType, setAuthType] = useState<AuthType>(AuthType.LOGIN);

  return (<div style={{
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <Paper sx={{
      padding: '50px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    }}>
      <Typography variant='h4'>
        {authType}
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email is invalid"
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "The password must be longer than 6 characters."
            },
            maxLength: {
              value: 20,
              message: "The password must be shorter than 20 characters."
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        <Button variant="outlined" type="submit">
          {authType}
        </Button>
      </form>
      <Button variant='text' onClick={() => {
        setAuthType(authType === AuthType.LOGIN ? AuthType.REGISTER : AuthType.LOGIN);
      }}>
        {authType === AuthType.LOGIN ? (
          'Not have account?'
        ) : (
          'Log in'
        )}
      </Button>
    </Paper>
  </div>);
}