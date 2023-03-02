import { Modal } from 'react-bootstrap';

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

const SuccessModal = ({show, onHide}) => {
   return(
      <Modal
         show={show}
         onHide={onHide}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered>
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Успішно
               <DoneOutlineIcon color="success" style={{marginLeft: 10}}/>
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            Замовлення успішно оформлене
         </Modal.Body>
      </Modal>
   )
}

export default SuccessModal