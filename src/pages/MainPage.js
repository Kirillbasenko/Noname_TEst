import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import book from "../assets/book.jpg"

import { SHOP_ROUTE } from '../utils/consts';

import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const MainPage = () => {
   const navigate = useNavigate()
   
   return(
      <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
         <Box sx={{position: "relative"}}>
            <CardMedia
               alt="green iguana"
               component="img"
               width={"100%"}
               height={"100%"}
               src={book}
            />
            <Box sx={{position: "absolute", top: "30%", left: "13%", textAlign: "center"}}>
               <Typography sx={{marginBottom: 2}} variant='h4'>Ласкаво прошу до онлайн магазину книг ADA</Typography>
               <Typography sx={{marginBottom: 2}} variant='h5'>Тут вы зможете знайти книгу на любий смак</Typography>
               <Button onClick={() => navigate(`${SHOP_ROUTE}`)} variant="outlined">Перейти до перегляду</Button>
            </Box>
         </Box>
      </Container>
   )
}

export default MainPage