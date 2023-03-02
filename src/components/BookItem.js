import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

import { PRODUCT_ROUTE } from "../utils/consts";

import { setBasket } from "../store/slices/basketSlice";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { setOneBook } from "../store/slices/productSlice";

const BookItem = ({book, recommendations}) => {
   const navigate = useNavigate()
   const dispatch = useDispatch(); 

   const { basket } = useSelector(state => state.basket)

   const navigatePage = () => navigate(`${PRODUCT_ROUTE}/${book.key}`)

   let arr = basket.filter(item => item.key === book.key)


   return (
      <Card sx={{ width: recommendations ? 150 : 223, margin: 1 }}>
         <CardActionArea>
         <CardMedia
            onClick={() => {
               dispatch(setOneBook(book))
               navigatePage()
            } }
            height={recommendations ? 150 : 220}
            width={recommendations ? 150 : 223}
            sx={{objectFit: "contain"}}
            component="img"
            src={book.img}
            alt={book.name}
         />
         <CardContent style={{display: "flex", justifyContent: "space-between", cursor: "default", alignItems: "end"}}>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: recommendations ? 80 : 120}}>
               <Typography onClick={() => navigatePage()} style={{ cursor: "pointer", fontSize: recommendations ? 14 : 20, fontWeight: 500 }} gutterBottom  component="div">
                  {book.name.length < 28 ? book.name : `${book.name.slice(0, 28)}...`}
               </Typography>
               <Typography variant="body2">
                  Автор: {book.authors}
               </Typography>
               <Typography variant="body2">
                  {book.price} грн
               </Typography>
            </Box>
            {!recommendations && localStorage.getItem("role") ? 
            <Box sx={{display: "flex", flexDirection: "column"}}>
               <IconButton onClick={() => dispatch(setBasket(book))}>
                  {arr.length === 0 ? <AddShoppingCartIcon color="primary"/> : <RemoveShoppingCartIcon color="error"/>}
               </IconButton>
            </Box> : null }
         </CardContent>
         </CardActionArea>
      </Card>
   )
}

export default BookItem