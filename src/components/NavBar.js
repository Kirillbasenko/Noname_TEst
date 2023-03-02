import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {signOut, getAuth} from "firebase/auth";

import { MAIN_ROUTE, LOGIN_ROUTE, PERSONAL_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { removeUser } from "../store/slices/userSlice";
import BasketModal from "./modal/BasketModal";

import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Badge from '@mui/material/Badge';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';

const NavBar = () => {
   const dispatch = useDispatch(); 
   const navigate = useNavigate()
   const location = useLocation()

   const [basketVisible, setBasketVisible] = useState(false)
   const [successVisible, setSuccessVisible] = useState(false)
   
   const { basket } = useSelector(state => state.basket)
   const { isAuth } = useSelector(state => state.user)

   const logOut = () => {
      signOut(getAuth());
      dispatch(removeUser())
      localStorage.removeItem("isAuth")
   }
   

   return (
      <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
         <AppBar sx={{backgroundColor: "#e9e9e9"}} color='transparent' position="static">
         <Toolbar style={{display: "flex", justifyContent: "space-between" }}>
            <Link 
               style={{ textDecoration: "none", fontSize: 23}} 
               component="div" 
               to={MAIN_ROUTE}>
                  ADA
            </Link>
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
               {location.pathname !== "/products" ? 
               <Button 
                  onClick={() => navigate(`${SHOP_ROUTE}`)} 
                  size="small" 
                  variant="outlined">
                     Перейти до магазину
               </Button> : null}
               <IconButton 
                  color='secondary'
                  sx={{ marginRight: 1 }}
                  onClick={() => setBasketVisible(true)} >
                  <Badge badgeContent={basket.length} color="success">
                     <ShoppingBasketIcon/>
                  </Badge>
               </IconButton>
               {!localStorage.getItem("isAuth") ?
               <IconButton 
                  color='primary'
                  onClick={() => navigate(`${LOGIN_ROUTE}`)}>
                  <PersonIcon/>
               </IconButton> 
               : 
               <>
                  <IconButton 
                     color='primary'
                     onClick={() => navigate(`${PERSONAL_ROUTE}`)}>
                     <AdminPanelSettingsIcon/>
                  </IconButton>
                  <IconButton 
                     sx={{ color: "red"}}
                     onClick={() => logOut()}>
                     <LoginIcon/>
                  </IconButton> 
               </>}
            </Box>
         </Toolbar>
         </AppBar>
         <BasketModal 
            howSuccess={successVisible} 
            onHideSuccess={() => setSuccessVisible(false)} 
            show={basketVisible} 
            onHide={() => setBasketVisible(false)}/>
      </Box>
   );
}

export default NavBar