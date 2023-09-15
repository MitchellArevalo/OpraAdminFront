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
  Divider } from '@mui/material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ExportToExcel from 'src/components/exportToExcel';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { ApiContext } from 'src/contexts/Api-context';
import SalidasTable from 'src/sections/entradasSalidas/salidasTable'
import EntradasTable from 'src/sections/entradasSalidas/entradasTable'
import EntradasSearch from 'src/sections/entradasSalidas/entradasSearch';

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
  const [dataEntries, setDataEntries]= useState([]);
  const [busquedaFallida, setBusquedaFallida]= useState(false);
  const [filteredDataEntries, setFilteredDataEntries] = useState([]);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

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
    }
  }, [value])
  

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
        <Stack spacing={3}>
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
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Importar
                </Button>
                <ExportToExcel 
                // data={data}
                // mainComponent={'Clientes'}
                // allow ={data.length > 0?true:false}
                />
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
              >
                Agregar
              </Button>
            </div>
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
                      <EntradasSearch
                      dataEntries={dataEntries} 
                      setFilteredDataUsers={setFilteredDataEntries} 
                      setBusquedaFallida={setBusquedaFallida}/>
                      <EntradasTable
                      data={dataEntries}
                      busquedaFallida={busquedaFallida}/>
                    </TabPanel>
                    <TabPanel 
                    value={value} 
                    index={1} 
                    dir={theme.direction}>
                      Item Two
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
