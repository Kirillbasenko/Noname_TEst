import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";

import { getAuthors, setSelectedAuthor } from "../../store/slices/productSlice";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const AuthorBar = () => {
   const dispatch = useDispatch(); 

   const {authors, selectedAuthor, selectedCategory} = useSelector(state => state.product)

   useEffect(() => {
      dispatch(getAuthors())
   }, [])

   let selected = []

   switch (selectedCategory) {
      case "Жахи":
         selected = []
         selected.push(authors.items[0])
         selected.push(authors.items[3])
         break;
      case "Пригоди":
         selected = []
         selected.push(authors.items[4])
         break;
      case "Фантастика":
         selected = []
         selected.push(authors.items[0])
         selected.push(authors.items[1])
         selected.push(authors.items[2])
         break;
      default:
         selected = authors.items
         break;
   }

   return(
      <ButtonGroup 
         sx={{display: "flex", flexWrap: "wrap"}} 
         variant="text" 
         aria-label="outlined primary button group">
         <Button 
            color={selectedAuthor === null ? "success" : 'primary'}
            onClick={() => {
               dispatch(setSelectedAuthor(null))
            }}>
            Все
         </Button>
         {selected.map(author => {
            return(
               <div key={author.key}>
                  <Button 
                     color={selectedAuthor === author.author ? "success" : 'primary'}
                     onClick={() => {
                        dispatch(setSelectedAuthor(author.author))
                     }}>
                     {author.author}
                  </Button>
               </div>
               )
         })}
      </ButtonGroup>
   )
}

export default AuthorBar