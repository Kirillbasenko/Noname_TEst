import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react';

import { deleteDevice } from '../../store/slices/basketSlice';
import { removeBasket } from "../../store/slices/basketSlice";
import SuccessModal from './SuccessModal';
import close from "../../assets/close.png"

import { Modal, Image } from 'react-bootstrap';
import Button from '@mui/material/Button';

const BasketModal = ({show, onHide}) => {
   const dispatch = useDispatch(); 

   const [successVisible, setSuccessVisible] = useState(false)

   const { basket } = useSelector(state => state.basket)

   let summ = basket.reduce((summ, current) => {
      return summ + Number(current.price * 1)
   }, 0)

   const success = () => {
      setSuccessVisible(true)
      onHide()
      localStorage.removeItem("basket")
      dispatch(removeBasket())
   }

   return(
      <div>
         <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">
                  Кошик
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {basket.length !== 0 ? basket.map(book => {
                  return(
                     <div 
                        key={book.key} 
                        style={{borderBlockEnd: "1px solid grey", padding: 10}} 
                        className="d-flex flex-column mb-3">
                        <div className="d-flex justify-content-between">
                           <div className="d-flex">
                              <Image 
                                 className='me-3' 
                                 width={85} 
                                 height={85} 
                                 src={book.img}/>
                              <div className="">{book.name}</div>
                           </div>
                           <Image 
                              style={{marginTop: "30px"}} 
                              width={20} 
                              height={20} 
                              onClick={() => dispatch(deleteDevice(book.key))}
                              src={close}
                              />
                        </div>
                        <div  className="d-flex justify-content-start align-items-center">
                           <div 
                              style={{display: "flex", flex: "1 0 auto", justifyContent: "flex-end", textAlign: "end"}}>
                                 {book.price * 1} грн
                           </div>
                        </div>
                     </div>
                  )}) : "Кошик пустий"}
               </Modal.Body>
            <Modal.Footer style={{display: "flex", flexDirection: "column", alignItems: "end"}}>
                  <div >Сумма: {summ} грн</div>
                  <Button 
                     disabled={!basket.length} 
                     onClick={() => success()} 
                     color='success' 
                     style={{marginTop: 5}} variant="outlined">
                        Оформити замовлення
                  </Button>
            </Modal.Footer>
         </Modal>
         <SuccessModal show={successVisible} summ={summ} onHide={() => setSuccessVisible(false)}/>
      </div>
   )
}

export default BasketModal