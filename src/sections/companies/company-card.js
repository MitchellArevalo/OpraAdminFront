import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  TextField,
  OutlinedInput,
  MenuItem,
  InputAdornment,
  CircularProgress,
  CardActionArea,
  CardMedia,
  CardContent,
  Divider,
  Unstable_Grid2 as Grid
} from '@mui/material';
import ModalUtility from 'src/components/modalUtility';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AlertMessage from 'src/components/alertMessage';

export const CompanyCard = (props) => {
  const {  producto, screenWidth , setScreenWidth, setOpen , open, categorias, recharge, setRecharge} = props;

  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = useState(""); // Estado para almacenar la imagen cargada
  const [openModal, setOpenModal] = useState(false);
  const [referenciaValue, setReferenciaValue] = useState("");
  const [cantidadValue, setCantidadValue] = useState("");
  const [descripccionValue, setDescripccionValue] = useState("");
  const [costoValue, setCostoValue] = useState("");
  const [categoriaValue, setCategoriaValue] = useState(0);
  const [idProduct, setIdProduct] = useState(0);
  const [openAlert,setOpenAlert]= useState(false);
  const [type, setType]= useState("");
  const [message, setMessage] = useState("");

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
  width: '40%',
  // backgroundColor:'red',
  opacity: '0%',
  cursor: 'pointer',
  zIndex: 1
};
const styleImageContainer = {
  // backgroundColor: 'red',
  height: '50vh',
  maxHeight: '90%',
  width: '90%',
  maxWidth: '90%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
const stylenameModal = {
  width: '100%',
  height: '15%'
};
const styleFieldsModal = {
  // backgroundColor: 'blue',
  padding: 3,
  width: '60%',
  height: '100%',
  display: 'flex',
  flexDirection:'column',
  overflow: 'auto',
  // justifyContent: 'center'
};
//////Estilos Mobile////////
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
const stylenameModalMobile = {
  width: '100%',
  height: '10%'
};
const styleFieldsModalMobile = {
  // backgroundColor: 'yellow',
  padding: 1,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection:'column',
  overflow: 'auto',
  // justifyContent: 'center'
};
  function handleClickSaveButton() {
    setLoading(true);
    setTimeout(() => {
      saveProduct()
      setLoading(false);
      setOpen(true);
      clearFields();
      setOpenAlert(true)
      setMessage('Producto guardado con éxito')
      setType('success')
    }, "3000");
    
  }
  const saveProduct = () =>{
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "name": referenciaValue,
      "idCategory": categoriaValue,
      "itemCode": referenciaValue,
      "size": "S,M,L,XL,XXL",
      "description": descripccionValue,
      "image": image
    });

    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(endpoint+"/opradesign/product"+idProduct, requestOptions)
      .then(response => response.text())
      .then(result => {
        setRecharge(!recharge)
      })
      .catch(error => console.log('error', error));
  }
  const handleDeleteClick = () =>{
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch("http://localhost:8083/opradesign/product/"+idProduct, requestOptions)
      .then(response => {
        if(response.status === 200){
          setOpenAlert(true)
          setMessage('Producto eliminado con éxito')
          setType('success')
          setRecharge(!recharge)
        }
      })
      .catch(error => console.log('error', error));
  }
  const handleAsignCategory = (event) =>{
    
    setCategoriaValue(event.target.value)
    
  }
  const handleClick = () => {
    console.log(producto);
    setImage(producto.image)
    setReferenciaValue(producto.name)
    setCantidadValue(producto.stock)
    setDescripccionValue(producto.description)
    setCostoValue(producto.salesPrice)
    setCategoriaValue(producto.category.id);
    setOpenModal(true)
    setIdProduct(producto.id);

  }
  // Función para actualizar la imagen al seleccionar un archivo
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const clearFields = () =>{
    setCostoValue("")
    setReferenciaValue("")
    setCantidadValue("")
    setDescripccionValue("")
    setOpenModal(false);
    setImage(""); 
    setCategoriaValue(0);
    setIdProduct(0);
  }

  const validationFields = (event) =>{
    // console.log(event.target.id)
    // console.log(event.target.value);
    switch (event.target.id) {
      case 'Referencia':
        setReferenciaValue(event.target.value)
        break;
      case 'Descripccion':
        setDescripccionValue(event.target.value)
      break;
      case 'Cantidad':
        setCantidadValue(event.target.value)
      break;
      case 'Costo':
        setCostoValue(event.target.value)
      break;
      
      default:
        break;
    }
  }
  
  return (
    //Esta clase retorna la card de los productos la cual es un componente que utiliza en companies que es productos
    <Card 
    sx={{ 
      Width: 300,
      height: 600
     }}>
      <AlertMessage
      open={openAlert}
      setOpen={setOpenAlert}
      type={type}
      message={message}
            />
         <ModalUtility 
                openModal={openModal}
                setOpenModal={setOpenModal}
                styleModal={props.screenWidth > 800 ? styleModal: styleModalMobile}
              >
                <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 1
                }}> 
                  <Box
                  sx={props.screenWidth > 800 ? stylenameModal: stylenameModalMobile}>
                      <Typography
                      sx={{
                        height: '100%',
                        width: '100%',
                        // backgroundColor:'gray',
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        Editar producto
                      </Typography>
                  </Box>
                  <Divider />
                  <Box
                    sx={props.screenWidth > 800 ? styleModalInformation: styleModalInformationMobile}>
                        <Box
                        sx={props.screenWidth > 800 ? styleModalImage : styleModalImageMobile}>
                         <Box
                         sx={props.screenWidth > 800 ? styleImageContainer : styleImageContainerMobile}>
                            {
                            image == ""?
                            <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: 'black',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}>
                              <CloudUploadIcon
                              sx={{
                                // backgroundColor: 'blue',
                                height: '50%',
                                width: '50%'
                              }}/>
                              <Typography
                              sx={{
                                textAlign: 'center',
                                fontWeight: 'bold'
                              }}>
                                Arrastre una imagen o presione aquí para cargarla 
                              </Typography>
                            </Box>
                            :
                            <img src={image}
                            alt="Imagen cargada"
                            style={{ 
                              width:'100%', 
                              height: '100%',
                              objectFit: 'contain', 
                              borderRadius: '10px', 
                              boxShadow: '0px 2px 8px 0px rgba(99, 99, 99, 0.2)'}}
                             />
                             }
                            
                              <input type="file"
                             accept="image/png,image/jpeg"
                              onChange={handleImageChange} 
                              style={props.screenWidth > 800 ? styleUploadFiles : styleUploadFilesMobile}          
                              />
                         </Box>
                        </Box>
                        <Box
                        sx={props.screenWidth > 800 ? styleFieldsModal: styleFieldsModalMobile}>
                         <Box sx={{ 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          justifyContent: 'space-between', 
                          marginTop: 3}}>
                            
                              <TextField
                                label="Referencia*"
                                value={referenciaValue}
                                id="Referencia"
                                onChange={validationFields}
                                sx={{ width: '49%'}}
                                InputProps={{
                                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                              />
                              <TextField
                                label="Costo"
                                value={costoValue}
                                onChange={validationFields}
                                id="Costo"
                                sx={{ width: '49%'}}
                                InputProps={{
                                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                  readOnly: true,
                                }}
                              />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 3}}>
                            
                              <TextField
                                 id="Cantidad"
                                 label="Cantidad"
                                 value={cantidadValue}
                                 onChange={validationFields}
                                 type="number"
                                 InputLabelProps={{
                                   shrink: true,
                                 }}
                                sx={{ width: '49%'}}
                                InputProps={{
                                  startAdornment: <InputAdornment position="start">#</InputAdornment>,
                                  readOnly: true,
                                }}
                              />
                              <TextField
                                id="CategoriaList"
                                select
                                label="Categoría*"
                                defaultValue={categoriaValue}
                                onChange={handleAsignCategory}
                                // helperText="Por favor selecione una categoría"
                                sx={{ width: '49%'}}  
                              >
                                {categorias.map((option) => (
                                  <MenuItem key={option.id}
                                   value={option.id}>
                                    {option.nameCategory}
                                  </MenuItem>
                                ))}
                              </TextField>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 3}}>
                            
                              <TextField
                                label="Descripcción*"
                                value={descripccionValue}
                                onChange={validationFields}
                                multiline
                                rows={5}
                                id="Descripccion"
                                sx={{width: '100%'}}
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
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    backgroundColor: '#d9d9d9'
                  }}>
                    
                    <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'right',
                      // backgroundColor: 'red',
                      height: '80%',
                      width: '50%'
                    }}>
                        <Button variant="outlined"
                          onClick={clearFields}
                        sx={{
                          margin: '0 16px',
                          backgroundColor: 'white'
                        }}> 
                        <CloseIcon/> Cancelar
                        </Button>
                    </Box>
                    <Box
                     sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'left',
                      width: '50%',
                      height: '80%',
                      // backgroundColor: 'blue',
                    }}>
                      <Box
                      sx={{
                        // backgroundColor: 'red',
                        width: '85%'
                      }}>
                        <LoadingButton
                            onClick={handleClickSaveButton}
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
                             <Button variant="Text"
                             onClick={handleDeleteClick} >
                          <DeleteIcon
                          sx={{
                            "&:hover": {
                              color: 'red'
                            }
                          }}/>
                          </Button>
                    </Box>
                  </Box>
                </Box>
                
              </ModalUtility>
      <CardActionArea onClick={handleClick}>
            
        <CardMedia
          component="img"
          height="300"
          image={producto.image}
          alt={producto.id}
          sx={{objectFit: "contain"}}
        />
        <CardContent>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div"
            sx={{
              height: '60px'
            }}>              
            {producto.name.substring(0,28)}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              height: '100px'
            }}>
            {producto.description.substring(0,120)}...
          </Typography>
          <Box
            sx={{
              width: '100%',  
              display: 'flex', 
              justifyContent: 'space-around',
            }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                }}>
                Cantidad: <br/>
                <Typography>
                {producto.stock} Und
                </Typography>
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                }}>
                Precio: <br/>
                <Typography>
                ${producto.salesPrice}
                </Typography>
              </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CompanyCard.propTypes = {
  producto: PropTypes.object.isRequired
};
