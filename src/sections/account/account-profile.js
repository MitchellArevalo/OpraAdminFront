import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';


export const AccountProfile = (props) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          // flexDirection: 'column'
        }}
      >
        <Box
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          height: 200
        }}>
          <Avatar
            src={props.user == null?'':props.user.avatar}
            sx={{
              height: 200,
              m:5,
              width: 200
            }}
          />
        </Box>
        <Box
        sx={{
          width: '50%'
        }}>
        <Typography
          gutterBottom
          variant="h5"
        >
          {props.user == null?'':props.user.nombre}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {props.user == null?'':props.user.email}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {props.user == null?'':props.user.rol.nombre}
        </Typography>
        </Box>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Subir Foto
      </Button>
    </CardActions>
  </Card>
);
