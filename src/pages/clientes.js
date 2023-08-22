import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Box, Button, Container, Stack, SvgIcon, TextField, Typography, FormControl, InputAdornment, MenuItem, Divider } from '@mui/material';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ClientsTable from 'src/sections/ClientAccount/clientsTable';
import CircularProgress from '@mui/material/CircularProgress';
import ClientsSearch from 'src/sections/ClientAccount/clients-search';
import ExportToExcel from 'src/components/exportToExcel';

const Page = () => {
  const [data, setData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [filteredDataUsers, setFilteredDataUsers] = useState([]);
  const [busquedaFallida, setBusquedaFallida] = useState(false);
  const [recharge, setRecharge] = useState(false);


  const clientsMocked = [
    {
      nombre: "Cliente mockeado",
      email: "mockedClient@mail.com",
      documento: "3214568979",
      direccion: "carrera 1 # 1-1",
      numeroTelefonico: "3115266544",
      username: "pruebaPostman@opra.com",
      contrasena: "opracliente"
    },
    {
      nombre: "Cliente mockeado",
      email: "mockedClient@mail.com",
      documento: "3214568979",
      direccion: "carrera 1 # 1-1",
      numeroTelefonico: "3115266544",
      username: "pruebaPostman@opra.com",
      contrasena: "opracliente"
    },
    {
      nombre: "Cliente mockeado",
      email: "mockedClient@mail.com",
      documento: "3214568979",
      direccion: "carrera 1 # 1-1",
      numeroTelefonico: "3115266544",
      username: "pruebaPostman@opra.com",
      contrasena: "opracliente"
    }
  ]

  const clientsWithoutPasswords = clientsMocked.map(client => {
    const { contrasena, ...rest } = client; // Destructura el objeto y excluye 'contrasena'
    return rest; // Retorna el objeto sin 'contrasena'
  });
  useEffect(() => {

    setLoadingUsers(false)
    //SE ECUENTRA COMENTADO PORQUE AUNNO EXISTE EL ENDPOINT PARA REALIZAR EL GET DIRECTAMENTE A LA BASE DE DATOS
    
    // fetch('https://backendopra.onrender.com/opradesign/persona')
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     setData(data);
    //     setLoadingUsers(true)
    //     // console.log(data);
    //   })
    //   .catch(error => {
    //     // Manejar el error
    //     console.error('Error:', error);
    //     setOpenError(true);
    //     setTypeError('error');
    //     setMessageError('Ocurrió un error inesperado, consulte con su administrador')
    //   });
    setTimeout(() => {
      setData(clientsWithoutPasswords);
      setLoadingUsers(true);
    }, 3000);

  }, [recharge]);
  return (

    <>
      <Head>
        <title>
          Clientes | Opra Design
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
                  Clientes
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
                  data={data}
                  mainComponent={'Clientes'}/>
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
            {/* Parte interna del componente */}
            <Box
              sx={{
                // backgroundColor: 'red',
                width: '100%',
                height: '100%'
              }}
            >
              <ClientsSearch
              data={data}
              setFilteredDataUsers={setFilteredDataUsers}
              setBusquedaFallida={setBusquedaFallida}
              />
              {loadingUsers ?
                <ClientsTable
                  data={filteredDataUsers.length > 0 ? filteredDataUsers : data}
                  busquedaFallida={busquedaFallida}
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
            </Box>
            {/* Parte interna del componente */}
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
