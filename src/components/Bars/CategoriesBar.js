import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";

import { setSelectedCategory, getCategories, setSelectedAuthor } from "../../store/slices/productSlice";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CategoriesBar = () => {
   const dispatch = useDispatch(); 

   const { categories, selectedCategory } = useSelector(state => state.product)

   useEffect(() => {
      dispatch(getCategories())
      dispatch(setSelectedAuthor(null))
   }, [])

      return(
         <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Вибрати жанр</InputLabel>
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={selectedCategory}
               label="Вибрати жанр"
               onChange={(e) => {
                  dispatch(setSelectedCategory(e.target.value))
               } }
            >
               <MenuItem value={null}>Всі</MenuItem>
            {categories.items.map(item => {
                  return <MenuItem key={item.key} value={item.category}>{item.category}</MenuItem>
               })}
            </Select>
            </FormControl>
         </Box>
      )
}

export default CategoriesBar