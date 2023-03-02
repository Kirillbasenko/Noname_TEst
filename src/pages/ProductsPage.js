import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

import { getBooks, setBooks } from "../store/slices/productSlice";
import BookList from "../components/BookList"
import CategoriesBar from "../components/Bars/CategoriesBar";
import AuthorBar from "../components/Bars/AuthorBar";
import FilterBar from "../components/Bars/FilterBar";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const Shop = () => {
   const dispatch = useDispatch(); 
   const { books, selectedAuthor, selectedCategory, filterBooks } = useSelector(state => state.product)

   useEffect(() => {
      dispatch(getBooks())
   }, [])

   useEffect(() => {
      dispatch(setBooks({selectedAuthor, selectedCategory}))
   }, [selectedAuthor, selectedCategory])

   if(books.status === "loading"){
      return (
         <Box sx={{ display: 'flex', justifyContent: "center", marginTop: 50 }}>
            <CircularProgress />
         </Box>
      );
   }

   return(
      <Container >
         <Grid  container spacing={2}>
            <Grid item>
               <CategoriesBar/>
               <FilterBar/>
            </Grid>
            <Grid item xs>
               <AuthorBar/>
               <BookList books={filterBooks.length ? filterBooks : books.items}/>
            </Grid>
         </Grid>
      </Container>
   )
}

export default Shop