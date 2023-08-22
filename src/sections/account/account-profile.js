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
          alignItems: 'top',
          justifyContent: 'center',
          display: 'flex',
          height: '40vh',
          // backgroundColor: 'blue'
          // flexDirection: 'column'
        }}
      >
        <Box
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          margin: '2px',
          height: 200,
          // backgroundColor: 'red'
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
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
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
