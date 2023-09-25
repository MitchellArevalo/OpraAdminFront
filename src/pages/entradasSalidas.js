import Head from 'next/head';
import React, { useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { 
  Box, 
  Button, 
  Container, 
  Stack, 
  SvgIcon, 
  TextField, 
  Typography, 
  Card, 
  InputAdornment, 
  OutlinedInput,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Divider } from '@mui/material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ExportToExcel from 'src/components/exportToExcel';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { ApiContext } from 'src/contexts/Api-context';
import SalidasTable from 'src/sections/entradasSalidas/salidasTable'
import EntradasTable from 'src/sections/entradasSalidas/entradasTable'
import EntradasSearch from 'src/sections/entradasSalidas/entradasSearch';
import ModalUtility from 'src/components/modalUtility';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from 'src/hooks/use-auth';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50w',
  height: '60vh',
  bgcolor: 'background.paper',
  boxShadow: 2,
  borderRadius: 1,
  overflow: 'hidden'
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Page = () => {
  
  const endpoint = useContext(ApiContext);
  const auth = useAuth();
  const [dataEntries, setDataEntries]= useState([]);
  const [dataExits, setDataExits]= useState([]);
  const [busquedaFallida, setBusquedaFallida]= useState(false);
  const [filteredDataEntries, setFilteredDataEntries] = useState([]);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = React.useState('');
  const [spreadFields, setSpreadFields] = useState({
    Producto: '',
    Cantidad:'',
    Costo:'',
    Descripccion: '',
    Entrada: false,
    Salida: false
  });

  const handleChangeType = (event) => {
    if(event.target.value === 1){
      setSpreadFields((prevState)=>{return {...prevState,Entrada: true}})
      setSpreadFields((prevState)=>{return {...prevState,Salida: false}})
    }else{
      setSpreadFields((prevState)=>{return {...prevState,Salida: true}})
      setSpreadFields((prevState)=>{return {...prevState,Entrada: false}})
    }
    setType(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeFields = (event) =>{
    setSpreadFields((prevState)=>{return {...prevState,[event.target.id]: event.target.value}})
  }
  

  useEffect(() => {
    
    if (value === 0) {
      //Es entrada
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(endpoint + "/opradesign/inputs/", requestOptions)
        .then(response => response.json())
        .then(result => {
          setDataEntries(result);
        })
        .catch(error => console.log('error', error));
    }else{
      //Es salida
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(endpoint+ "/opradesign/outputs/", requestOptions)
        .then(response => response.json())
        .then(dataExits => {
          console.log(dataExits);
          setDataExits(dataExits);
        })
        .catch(error => console.log('error', error));
    }
  }, [value])

  useEffect(() => {
   console.log(spreadFields)
  }, [spreadFields])
  
  const handleClickSave = () =>{
    if (spreadFields?.Entrada) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "idEmployee": auth.user.idEmployee,
        "idProduct":parseInt(spreadFields?.Producto) ,
        "costProduct": spreadFields?.Costo,
        "quantityProduct":spreadFields?.Cantidad ,
        "description": spreadFields?.Descripccion
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(endpoint+"/opradesign/inputs/", requestOptions)
        .then(response => response.text())
        .then(result => {setOpenModal(false)})
        .catch(error => console.log('error', error));
    }else{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "idEmployee": auth.user.idEmployee,
        "idProduct": parseInt(spreadFields?.Producto) ,
        "quantityProduct":spreadFields?.Cantidad ,
        "description": spreadFields?.Descripccion
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(endpoint+"/opradesign/outputs", requestOptions)
        .then(response => response.text())
        .then(result => {
          setOpenModal(false)
        })
        .catch(error => console.log('error', error));
          }
  }

  const clearFields = () =>{
    setOpenModal(false);
  }
  
  const handleClickModal = () =>{
    console.log(dataExits)
    setOpenModal(true);
  }

  return (

    <>
    <Head>
      <title>
        Entradas / Salidas | Opra Design
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        height:'80vh'
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={7}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Entradas / salidas
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
              </Stack>
            </Stack>
            <div>
              <Button
              onClick={handleClickModal}
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Agregar
              </Button>
            </div>
              <ModalUtility
              openModal={openModal} 
              setOpenModal ={setOpenModal}
              styleModal={styleModal}
              >
                <Box
                sx={{
                  width:'100%',
                  height:'100%',
                  display: 'flex',
                  flexDirection:'column'
                }}>
                  <Box
                  sx={{
                    // backgroundColor: 'red',
                    height:'10%',
                    display: 'grid',
                    placeItems: 'center'
                  }}>
                    <Typography
                    variant='h5'>
                      Agregar entrada / salida
                    </Typography>
                  </Box>
                  <Divider/>
                  <Box
                  sx={{
                    height:'70%',
                    p: '6%',
                    display:'flex',
                    flexWrap:'wrap'
                    // backgroundColor: 'blue'
                  }}>
                    <Box
                    sx={{
                      // backgroundColor: 'green',
                      width: '100%',
                      display: 'flex',
                      justifyContent:"space-around",
                    }}>
                      <TextField
                        id="Producto"
                        label="Producto"
                        type='text'
                        onChange={handleChangeFields}
                        sx={{
                          width:'25%',
                          margin: '0 3%'
                        }}
                        // value={}
                        // onChange={}
                      />
                      <TextField
                        id="Cantidad"
                        label="Cantidad"
                        type='number'
                        
                          onChange={handleChangeFields}
                        sx={{
                          width:'25%',
                          margin: '0 3%'
                        }}
                        // value={}
                        // onChange={}
                      />
                      <TextField
                        id="Costo"
                        label="Costo"
                        type='number'
                        
                          onChange={handleChangeFields}
                        sx={{
                          width:'25%',
                          margin: '0 3%'
                        }}
                        // value={}
                        // onChange={}
                        />
                    </Box>
                      <Box
                      sx={{
                        // backgroundColor: 'red',
                        width: '100%',
                        display: 'flex',
                        justifyContent:"space-around",
                      }}>
                        <Select
                          value={type}
                          onChange={handleChangeType}
                          displayEmpty
                          sx={{
                            height: '35%'
                          }}
                          defaultValue='Tipo de transacción'
                          inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem
                            value=""
                            >Seleccione un tipo de movimiento</MenuItem>
                          <MenuItem value={1}>Entrada</MenuItem>
                          <MenuItem value={2}>Salida</MenuItem>
                        </Select>
                        <TextField
                          id="Descripccion"
                          label="Descripcción"
                          multiline
                          
                          onChange={handleChangeFields}
                          rows={5}
                          sx={{
                            width: '55%'
                          }}
                          // value={}
                          // onChange={}
                        />
                      </Box>
                  </Box>
                  <Box
                  sx={{
                    height:'20%',
                    width:'100%',
                    // backgroundColor: 'green',
                    display: 'flex'
                  }}>
                    <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'right',
                      // backgroundColor: 'red',
                      height: '100%',
                      width: '47%'
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
                      width: '47%',
                      height: '100%',
                      // backgroundColor: 'blue',
                    }}>
                        <LoadingButton
                            onClick={handleClickSave}
                            // loading={loading}
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
          </Stack>

          <Box
            sx={{
              // backgroundColor: 'red',
              width: '100%',
              height: '70vh',
              display:'flex'
            }}>
               <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                  <AppBar position="static">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="secondary"
                      textColor="white"
                      variant="fullWidth"
                      aria-label="full width tabs"
                    >
                      <Tab label="Entradas" {...a11yProps(0)} />
                      <Tab label="Salidas" {...a11yProps(1)} />
                    </Tabs>
                  </AppBar>
                    <TabPanel 
                    value={value} 
                    index={0} 
                    dir={theme.direction}>
                    <Typography variant="h5" 
                    color="initial">Entradas</Typography>
                      <EntradasSearch
                      dataEntries={dataEntries} 
                      setFilteredDataEntries={setFilteredDataEntries} 
                      setBusquedaFallida={setBusquedaFallida}/>
                      <EntradasTable
                      data={filteredDataEntries.length>0?filteredDataEntries:dataEntries}
                      busquedaFallida={busquedaFallida}/>
                    </TabPanel>
                    <TabPanel 
                    value={value} 
                    index={1} 
                    dir={theme.direction}>
                      <Typography variant="h5" 
                      color="initial">Salidas</Typography>
                       <EntradasSearch
                      dataEntries={dataEntries} 
                      setFilteredDataEntries={setFilteredDataEntries} 
                      setBusquedaFallida={setBusquedaFallida}/>
                      <SalidasTable
                      data={dataExits}
                      busquedaFallida={busquedaFallida}/>
                    </TabPanel>
                </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
