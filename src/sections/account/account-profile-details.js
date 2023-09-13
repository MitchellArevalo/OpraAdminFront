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
    document: user == null?'':user.document,
    name: user == null?'':user.name,
    email: user == null?'':user.email,
    phoneNumber: user == null?'':user.phoneNumber,
  }

  const [values, setValues] = useState({
    username: initialValues.username,
    document: initialValues.document,
    name: initialValues.name,
    email: initialValues.email,
    phoneNumber: initialValues.phoneNumber,
  });

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
                label="Nombre completo"
                name="name"
                onChange={handleChange}
                required
                value={values?.name}
                sx={testFieldCss}
              />

              <TextField
                fullWidth
                label="Documento*"
                name="document"
                onChange={handleChange}
                required
                value={values?.document}
                sx={testFieldCss}
              />
            
              <TextField
                fullWidth
                label="Username"
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
                name="phoneNumber"
                onChange={handleChange}
                required
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                value={values?.phoneNumber}
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
