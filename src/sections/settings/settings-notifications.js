import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  Box,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';

export const SettingsNotifications = (props) => {

  const { notification, user } = props;
  const [checked, setChecked] = useState(notification);

  const handleChange = (event) => {
    console.log(user)
    setChecked(event.target.checked);
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Configura por que medios vas a recibir notificaciones de ventas"
          title="Notificaciones"
        />
        <Divider />
        <Box
        sx={{
          width: '100%',
          padding: '2%',
        }}>
        <Typography variant="h6">
          Medio
        </Typography>
        <Typography variant="subtitle1">
          <Checkbox
            checked={checked}
            onChange={handleChange}
          />
          Correo electrónico
        </Typography>
        </Box>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Guardar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
