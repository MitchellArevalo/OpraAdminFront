import { useEffect, useState, useContext  } from 'react';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from 'src/hooks/use-auth';
import { Box, Divider, ListItemIcon, List, Popover, Typography, ListItem, ListItemText  } from '@mui/material';
import { indigo, error } from "src/theme/colors";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import LensIcon from '@mui/icons-material/Lens';
import { width } from '@mui/system';
import { ApiContext } from 'src/contexts/Api-context';

export const NotificationsPopover = (props) => {
  const { anchorEl, onClose, open, id } = props;
  const router = useRouter();
  const auth = useAuth();
  const endpoint = useContext(ApiContext);

  const [data, setData] = useState([]);
  const [dataAfterRead, setDataAfterRead] = useState([]);
  const [readedNotification, setreadedNotification] = useState([]);
  
  function setDataNumberEmpty(){
    props.setNotificationQuantity(0);
  }
  const handleClose = () => {
    onClose?.();
  };
  // function filterInf(){
  //   console.log('datos filtrados');
  //   setreadedNotification(data.length > 0 ? data.filter(objeto => objeto.readed === false): []);
  //   props.setNotificationQuantity(readedNotification.length);
  // } 

  function handleReadedClick(idNotification){
    console.log(idNotification);
    console.log(readedNotification);
    props.setNotificationQuantity(data.length);
     const newArrayA = data.slice();
     const index = newArrayA.find((item) => item.id === idNotification);
     if (index !== -1) {
       newArrayA.splice(index, 1);
     }
     const newArrayB = [...readedNotification, index];
     setData(newArrayA);
     setreadedNotification(newArrayB);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "idEmployee": auth.user.idEmployee,
      "subject": index.subject,
      "message": index.message,
      "readed": true
    });
    // console.log('este es el Raw: ' + raw);

    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    putMethod(requestOptions, idNotification);

  }
  const putMethod = async (requestOptions, idNotification) => {
    fetch(endpoint + "/opradesign/notification/"+ idNotification, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //       fetch(endpoint + '/opradesign/notification/employee/' + auth.user.idEmployee)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       setData(data);
  //       console.log(data.length);
  //       console.log(data);
  //       props.setNotificationQuantity(data.length);
  //       // setLoadingUsers(true)
  //       // console.log(data);
  //     })
  //     .catch(error => {
  //       // Manejar el error
  //       console.error('Error:', error);
  //       // setOpenError(true);
  //       // setTypeError('error');
  //       // setMessageError('Ocurrió un error inesperado, consulte con su administrador')
  //     });
  //   }, 15000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  /////////////////////////////////CONEXIÓN COMENTADA PARA QUE NO CONSUMA RECURSOS DE LA BASE DE DATOS Y DEL SERVICIO////////////////
  useEffect(() => {

    // setLoadingUsers(false)
    fetch(endpoint + '/opradesign/notification/employee/' + auth.user === null?'':auth.user.idEmployee)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let datosFiltrados = data.filter(objeto => objeto.readed === false);
        setData(datosFiltrados);
        setreadedNotification(data.filter(objeto => objeto.readed === true));
        props.setNotificationQuantity(datosFiltrados.length > 0 ? datosFiltrados.length: datosFiltrados.length);
        // console.log(data.length);
        // console.log(data);
        // filterInf();   
        // setLoadingUsers(true)
        // console.log(data);
      })
      .catch(error => {
        // Manejar el error
        console.error('Error:', error);
        // setOpenError(true);
        // setTypeError('error');
        // setMessageError('Ocurrió un error inesperado, consulte con su administrador')
      });

      
  }, [readedNotification]);
  //readedNotification es la variable para poner para que se actualicen las notificaciones en tiempo real

  async function readAll(){
    // alert('limpiar todo');
    setDataNumberEmpty();
    setreadedNotification(data.concat());
    setDataAfterRead(data);
    setData([]);
    for (const not of dataAfterRead) {

      const newArrayA = dataAfterRead.slice();
      const index = newArrayA.find((item) => item.id === not.id);

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "idEmployee": auth.user.idEmployee,
        "subject": index.subject,
        "message": index.message,
        "readed": true
      });
      console.log('este es el Raw desde el masivo: ' + raw);

      let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      await putMethod(requestOptions, not.id);
    }
  }

  const enviarJSON = async (objeto) => {
    try {
      const response = await fetch('tu_endpoint', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
      });
  
      if (response.ok) {
        console.log('JSON enviado exitosamente:', objeto);
      } else {
        console.error('Error al enviar JSON:', objeto);
      }
    } catch (error) {
      console.error('Error al enviar JSON:', objeto, error);
    }
  };

  return (
   
        <Popover 
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
       
        >
            <Box
            sx={{
                // backgroundColor: 'red',
                width: '35vw',
                padding: '4%',
                // maxHeight: '40vh'
            }}>
                <Box
                sx={{
                    // backgroundColor: 'green',
                    width: '100%',
                    top: '5.9%',
                    height: '6vh',
                    // position: 'fixed',
                    backgroundColor: 'white',
                    // zIndex: '2',
                    display: 'flex',
                    justifyContent: 'Left',
                    alignItems: 'center',
                    // position: 'absolute'
                }}>
                    <Typography 
                    variant="h6"
                    sx={{
                        margin: '0 3%'
                    }}
                    >
                        Notificaciones
                    </Typography>
                </Box>
                <Divider 
                onClick={readAll}
                textAlign="right"
                sx={{
                    fontSize: '12px',
                    cursor: 'pointer',
                    '&:hover': {
                      color: indigo.main
                    }
                    // marginTop: '6vh'
                }}
                >
                    Marcar todos como leidos
                </Divider>
                <List sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                    position: 'relative',
                    maxHeight: '40vh'
                }} 
                component="nav"
                 aria-label="mailbox folders">
                {data.length >0 || readedNotification.length > 0? 
                  <>
                  {data.map((notification, index) => (
                    <>
                     <ListItem 
                        key={index}
                        onClick={() => handleReadedClick(notification.id)} 
                        button
                        sx={{
                          backgroundColor: '#f5f5f5',
                          borderRadius: '10px',
                          margin: '2px 0'
                        }}>
                            <ListItemText primary={notification.subject} 
                            secondary={notification.message} 
                            />
                            <ListItemIcon
                            sx={{
                              // backgroundColor: 'red',
                              height: '100%',
                              display: 'flex',
                              justifyContent:'center',
                              alignItems: 'center'
                            }}>
                              <LensIcon 
                              sx={{
                                color: indigo.main,
                                width: '20px'
                              }}/>
                            </ListItemIcon>
                        </ListItem>
                        <Divider />
                    </>
                ))}
                {
                  readedNotification.map((notification, index) => (
                    <>
                      <ListItem 
                        key={index}
                        onClick={() => handleReadedClick(notification.id)} 
                        button
                        sx={{
                          // backgroundColor: '#f5f5f5',
                          borderRadius: '10px',
                          margin: '2px 0'
                        }}>
                            <ListItemText primary={notification.subject} 
                            secondary={notification.message} 
                            />
                        </ListItem>
                        <Divider />
                    </>
                ))}
                  </>
                :
                <Box
                sx={{
                  height:'20vh',
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Box
                  sx={{
                    width: '100%',
                    height: '10vh',
                    // backgroundColor: 'red',
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <FindInPageIcon
                    sx={{
                      width: '100%',
                      height: '100%'
                    }}/>
                  </Box>
                  <Box
                  sx={{
                    textAlign: 'center'
                  }}>
                    <Typography
                    variant='h6'>
                      Al parecer no tienes notificaciones
                    </Typography>
                  </Box>
                </Box>
                }
                </List>
               
            </Box>
        </Popover>

  );
};

NotificationsPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
