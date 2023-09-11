import { useState, useEffect} from 'react';
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  FormControl,
  InputAdornment,
  MenuItem,
  Divider,
} from "@mui/material";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ExportToExcel from "src/components/exportToExcel";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import RolesTable from "src/sections/Roles/rolesTable";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ModulePermission from 'src/components/ModulePermission';

const Page = () => {
    const [rolSelected, setRolSelected] = useState('');
    const [ridRolSelected, setIdRolSelected] = useState('');
    // const [modulosRol, setModulosRol] = useState();
    const [spreadRoles, setSpreadRoles] = useState(
       {
          nombre: rolSelected,
          Modulo: {
            view: false,
            create: false,
            edit: false,
            del: false
        }
      }
      );
      
    //   const nuevoSpreadRoles = {
    //     ...spreadRoles,
    //     Modulo: {
    //       ...spreadRoles.Modulo,
    //       view: true,
    //       create: true,
    //       edit: true,
    //       del: true
    //     }
    //   };
      
    //   setSpreadRoles(nuevoSpreadRoles);
    const modulosRol = [
            {
                idModulo: 1,
                modulo: {
                    idModulo: 1,
                    name: "Usuarios",
                    edit: true,
                    view: true,
                    create: true,
                    delete: true
                },
                rol: {
                    idRol: 1,
                    nombre: "Administrador"
                }
            },
            {
                idModulo: 2,
                modulo: {
                    idModulo: 2,
                    name: "Roles",
                    edit: true,
                    view: true,
                    create: true,
                    delete: true
                },
                rol: {
                    idRol: 1,
                    nombre: "Administrador"
                }
            },
            {
                idModulo: 3,
                modulo: {
                    idModulo: 3,
                    name: "Inventario",
                    edit: true,
                    view: true,
                    create: true,
                    delete: true
                },
                rol: {
                    idRol: 1,
                    nombre: "Administrador"
                }
            },
            {
                idModulo: 4,
                modulo: {
                    idModulo: 4,
                    name: "Clientes",
                    edit: true,
                    view: true,
                    create: true,
                    delete: true
                },
                rol: {
                    idRol: 1,
                    nombre: "Administrador"
                }
            },
            {
                idModulo: 5,
                modulo: {
                    idModulo: 5,
                    name: "Ventas",
                    edit: true,
                    view: true,
                    create: true,
                    delete: true
                },
                rol: {
                    idRol: 1,
                    nombre: "Administrador"
                }
            },
            {
                idModulo: 6,
                modulo: {
                    idModulo: 6,
                    name: "Entradas/Salidas",
                    edit: true,
                    view: true,
                    create: true,
                    delete: true
                },
                rol: {
                    idRol: 1,
                    nombre: "Administrador"
                }
            },
            {
                idModulo: 7,
                modulo: {
                    idModulo: 7,
                    name: "Dashboard",
                    edit: true,
                    view: true,
                    create: true,
                    delete: true
                },
                rol: {
                    idRol: 1,
                    nombre: "Administrador"
                }
            }
    ]
    const data = [
      {
        id: 1,
        nombre:"Administrador",
      },
      {
        id: 2,
        nombre:"Gerente",
      },
      {
        id: 3,
        nombre:"Vendedor",
      }
    ]
    
  return (
    <>
      <Head>
        <title>Roles | Opra Design</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack 
             direction="row"
             justifyContent="space-between" 
             spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Roles</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
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
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Agregar
                </Button>
              </div>
            </Stack>
            <Box
            sx={{
                // backgroundColor: 'blue',
                display: 'flex',
                justifyContent: 'space-around',
                width: '100% ',
                height: '60vh',
            }}
            >
                 <Box
                 sx={{
                    // backgroundColor: 'red',
                    width: '30%',
                    height: '100%'
                 }}>
                  <RolesTable
                  setRolSelected = {setRolSelected}
                  data = {data}
                   />
                </Box>
                <Divider 
                orientation="vertical"
                flexItem />
                <Box
                sx={{
                    // backgroundColor: 'green',
                    height:'55vh',
                    maxHeight: '55vh',
                    overflow: 'auto',
                    width: '70%',
                    padding: ' 0% 10%'
                }}>
                  <Typography variant="h5"
                  sx={{
                    margin: '10px'
                  }}>
                    {rolSelected}
                </Typography>
                <Typography
                sx={{
                  // margin: '10px'
                }}>
                  {rolSelected === ''? '':'Por favor seleccione los permisos que va a tener el rol'}
                </Typography>
                {rolSelected === ''? '':
                <>
                 <FormGroup
                sx={{
                  // // display: 'flex',
                  // backgroundColor: 'gray',
                  // // flexDirection: 'row',
                  // margin: '3% 0 0 0'
                }}>
                  {/* {modulosRol.map((item, index) => (
                    <div key={index}> */}
                      <ModulePermission item={modulosRol} />
                    {/* </div>
                    
                  ))} */}
                </FormGroup>
                </>
                }                
                </Box>
            </Box>
            <Box
              sx={{
                // backgroundColor: 'red',
                width: "100%",
                height: "100%",
              }}
            ></Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
