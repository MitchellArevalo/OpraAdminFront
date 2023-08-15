import React, { Children } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ModalUtility (props) {

    const {openModal, setOpenModal, styleModal, children} = props;

    const handleClose = () => setOpenModal(false);

  return (
    <Modal
    keepMounted
    open={openModal}
    onClose={handleClose}
    aria-labelledby="keep-mounted-modal-title"
    aria-describedby="keep-mounted-modal-description"
    >
        <Box sx={styleModal}>
            {children}
        </Box>
    </Modal>
  )
}

export default ModalUtility;