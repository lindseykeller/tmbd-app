import React, {useState} from "react";
import Modal from '@mui/material/Modal/index';
import ModalContent from './ModalContent';

const AppModal = ({children, id}) => {
    const [isTrapOpen, setIsTrapOpen] = useState(false);

    const handleOpen = () => {
        setIsTrapOpen(true);
      };
    
      const handleClose = () => {
        setIsTrapOpen(false);
      };
 
    return (
        <>
      
        <div className="youtube-video-trailer">
 
        <div onClick = {handleOpen}> {children}</div>
        {isTrapOpen && 
        <Modal
        open = {handleOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
            tabIndex="0"
        >
           
      <ModalContent id={id} onClose={handleClose}/>
        
        </Modal>} </div> 
        </>

    )

  
    
}
 
    
export default AppModal;

