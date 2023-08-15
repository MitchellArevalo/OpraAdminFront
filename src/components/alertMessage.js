import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function alertMessage(props) {
  const {open, setOpen, type, message} = props;

  let vertical= 'top'
  let horizontal= 'center'

  /*
  //TIPOS DE ALERTAS PARA LAS DIFERENTES ACCIONES 
  error
  warning
  info
  success
  */


  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Stack spacing={2}
     sx={{ width: '100%' }}>
      <Snackbar open={open} 
      autoHideDuration={4000}
      sx={{
        marginTop: '5vh'
      }}
      anchorOrigin={{vertical, horizontal}}
      onClose={handleClose}>
        <Alert onClose={handleClose} 
        severity={type} 
        sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      
    </Stack>
  );
}