import { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";

import {styleReview} from '../../helpers/style';
import { db } from '../../fireBase';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const CreateAuthor = ({open, handleClose}) => {
   const [value, setValue] = useState("")

   const addCategory = async () => {
      const docRef = await addDoc(collection(db, "autor"), {
         author: value,
      });
      setValue("")
      handleClose()
   }

   return(
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         >
            <Box sx={styleReview}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Додати автора
               </Typography>
               <TextField 
                  sx={{marginTop: 2}} 
                  id="outlined-basic" 
                  label="Автор" 
                  name="name"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  variant="outlined" />
               <Button 
                  disabled={!value} 
                  onClick={() => addCategory()}
                  color="success" 
                  sx={{width: "45%", marginTop: 2}} 
                  variant="outlined">
                     Відправити
               </Button>
            </Box>
      </Modal>
   )
}

export default CreateAuthor