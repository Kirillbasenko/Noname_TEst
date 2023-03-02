import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from 'react';
import {  useNavigate, } from "react-router-dom";
import { useDispatch } from "react-redux"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import {auth} from "../fireBase"
import { authGoogle } from "../helpers/helpers";
import { MAIN_ROUTE } from '../utils/consts';
import { setUser } from "../store/slices/userSlice";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Auth = () => {
   const [route, setRoute] = useState("login")
   const error = useRef("")
   let navigate = useNavigate() 
   const dispatch = useDispatch(); 

   const register = async () => {
      createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
         .then(({user}) => {
            dispatch(setUser(user.accessToken))
            navigate(MAIN_ROUTE)
         })
         .catch((e) => {
            error.current.style.display = "block"
         });
   }

   const login = () => {
      signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then(({user}) => { 
         dispatch(setUser(user.accessToken))
         navigate(MAIN_ROUTE)
      })
      .catch((e) => {
         error.current.style.display = "block"
      });
   }

   const formik = useFormik({
      initialValues:{
         email: "",
         password: "",
      },
      validationSchema: Yup.object({
         email: Yup.string()
                  .email("Неправильна адреса")
                  .required("Обов'язкове поле"),
         password: Yup.string()
                  .required("Обов'язкове поле"),
      }),
      onSubmit: route === "login" ? login : register
   })

   return(
      <Container  
         className='d-flex justify-content-center align-items-center'
         style={{marginTop: 150}}>
         <Card style={{width: 600}} className="p-5">
            <h2>{route === "login" ? "Авторизація" : "Реєстрація"}</h2>
            <form onSubmit={formik.handleSubmit} className='d-flex flex-column'>
               {route === "login" ? 
                  <Button onClick={() => authGoogle(navigate, dispatch, setUser)} variant="outlined">Увійти через google</Button>: null}
                  <TextField
                     error={formik.errors.email && formik.touched.email}
                     className='mt-3'
                     required
                     label="Email"
                     placeholder='Введіть ваш email...'
                     onChange={formik.handleChange} 
                     value={formik.values.email} 
                     name="email"
                     helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                     onBlur={formik.handleBlur}/>
                  <TextField
                     error={formik.errors.password && formik.touched.password}
                     className='mt-3'
                     label="Password"
                     required
                     placeholder='Введіть ваш пароль...'
                     onChange={formik.handleChange} 
                     value={formik.values.password} 
                     name="password" 
                     type="password"
                     helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                     onBlur={formik.handleBlur}/>
               {route === "login" ? 
                  <Box 
                     className='mt-3'>
                     Нема акаунту? 
                     <Button onClick={() => {
                        setRoute("register")
                        error.current.style.display = "none"
                     } } variant="text">Зареєструйся!</Button>
                  </Box> : 
                  <Box 
                     className='mt-3'>
                     Є аккаунт? 
                     <Button onClick={() => {
                        setRoute("login")
                        error.current.style.display = "none"
                     } } variant="text">Увійдіть!</Button>
                  </Box>}
               <Button
                  type='submit'
                  variant="outlined"
                  color="success"
                  className='mt-3 align-self-start'>
                  {route === "login" ? "Увійти" : "Зареєструватись"}
               </Button>
               <Box 
                  style={{display: "none", color: "red"}} 
                  ref={error} 
                  className="not-user">
                  {route === "login" ? "Користувач не знайдений" : "Користувач із таким Email вже зареєстрований"}
               </Box>
            </form>
         </Card>
      </Container>
   )
}

export default Auth