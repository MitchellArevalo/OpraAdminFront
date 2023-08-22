import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';


export const AccountProfileDetails = (props) => {

  const { user } = props

  const initialValues = {
    username: user == null?'':user.username,
    documento: user == null?'':user.documento,
    nombre: user == null?'':user.nombre,
    email: user == null?'':user.email,
    numeroTelefonico: user == null?'':user.numeroTelefonico,
  }

  const [values, setValues] = useState({
    username: initialValues.username,
    documento: initialValues.documento,
    nombre: initialValues.nombre,
    email: initialValues.email,
    numeroTelefonico: initialValues.numeroTelefonico,
  });

  function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
  
    return null;
  }

  const handleChange = useCallback((event) => {
   
        setValues((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value
        }));
  }, []);

  const saveChanges = (event) => {
    console.log(values);
  }

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  const testFieldCss = {
    width: '48%',
    margin: '1% 1%'
  }

  return (
      <Card>
        <CardHeader
          subheader="Esta información puede ser editada"
          title="Perfil"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ 
            display: 'flex',
            flexWrap: 'wrap'
           }}>
              <TextField
                fullWidth
                label="Nombre completo*"
                name="nombre"
                onChange={handleChange}
                required
                value={values?.nombre}
                sx={testFieldCss}
              />

              <TextField
                fullWidth
                label="Documento*"
                name="documento"
                onChange={handleChange}
                required
                value={values?.documento}
                sx={testFieldCss}
              />
            
              <TextField
                fullWidth
                label="Nombre de usuario*"
                name="username"
                onChange={handleChange}
                required
                value={values?.username}
                sx={testFieldCss}
              />
            
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="email"
                onChange={handleChange}
                required
                value={values?.email}
                sx={testFieldCss}
              />
            
              <TextField
                fullWidth
                label="Número teléfonico"
                name="numeroTelefonico"
                onChange={handleChange}
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                value={values?.numeroTelefonico}
                sx={testFieldCss}
              />
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button 
          onClick={saveChanges}
          variant="contained">
            Guardar
          </Button>
        </CardActions>
      </Card>
  );
};
