import { useEffect, useState, useRef, useContext } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Grow, Button, Popper, Container, Stack, SvgIcon, TextField, Typography, FormControl, InputAdornment, ClickAwayListener, Paper, MenuItem, Divider, MenuList } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CustomersTable from 'src/sections/customer/cutomersTable'
import CustomersSearch from 'src/sections/customer/customers-search';
import CircularProgress from '@mui/material/CircularProgress';
import ModalUtility from 'src/components/modalUtility';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AlertMessage from 'src/components/alertMessage';
import EmailIcon from '@mui/icons-material/Email';
import ExportToExcel from 'src/components/exportToExcel';
import ImportFromExcel from 'src/components/importFromExcel';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ApiContext } from 'src/contexts/Api-context';

////Estilos Desktop/////
const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70vw',
  height: '80vh',
  bgcolor: 'background.paper',
  boxShadow: 2,
  borderRadius: 1,
  overflow: 'hidden'
};
const styleModalInformation = {
  // backgroundColor: 'red',
  width: '100%',
  height: '70%',
  display: 'flex'
};
const styleModalImage = {
  // backgroundColor: 'green',
  width: '40%',
  height: '100%',
  display: 'grid',
  placeItems: 'center'
};
const styleUploadFiles = {
  position: 'absolute',
  top: '10vh',
  height: '75%',
  width: '50%',
  backgroundColor: 'gray',
  opacity: '0%',
  cursor: 'pointer',
  zIndex: 1
};
const styleImageContainer = {
  // backgroundColor: 'red',
  height: '100%',
  maxHeight: '100%',
  width: '100%',
  maxWidth: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  objectFit: 'contain'
};
const styleTitleModal = {
  width: '100%',
  height: '15%'
};
const styleFieldsModal = {
  // backgroundColor: 'blue',
  padding: 3,
  width: '60%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  justifyContent: 'center'
};
//////Estilos Mobile&////////
const styleModalMobile = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '97vw',
  height: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 2,
  borderRadius: 1,
  overflow: 'hidden'
};
const styleModalInformationMobile = {
  // backgroundColor: 'blue',
  width: '100%',
  height: '75%',
  display: 'flex',
  flexDirection: 'column'
};
const styleModalImageMobile = {
  // backgroundColor: 'green',
  width: '100%',
  height: '40%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
const styleUploadFilesMobile = {
  position: 'absolute',
  top: '10%',
  height: '30%',
  width: '100%',
  // backgroundColor:'blue',
  opacity: '0%',
  cursor: 'pointer',
  zIndex: 1
};
const styleImageContainerMobile = {
  // backgroundColor: 'red',
  mt: 1.5,
  height: '200px',
  width: '90%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
const styleTitleModalMobile = {
  width: '100%',
  height: '10%'
};
const styleFieldsModalMobile = {
  // backgroundColor: 'yellow',
  padding: 1,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  // justifyContent: 'center'
};

const Page = () => {

  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [filteredDataUsers, setFilteredDataUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalMenu, setOpenModalMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [error, setOpenError] = useState(false);
  const [typeError, setTypeError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [recharge, setRecharge] = useState(false);
  const [busquedaFallida, setBusquedaFallida] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataModalEdit, setDataModalEdit] = useState([]);
  const anchorRef = useRef(null);
  const endpoint = useContext(ApiContext);

  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    documento: "",
    username: "",
    telefono: "",
    password: "",
    errorTelefono: false,
    errorDocumento: false,
    errorNombre: false,
    errorUsername: false,
    errorPassword: false,
    errorEmail: false,
    errorAddress: false,
    launchError: true,
    profileImage: "",
    rol: "",
    address: ""
  })
  const [dataFormEdit, setDataFormEdit] = useState({
    name: "",
    email: "",
    documento: "",
    username: "",
    telefono: "",
    password: "",
    errorTelefono: false,
    errorDocumento: false,
    errorNombre: false,
    errorUsername: false,
    errorPassword: false,
    errorEmail: false,
    errorAddress: false,
    launchError: true,
    profileImage: "",
    rol: "",
    address: ""
  })
  const clearFields = () => {
    setDataForm({
      ...dataForm,
      username: "",
      name: "",
      email: "",
      documento: "",
      password: "",
      telefono: "",
      errorDocumento: false,
      errorTelefono: false,
      errorNombre: false,
      errorUsername: false,
      errorEmail: false,
      errorPassword: false,
      errorAddress: false,
      launchError: true,
      profileImage: "",
      rol: "",
      address: ""
    })
    setDataFormEdit({
      ...dataFormEdit,
      username: "",
      name: "",
      email: "",
      documento: "",
      password: "",
      telefono: "",
      errorDocumento: false,
      errorTelefono: false,
      errorNombre: false,
      errorUsername: false,
      errorEmail: false,
      errorPassword: false,
      errorAddress: false,
      launchError: true,
      profileImage: "",
      rol: "",
      address: ""
    })
    setOpenModal(false);
    setOpenModalEdit(false);
  }
  useEffect(() => {
    let statusCode = 0;
    fetch(endpoint + '/opradesign/rol')
      .then(response => {
        statusCode = response.status;
        return response.json();
      })
      .then(data => {
        if (statusCode === 200) {
          setRoles(data);
          // console.log(data);
        } else {
          setOpenError(true);
          setTypeError('error');
          setMessageError('Ocurrió un error inesperado con los roles, consulte con su administrador')
        }
      })
      .catch(error => {
        // Manejar el error
        console.error('Error:', error);
        setOpenError(true);
        setTypeError('error');
        setMessageError('Ocurrió un error al conectarse con la base de datos de los roles y generó la siguiente excepción: ' + error.nombreExcepcion + ': ' + error.mensaje);
      });
    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth);
      // console.log(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    };
  }, [])
  useEffect(() => {

    setLoadingUsers(false)
    fetch(endpoint + '/opradesign/employee')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoadingUsers(true)
        // console.log(data);
      })
      .catch(error => {
        // Manejar el error
        console.error('Error:', error);
        setOpenError(true);
        setTypeError('error');
        setMessageError('Ocurrió un error inesperado, consulte con su administrador')
      });

  }, [recharge]);
  useEffect(() => {
    dataModalEdit.forEach((item, index) => {
      setDataFormEdit({
        ...dataFormEdit,
        username: item.username,
        name: item.name,
        email: item.email,
        documento: item.document,
        password: item.password,
        telefono: item.phoneNumber,
        profileImage: item.avatar,
        rol: item.rol.nombre,
        address: item.address
      })
    });
  }, [dataModalEdit])
  
  const handleOpen = () => setOpenModal(true);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {

      let reader = new FileReader();
      reader.onload = (e) => {
        setDataForm({ ...dataForm, profileImage: reader.result })
        // console.log('e.target.result: '+e.target.result);//Base64
        // console.log('reader.result: '+reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  function validarEmail(email) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(email);
  }
  const handleClick = () => {

    if (dataForm?.launchError || dataForm?.errorDocumento || dataForm?.errorTelefono || dataForm?.errorNombre || dataForm?.errorUsername || dataForm?.errorPassword || dataForm?.errorAddress) {
      setOpenError(true);
      setTypeError('error');
      setMessageError('Complete los campos obligatorios o realice las correcciones necesarias')
      // setLaunchError(true)
      setDataForm({ ...dataForm, launchError: true })

    } else {
      setLoading(true);
      submitUserAccount();
    }
  }
  const errorFieldsValidation = (event) => {
    //Función que realiza la validación de que los campos esten llenos y el que no lo señala para modificacion y no permite darle click a guardar con el booleano launchError
    switch (event.target.id) {
      case 'name':
        if (event.target.value.length < 1) {
          setDataForm({
            ...dataForm,
            launchError: true,
            errorNombre: true
          })
        } else {
          setDataForm({ ...dataForm, launchError: true })
        }
        break;
      case 'documento':
        if (event.target.value.length < 1) {
          setDataForm({
            ...dataForm,
            launchError: true,
            errorDocumento: true
          })
        } else {
          setDataForm({ ...dataForm, launchError: true })
        }
        break;
      case 'username':
        //Hay que validar si el name de usuario existe para poder añadirse y poder cambiar la variable launchError 
        if (event.target.value.length < 1) {
          setDataForm({
            ...dataForm,
            errorUsername: true,
            launchError: true
          })

        } else {
          setDataForm({ ...dataForm, launchError: false })
        }
        break;
      case 'telefono':
        if (event.target.value.length < 1) {
          setDataForm({
            ...dataForm,
            errorTelefono: true,
            launchError: true
          })
        } else if (event.target.value.length != 10) {
          setDataForm({
            ...dataForm,
            launchError: true,
            errorTelefono: true
          })
          setOpenError(true);
          setTypeError('warning');
          setMessageError('El número del teléfono debe tener 10 carácteres')
        } else {
          setDataForm({
            ...dataForm,
            launchError: false,
            errorTelefono: false
          })
        }
        break;
      case 'password':
        if (event.target.value.length < 8) {
          setDataForm({
            ...dataForm,
            launchError: true,
            errorPassword: true
          })
          setOpenError(true);
          setTypeError('warning');
          setMessageError('La contraseña debe tener minimo 8 caracteres')
        } else {
          setDataForm({
            ...dataForm,
            launchError: false,
            errorPassword: false
          })
        }
        break;
      case 'email':

        if (event.target.value.length < 1) {
          setDataForm({
            ...dataForm,
            launchError: true,
            errorEmail: true
          })
        } else if (!validarEmail(event.target.value)) {
          setDataForm({
            ...dataForm,
            launchError: true,
            errorEmail: true
          })
          setOpenError(true);
          setTypeError('warning');
          setMessageError('El correo eléctronico no es válido')
        } else {
          setDataForm({
            ...dataForm,
            launchError: false,
            errorEmail: false
          })
        }
        break;
      case 'address':
        if (event.target.value.length < 1){
          setDataForm({
            ...dataForm,
            launchError: true,
            errorAddress: true
          })
        }
        break
      default:
        break;
    }

  }
  const validationFields = (event) => {
    // console.log('Id del campo a tocar ' + event.target.id);
    //función que guarda los valores en los estados cada vez que los campos cambian
    // console.log('objeto  valor name: ' + JSON.stringify(dataForm));
    switch (event.target.id) {
      case 'name':
        // console.log('valor name: ' + event.target.value);
        setDataForm({
          ...dataForm,
          name: event.target.value,
          errorNombre: false
        })
        break;
      case 'documento':
        // console.log('valor documento: ' + event.target.value);
        if (event.target.value.length < 11) {
          setDataForm({
            ...dataForm,
            documento: event.target.value,
            errorDocumento: false
          })
        } else {
          setOpenError(true);
          setTypeError('warning');
          setMessageError('El documento no puede tener mas de 10 carácteres')
        }

        break;
      case 'username':
        setDataForm({
          ...dataForm,
          username: event.target.value,
          errorUsername: false
        })
        break;
      case 'telefono':
        setDataForm({ ...dataForm, errorTelefono: false })
        if (event.target.value.length < 11) {
          setDataForm({ ...dataForm, telefono: event.target.value })
        } else {
          setOpenError(true);
          setTypeError('warning');
          setMessageError('El número del teléfono no puede tener mas de 10 carácteres')
        }
        break;
      case 'password':
        setDataForm({
          ...dataForm,
          password: event.target.value,
          errorPassword: false
        })
        break;
      case 'email':
        setDataForm({
          ...dataForm, email: event.target.value,
          errorEmail: false
        })
        break;
        case 'address':
          // console.log('valor name: ' + event.target.value);
          setDataForm({
            ...dataForm,
            address: event.target.value,
            errorAddress: false
          })
          break;
        default:
        break;
    }
  }
  const handleClickChangeRol = (event) => {
    setDataForm({ ...dataForm, rol: event.target.value })
  }
  const submitUserAccount = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let bodyPostUser = JSON.stringify({
      "avatar": dataForm?.profileImage,
      "username": dataForm?.username,
      "contrasena": dataForm?.password,
      "documento": dataForm?.documento,
      "name": dataForm?.name,
      "email": dataForm?.email,
      "numeroTelefonico": dataForm?.telefono,
      "direccion": dataForm?.address,
      "idRol": Number(dataForm?.rol)
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: bodyPostUser,
      redirect: 'follow'
    };

    let statusCode = 0;
    fetch(endpoint + "/opradesign/employee/", requestOptions)
      .then(response => {
        // console.log(response.status)
        statusCode = response.status;
        return response.json()
      })
      .then(result => {
        // console.log(result);
        setLoading(false);
        if (statusCode == 201) {
          setOpenModal(false)
          setOpenError(true);
          setTypeError('success');
          setMessageError('Se creó el usuario de ' + dataForm?.name + ' con éxito');
          clearFields();
          setRecharge(!recharge)
        } else {
          setOpenError(true);
          setTypeError('error');
          setMessageError('No se puede crear el usuario debido a la siguiente excepción ' + result.nombreExcepcion + ': ' + result.mensaje);
        }
      })
      .catch(error => {
        setLoading(false);
        setOpenError(true);
        setTypeError('error');
        setMessageError('Ocurrió un error: ' + error)
      });
  }
  const usersWithOutImage = data.map == null?'':data.map(user => {
    const { contrasena, avatar, rol, ...rest } = user;
    return { ...rest, rol: rol.nombre };
  });
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      setOpenModalMenu(true)
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Head>
        <title>
          Usuarios | Opra Design
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Usuarios
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <ImportFromExcel/>
                  {/* <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Importar
                  </Button> */}
                  <ExportToExcel 
                  data={usersWithOutImage}
                  mainComponent={'Usuarios'}/>
                  
                </Stack>  
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleOpen}
                >
                  Agregar
                </Button>
                <ModalUtility
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  styleModal={screenWidth > 800 ? styleModal : styleModalMobile}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 1
                    }}>
                    <Box
                      sx={screenWidth > 800 ? styleTitleModal : styleTitleModalMobile}>
                      <Typography
                        sx={{
                          height: '100%',
                          width: '100%',
                          fontWeight: 'bold',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                        Agregar un nuevo usuario
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      sx={screenWidth > 800 ? styleModalInformation : styleModalInformationMobile}>
                      <Box
                        sx={screenWidth > 800 ? styleModalImage : styleModalImageMobile}>
                        <Box
                          sx={screenWidth > 800 ? styleImageContainer : styleImageContainerMobile}>
                          {
                            dataForm?.profileImage == "" ?
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}>
                                <CloudUploadIcon
                                  sx={{
                                    height: '50%',
                                    width: '50%'
                                  }} />
                                <Typography
                                  sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                  }}>
                                  Arrastre una imagen o presione aquí para cargarla
                                </Typography>
                              </Box>
                              :
                              <Box
                                sx={{
                                  height: '90%',
                                  borderRadius: '10px'
                                }}>
                                <img src={dataForm?.profileImage}
                                  alt="Imagen cargada"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    borderRadius: '10px',
                                    boxShadow: '0px 2px 8px 0px rgba(99, 99, 99, 0.2)'
                                  }}
                                />
                              </Box>
                          }

                          <input type="file"
                            accept="image/png,image/jpeg"
                            onChange={handleImageChange}
                            style={screenWidth > 800 ? styleUploadFiles : styleUploadFilesMobile}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={screenWidth > 800 ? styleFieldsModal : styleFieldsModalMobile}>
                        <Box sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                          marginTop: 3
                        }}>


                          <TextField
                            label="Nombre*"
                            value={dataForm?.name}
                            error={dataForm?.errorNombre}
                            helperText={dataForm?.errorNombre ? "Campo obligatorio" : ''}
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            id="name"
                            sx={{ width: '49%' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                          />
                          <TextField
                            label="username*"
                            value={dataForm?.username}
                            error={dataForm?.errorUsername}
                            helperText={dataForm?.errorUsername ? "Campo obligatorio" : ''}
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            id="username"
                            sx={{ width: '49%' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">@</InputAdornment>,
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>

                          <TextField
                            id="documento"
                            label="Documento*"
                            error={dataForm?.errorDocumento}
                            value={dataForm?.documento}
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            helperText={dataForm?.errorDocumento ? "Campo obligatorio" : ''}
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            sx={{ width: '49%' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">CC</InputAdornment>,
                              inputMode: 'numeric',
                              pattern: '[0-9]*'
                            }}
                          />
                          <TextField
                            id="password"
                            label="Contraseña*"
                            error={dataForm?.errorPassword}
                            helperText={dataForm?.errorPassword ? "Campo obligatorio" : ''}
                            value={dataForm?.password}
                            type="password"
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            sx={{ width: '49%' }}
                          />
                            

                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 3 }}>

                          <TextField
                            id="telefono"
                            error={dataForm?.errorTelefono}
                            label="Teléfono*"
                            value={dataForm?.telefono}
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            type="number"
                            helperText={dataForm?.errorTelefono ? "Campo obligatorio" : ''}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            sx={{ width: '49%' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">#</InputAdornment>,
                              inputMode: 'numeric',
                              pattern: '[0-9]*'
                            }}
                          />
                          <FormControl variant="filled"
                            sx={{ width: '49%' }}>
                            <InputLabel id="rolInput">Rol</InputLabel>
                            <Select
                              labelId="rolInput"
                              id="rol"
                              value={dataForm?.rol}
                              onChange={handleClickChangeRol}
                            >
                              {roles.length < 1 ?
                                ''
                                :
                                roles.map((option) => (
                                  <MenuItem key={option.idRol}
                                    id={option.idRol}
                                    value={option.idRol}>
                                    {option.nombre}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 3 }}>

                          <TextField
                            id="email"
                            error={dataForm?.errorEmail}
                            label="Correo electrónico*"
                            value={dataForm?.email}
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            type="email"
                            helperText={dataForm?.errorEmail ? "Campo obligatorio" : ''}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            sx={{ width: '100%' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 3 }}>

                          <TextField
                            id="address"
                            error={dataForm?.errorAddress}
                            label="Dirección*"
                            value={dataForm?.address}
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            type="email"
                            helperText={dataForm?.errorAddress ? "Campo obligatorio" : ''}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            sx={{ width: '100%' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment>,
                            }}
                          />
                        </Box>

                      </Box>

                    </Box>
                    <Divider orientation="vertical"
                      variant="middle"
                      flexItem />
                    <Box
                      sx={{
                        height: '15%',
                        width: '100%',
                        display: 'flex',
                        backgroundColor: '#d9d9d9'
                      }}>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'right',
                          height: '80%',
                          width: '50%'
                        }}>
                        <Button variant="outlined"
                          onClick={clearFields}
                          sx={{
                            margin: '0 16px',
                            backgroundColor: 'white'
                          }}>
                          <CloseIcon /> Cancelar
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'left',
                          width: '50%',
                          height: '80%'
                        }}>
                        <LoadingButton
                          onClick={handleClick}
                          loading={loading}
                          loadingPosition="start"
                          startIcon={<SaveIcon />}
                          variant="contained"

                          sx={{
                            margin: '0 16px',
                          }}
                        >
                          <span>Guardar</span>
                        </LoadingButton>
                      </Box>
                    </Box>
                  </Box>

                </ModalUtility>
              </div>
            </Stack>
            <CustomersSearch
              data={data}
              setFilteredDataUsers={setFilteredDataUsers}
              setBusquedaFallida={setBusquedaFallida}
            />
            <AlertMessage
              open={error}
              setOpen={setOpenError}
              type={typeError}
              message={messageError}
            />
            <ModalUtility
                  openModal={openModalEdit}
                  setOpenModal={setOpenModalEdit}
                  styleModal={screenWidth > 800 ? styleModal : styleModalMobile}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 1
                    }}>
                    <Box
                      sx={screenWidth > 800 ? styleTitleModal : styleTitleModalMobile}>
                      <Typography
                        sx={{
                          height: '100%',
                          width: '100%',
                          fontWeight: 'bold',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                        Editar usuario
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      sx={screenWidth > 800 ? styleModalInformation : styleModalInformationMobile}>
                      <Box
                        sx={screenWidth > 800 ? styleModalImage : styleModalImageMobile}>
                        <Box
                          sx={screenWidth > 800 ? styleImageContainer : styleImageContainerMobile}>
                          {
                            dataForm?.profileImage == "" ?
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}>
                                <CloudUploadIcon
                                  sx={{
                                    height: '50%',
                                    width: '50%'
                                  }} />
                                <Typography
                                  sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                  }}>
                                  Arrastre una imagen o presione aquí para cargarla
                                </Typography>
                              </Box>
                              :
                              <Box
                                sx={{
                                  height: '90%',
                                  borderRadius: '10px'
                                }}>
                                <img src={dataForm?.profileImage}
                                  alt="Imagen cargada"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    borderRadius: '10px',
                                    boxShadow: '0px 2px 8px 0px rgba(99, 99, 99, 0.2)'
                                  }}
                                />
                              </Box>
                          }

                          <input type="file"
                            accept="image/png,image/jpeg"
                            onChange={handleImageChange}
                            style={screenWidth > 800 ? styleUploadFiles : styleUploadFilesMobile}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={screenWidth > 800 ? styleFieldsModal : styleFieldsModalMobile}>
                        <Box sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                          marginTop: 3
                        }}>


                          <TextField
                            label="Nombre*"
                            value={dataFormEdit?.name}
                            error={dataFormEdit?.errorNombre}
                            helperText={dataFormEdit?.errorNombre ? "Campo obligatorio" : ''}
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            id="name"
                            sx={{ width: '49%' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                          />
                          <TextField
                            label="username*"
                            value={dataFormEdit?.username}
                            error={dataFormEdit?.errorUsername}
                            helperText={dataFormEdit?.errorUsername ? "Campo obligatorio" : ''}
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            id="username"
                            sx={{ width: '49%' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">@</InputAdornment>,
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>

                          <TextField
                            id="documento"
                            label="Documento*"
                            error={dataFormEdit?.errorDocumento}
                            value={dataFormEdit?.documento}
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            helperText={dataFormEdit?.errorDocumento ? "Campo obligatorio" : ''}
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            sx={{ width: '49%' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">CC</InputAdornment>,
                              inputMode: 'numeric',
                              pattern: '[0-9]*'
                            }}
                          />
                          <TextField
                            id="password"
                            label="Contraseña*"
                            error={dataFormEdit?.errorPassword}
                            helperText={dataFormEdit?.errorPassword ? "Campo obligatorio" : ''}
                            value={dataFormEdit?.password}
                            type="password"
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            sx={{ width: '49%' }}
                          />
                            

                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 3 }}>

                          <TextField
                            id="telefono"
                            error={dataFormEdit?.errorTelefono}
                            label="Teléfono*"
                            value={dataFormEdit?.telefono}
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            type="number"
                            helperText={dataFormEdit?.errorTelefono ? "Campo obligatorio" : ''}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            sx={{ width: '49%' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">#</InputAdornment>,
                              inputMode: 'numeric',
                              pattern: '[0-9]*'
                            }}
                          />
                          <FormControl variant="filled"
                            sx={{ width: '49%' }}>
                            <InputLabel id="rolInput">Rol</InputLabel>
                            <Select
                              labelId="rolInput"
                              id="rol"
                              value={dataFormEdit?.rol}
                              onChange={handleClickChangeRol}
                            >
                              {roles.length < 1 ?
                                ''
                                :
                                roles.map((option) => (
                                  <MenuItem key={option.idRol}
                                    id={option.idRol}
                                    value={option.idRol}>
                                    {option.nombre}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 3 }}>

                          <TextField
                            id="email"
                            error={dataFormEdit?.errorEmail}
                            label="Correo electrónico*"
                            value={dataFormEdit?.email}
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            type="email"
                            helperText={dataFormEdit?.errorEmail ? "Campo obligatorio" : ''}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            sx={{ width: '100%' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 3 }}>

                          <TextField
                            id="address"
                            error={dataFormEdit?.errorAddress}
                            label="Dirección*"
                            value={dataFormEdit?.address}
                            onChange={validationFields}
                            onBlur={errorFieldsValidation}
                            type="email"
                            helperText={dataFormEdit?.errorAddress ? "Campo obligatorio" : ''}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            sx={{ width: '100%' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment>,
                            }}
                          />
                        </Box>

                      </Box>

                    </Box>
                    <Divider orientation="vertical"
                      variant="middle"
                      flexItem />
                    <Box
                      sx={{
                        height: '15%',
                        width: '100%',
                        display: 'flex',
                        backgroundColor: '#d9d9d9'
                      }}>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'right',
                          height: '80%',
                          width: '50%'
                        }}>
                        <Button variant="outlined"
                          onClick={clearFields}
                          sx={{
                            margin: '0 16px',
                            backgroundColor: 'white'
                          }}>
                          <CloseIcon /> Cancelar
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'left',
                          width: '50%',
                          height: '80%'
                        }}>
                        <LoadingButton
                          onClick={handleClick}
                          loading={loading}
                          loadingPosition="start"
                          startIcon={<SaveIcon />}
                          variant="contained"

                          sx={{
                            margin: '0 16px',
                          }}
                        >
                          <span>Guardar</span>
                        </LoadingButton>
                      </Box>
                    </Box>
                  </Box>

                </ModalUtility>
            {loadingUsers ?
              <CustomersTable
                data={filteredDataUsers.length > 0 ? filteredDataUsers : data}
                busquedaFallida={busquedaFallida}
                setRecharge = {setRecharge}
                recharge = {recharge}
                setLoading = {setLoading}
                setOpenError = {setOpenError}
                setTypeError = {setTypeError}
                setMessageError = {setMessageError}
                setDataModalEdit={setDataModalEdit}
                setOpenModalEdit={setOpenModalEdit}
              /> :
              <Box
                sx={{
                  width: '100%',
                  height: '35vh',
                  display: 'grid',
                  placeItems: 'center'
                }}>
                <CircularProgress />
              </Box>
            }
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
