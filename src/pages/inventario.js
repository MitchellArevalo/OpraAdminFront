import React, { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
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
  Divider,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import ModalUtility from 'src/components/modalUtility';
import AlertMessage from 'src/components/alertMessage';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ExportToExcel from 'src/components/exportToExcel';
import ImportFromExcel from 'src/components/importFromExcel';
import { ApiContext } from 'src/contexts/Api-context';
import { display, height } from '@mui/system';
import { success } from 'src/theme/colors';

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
  // backgroundColor:'red',
  opacity: '0%',
  cursor: 'pointer',
  zIndex: 1
};
const styleImageContainer = {
  // backgroundColor: 'red',
  height: '90%',
  maxHeight: '90%',
  width: '90%',
  maxWidth: '90%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
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
  flexDirection:'column',
  overflow: 'auto',
  // justifyContent: 'center'
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
  flexDirection:'column',
  overflow: 'auto',
  // justifyContent: 'center'
};
  
  const Page = () => {
    
    const endpoint = useContext(ApiContext);
    const [productos, setProductos] = useState([]);
    const [data, setData] = useState([]);
    const [searching, setSearching] = useState(false);
    const [productSearch, setProductSearch] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [image, setImage] = useState(""); // Estado para almacenar la imagen cargada
    const [referenciaValue, setReferenciaValue] = useState("");
    const [cantidadValue, setCantidadValue] = useState("");
    const [descripccionValue, setDescripccionValue] = useState("");
    const [costoValue, setCostoValue] = useState("");
    const [categoriaValue, setCategoriaValue] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);//Estado para el tamaño de la pantalla
    const [open, setOpen] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [change, setChange] = useState(false);
    const [recharge, setRecharge]= useState(true)
  
    const fieldsToPost = [
      {
        fieldName: "name"
      }, 
      {
        fieldName: "idCategory"
      }, 
      {
        fieldName: "itemCode"
      }, 
      {
        fieldName: "size"
      }, 
      {
        fieldName: "description"
      }, 
      {
        fieldName: "image"
      }
      // "name": referenciaValue,
      // "idCategory": categoriaValue,
      // "itemCode": referenciaValue,
      // "size": "S,M,L,XL,XXL",
      // "description": descripccionValue,
      // "image": image
    ]
    
    
    useEffect(() => {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(endpoint + "/opradesign/category/", requestOptions)
        .then(response => response.json())
        .then(result => {
          setCategorias(result);
        })
        .catch(error => console.log('error', error));

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(endpoint + "/opradesign/product/", requestOptions)
        .then(response => response.json())
        .then(data => {
          setData(data);
          setProductos(data)
          setLoadingProducts(true);
        })
        .catch(error => {
          console.log('Este fue el error al conectarse a la API', error);
        });
    }, [recharge])

    useEffect(() => {
      const handleWindowResize = () => {
        setScreenWidth(window.innerWidth);
        console.log(window.innerWidth);
      };
  
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize)
      };
    }, [screenWidth])
    
    
    useEffect(() => {
      // console.log('ProductSearchValue:' + productSearch)
      // console.log('length del search:' + productSearch.length);
      // console.log(searching)
      // console.log(productSearch)
      if (!searching) {
        // console.log('Entró al set de los productos')
        setProductos(data)
      }else{
        // console.log('Entró al set del filtro')
        const filteredData = productos.filter((obj) => obj.name.toLowerCase().includes(productSearch.toLowerCase()));
        
        setProductos(filteredData)
      }
   

    
  }, [productSearch, change]);

  const handleOpen = () => setOpenModal(true);
  function handleClick() {
    setLoading(true);
    setTimeout(() => {
      postProduct()
      setSearching(!searching);
      setLoading(false);
      setOpenModal(false);
      setOpen(true)
    }, "3000");
  }

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
  const handleAsignCategory = (event) =>{
    
    setCategoriaValue(event.target.value)
    
  }
  const postProduct = () =>{
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
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(endpoint+"/opradesign/product", requestOptions)
      .then(response => response.text())
      .then(result => {
        setRecharge(!recharge)
      })
      .catch(error => console.log('error', error));
  }
  return(
  <>
    <Head>
      <title>
        Inventario | Opra Design
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
                Inventario
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <ImportFromExcel
                  fieldsToPost={fieldsToPost}
                  sObject={"/opradesign/product"}
                  objectMessage={'Empleados'}
                  />
                <ExportToExcel 
                  data={productos}
                  mainComponent={'Inventario'}/>
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
                Nuevo producto
              </Button>
              <ModalUtility 
                openModal={openModal}
                setOpenModal={setOpenModal}
                styleModal={screenWidth > 800 ? styleModal: styleModalMobile}
              >
                <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 1
                }}> 
                  <Box
                  sx={screenWidth > 800 ? styleTitleModal: styleTitleModalMobile}>
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
                        Agregar un nuevo producto
                      </Typography>
                  </Box>
                  <Divider />
                  <Box
                    sx={screenWidth > 800 ? styleModalInformation: styleModalInformationMobile}>
                        <Box
                        sx={screenWidth > 800 ? styleModalImage : styleModalImageMobile}>
                         <Box
                         sx={screenWidth > 800 ? styleImageContainer : styleImageContainerMobile}>
                            {
                            image == ""?
                            <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              // backgroundColor: 'red',
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
                              style={screenWidth > 800 ? styleUploadFiles : styleUploadFilesMobile}          
                              />
                         </Box>
                        </Box>
                        <Box
                        sx={screenWidth > 800 ? styleFieldsModal: styleFieldsModalMobile}>
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
                                helperText="El costo se autocalcula de las entradas"
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
                                 helperText="La cantidad se autocalcula de las entradas"
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
                                defaultValue="Masculino"
                                // helperText="Por favor selecione una categoría"
                                onChange={handleAsignCategory}
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
          <AlertMessage
            open = {open}
            setOpen = {setOpen}
            type = {'success'}
            message={'Producto guardado con éxito'}
            />
          <CompaniesSearch 
          productos={productos}
          setProductSearch={setProductSearch}
          setSearching={setSearching}
          searching={searching}
          setChange={setChange}
          change={change}
          />
          <Grid
            container
            spacing={3}
          >
            {loadingProducts == false?
            <Box
            sx={{
              width: '100%',
              // backgroundColor: 'red',
              height: '30vh',
              display: 'grid',
              placeItems: 'center'
            }}>
                <CircularProgress 
                />
            </Box>
            :
            productos.length == 0?
                  <Box
                    sx={{
                      width: '100%',
                      height: '40vh',
                      // backgroundColor: 'red'
                    }}>
                  <Box
                    sx={{
                      mb: 2,
                      textAlign: 'center'
                    }}>
                      <img
                        alt="Under development"
                        src="/assets/errors/error-404.png"
                        style={{
                          display: 'inline-block',
                          maxWidth: '100%',
                          width: 200
                        }}
                    />
                  </Box>
                    <Typography
                      align="center"
                      sx={{ mb: 3 }}
                      variant="h5"
                    >
                     Lo sentimos, no se han encontrado productos
                    </Typography>
                </Box>
            :
            productos.map((producto) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={producto.id}
              >
                <CompanyCard 
                producto={producto}
                screenWidth={screenWidth} 
                setScreenWidth={setScreenWidth}
                setOpen = {setOpen}
                open = {open}
                categorias={categorias}
                recharge={recharge}
                setRecharge= {setRecharge}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
