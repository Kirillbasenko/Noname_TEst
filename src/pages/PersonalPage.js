import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';

import CreateCategory from '../components/modal/CreateCategory';
import CreateAuthor from '../components/modal/CreateAuthor';
import CreateBook from '../components/modal/CreateBook';
import { getAuthors, getCategories } from '../store/slices/productSlice';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const PersonalPage = () => {
   const dispatch = useDispatch(); 
   const [openCategory, setOpenCategory] = useState(false)
   const [openAutor, setOpenAutor] = useState(false)
   const [openType, setOpenType] = useState(false)

   useEffect(() => {
      dispatch(getCategories())
      dispatch(getAuthors())
   }, [])

   return(
      <Container>
         <Typography variant='h5' sx={{textAlign: "center", marginBottom: 3}}>Ваш персональний кабінет</Typography>
         <Typography sx={{ marginBottom: 3 }}>На данний момент на сайті 10 книжок</Typography>
         <Box sx={{display: "flex", flexDirection: "column", maxWidth: "250px"}}>
            <Button onClick={() => setOpenCategory(true)} sx={{marginBottom: 2}} variant="outlined">Додати нову категорию</Button>
            <Button onClick={() => setOpenAutor(true)} sx={{marginBottom: 2}} variant="outlined">Додати нового автора</Button>
            <Button onClick={() => setOpenType(true)} variant="outlined">Додати нову книгу</Button>
         </Box>
         <CreateCategory open={openCategory} handleClose={() => setOpenCategory(false)}/>
         <CreateAuthor open={openAutor} handleClose={() => setOpenAutor(false)}/>
         <CreateBook open={openType} handleClose={() => setOpenType(false)}/>
      </Container>
   )
}

export default PersonalPage