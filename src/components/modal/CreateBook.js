import { useState, useRef  } from 'react';
import { useSelector } from "react-redux"
import { useFormik } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";

import { styleReview } from '../../helpers/style';
import { db } from '../../fireBase';

import {Box, Button, Typography, Modal, TextField, InputLabel} from "@mui/material"
import {FormControl, OutlinedInput, InputAdornment, MenuItem, Select} from "@mui/material"

const CreateBook = ({open, handleClose}) => {
   const [photo, setPhoto] = useState(null)
   const file = useRef(null)
   const [src, setSrc] = useState(null)

   const {categories, authors} = useSelector(state => state.product)

   const douwload = async () => {
      let reader = new FileReader()
      reader.readAsDataURL(file.current.files[0])
      reader.onload = function (){
         setSrc(reader.result)
      }
   }

   const selectFile = e => {
      setPhoto(e.target.files[0]);
   }

   const addBook = async () => {
      console.log("fasdf");
      const docRef = await addDoc(collection(db, "books"), {
         name: formik.values.name,
         price: formik.values.price,
         categories: formik.values.categories,
         authors: formik.values.authors,
         img: src
      });
      formik.values.name = ""
      formik.values.price = ""
      formik.values.categories = ""
      formik.values.authors = ""
      setSrc(null)
      handleClose()
   }

   const formik = useFormik({
      initialValues:{
         name: "",
         price: "",
         categories: "",
         authors: "",
      },
      validationSchema: Yup.object({
         name: Yup.string()
                  .min("3", "Мінімум 3 символів")
                  .required("Обов'язкове поле"),
         price: Yup.number()
                  .required("Обов'язкове поле"),
         categories: Yup.string()
                  .required("Обов'язкове поле"),
         authors: Yup.string()
                  .required("Обов'язкове поле"),
      }),
      onSubmit: addBook
   })

   return(
      <Modal
         open={open}
         onClose={handleClose}>
         <Box sx={styleReview}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Добавити пристрій
            </Typography>
            <form 
               style={{display: "flex", flexDirection: "column"}}
               onSubmit={formik.handleSubmit}>
               <FormControl sx={{marginTop: 2}} fullWidth>
                  <InputLabel id="demo-simple-select-label">Категорія книги</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={formik.values.categories} 
                     label="Категорія книги"
                     name='categories'
                     onChange={formik.handleChange}>
                     {categories.items.map(item => {
                        return <MenuItem key={item.key} value={item.category}>{item.category}</MenuItem>
                     })}
                  </Select>
               </FormControl>
               <FormControl sx={{marginTop: 2}} fullWidth>
                  <InputLabel id="demo-simple-select-label">Автор книги</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={formik.values.authors} 
                     label="Автор книги"
                     name='authors'
                     onChange={formik.handleChange}>
                     {authors.items.map(item => {
                        return <MenuItem key={item.key} value={item.author}>{item.author}</MenuItem>
                     })}
                  </Select>
               </FormControl>
               <TextField 
                  sx={{marginTop: 2}} 
                  error={formik.errors.name && formik.touched.name}
                  label="Назва книги" 
                  name="name"
                  onChange={formik.handleChange} 
                  value={formik.values.name} 
                  onBlur={formik.handleBlur}
                  variant="outlined" 
                  helperText={formik.errors.name && formik.touched.name ? formik.errors.name : null}/>
               <FormControl sx={{marginTop: 2}} fullWidth >
                  <InputLabel htmlFor="outlined-adornment-amount">Вартість книги</InputLabel>
                  <OutlinedInput
                     error={formik.errors.price && formik.touched.price}
                     onChange={formik.handleChange} 
                     value={formik.values.price} 
                     name="price"
                     type='number'
                     onBlur={formik.handleBlur}
                     endAdornment={<InputAdornment position="start">грн</InputAdornment>}
                     label="Вартість пристрою"
                     helperText={formik.errors.price && formik.touched.price ? formik.errors.price : null} />
               </FormControl>
               <img style={{width: 100, height: 100, marginTop: 15}} src={src} alt="" />
               <Button sx={{marginTop: 2}} variant="contained" component="label">
                  Добавити фото
               <input onChange={(e) => {
                        selectFile(e)
                        douwload()
                     }} 
                  ref={file} 
                  hidden accept="image/*" 
                  multiple 
                  type="file" />
               </Button>
               <Box sx={{display: "flex", justifyContent: "space-between", marginTop: 2}}>
                  <Button onClick={() => {
                     handleClose()
                     }} color="error" sx={{width: "45%"}} variant="outlined">Закрити</Button>
                  <Button type='submit' color="success" sx={{width: "45%"}} variant="outlined">Відправити</Button>
               </Box>
            </form>
         </Box>
      </Modal>
   )
}

export default CreateBook