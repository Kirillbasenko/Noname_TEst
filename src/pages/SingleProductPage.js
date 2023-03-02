import { useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"

import { setBasket } from "../store/slices/basketSlice"
import { setOneBook } from "../store/slices/productSlice";

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Card } from '@mui/material';

const SingleProductPage = () => {
   const dispatch = useDispatch(); 

   const { book } = useSelector(state => state.product)
   const { basket } = useSelector(state => state.basket)

   useEffect(() => {
      dispatch(setOneBook(book))
   }, [])

   const checkBasket = basket.filter(item => item.key === book.key)

   return(
      <Box>
         <Container style={{marginTop: 15}}>
            <Typography variant="h4" component="div">{book.name}</Typography>
            <Rating 
               precision={0.5} 
               value={4} 
               name="read-only" 
               readOnly 
               style={{marginTop: 5}}/>
               <Grid sx={{marginTop: 2}} container spacing={2}>
               <Grid item xs>
                  <CardMedia component="img" sx={{ height: 400, width: 350, objectFit: "contain" }} src={book.img}/>
                  <CardContent sx={{ display: 'flex', marginBottom: 2, flexWrap: "wrap", padding: 0 }}>
                     
                  </CardContent>
                  
               </Grid>
               <Grid item xs>
                  <Card sx={{ maxWidth: 480, padding: 1, marginTop: 3 }}>
                     <CardContent>
                        <Typography variant="h5" sx={{ color: "red", marginBottom: 2 }}>{book.price} грн</Typography>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Автор: {book.authors}</Typography>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Жанр: {book.categories}</Typography>
                        <Button 
                           onClick={() => dispatch(setBasket(book))}
                           color={!checkBasket.length ? "success" : "error"} 
                           sx={{fontSize: 12, marginRight: 3}} 
                           disabled={!localStorage.getItem("role")}
                           variant="contained">
                           {!checkBasket.length ? "Добавить в корзину" : "Удалить из корзины"}
                        </Button>
                     </CardContent>
                  </Card>
               </Grid>
            </Grid>
         </Container>
      </Box>
   )
}

export default SingleProductPage