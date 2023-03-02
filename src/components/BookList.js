import BookItem from "./BookItem";

import Box from '@mui/material/Box';

const DeviceList = (books) => {
   return(
      <Box component="div"
         sx={{ display: 'flex', mx: '2px', flexWrap: "wrap" }}>
         {books && books.books.map((book, index) => 
            <BookItem key={book.key} book={book}/>
         )}
      </Box>
   )
}

export default DeviceList