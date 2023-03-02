import { useSelector, useDispatch } from "react-redux"

import { setSort } from '../../store/slices/productSlice';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FilterBar = () => {
   const dispatch = useDispatch(); 

   const {sort} = useSelector(state => state.product)

   return(
      <FormControl variant="standard" sx={{ m: 1, minWidth: 180}}>
         <InputLabel id="demo-simple-select-standard-label">Сортування</InputLabel>
         <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={sort}
            sx={{ fontSize: 12 }}
            onChange={(e) => dispatch(setSort(e.target.value))}
            label="Сортування"
         >
            <MenuItem value="less">Від меншої ціни до більшої</MenuItem>
            <MenuItem value="more">Від більшої ціни до меншої</MenuItem>
            <MenuItem value="popularity">За популярністю</MenuItem>
         </Select>
      </FormControl>
   )
}

export default FilterBar