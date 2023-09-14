import { useState, useEffect, useContext} from 'react';
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  TextField ,
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
import { ApiContext } from 'src/contexts/Api-context';
import ModalUtility from 'src/components/modalUtility';


const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "40vh",
  padding: "1%",
  bgcolor: "background.paper",
  boxShadow: 2,
  borderRadius: 1,
  overflow: "hidden",
};

const Page = () => {
    const [rolSelected, setRolSelected] = useState('');
    const [idRolSelected, setIdRolSelected] = useState(0);
    const [ loader, setLoader ] = useState(true);
    const [ data, setData ] = useState([]);
    const [ idModules, setIdModules ] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const endpoint = useContext(ApiContext);
    const [name, setName] = useState('Cat in the Hat');
    const [checked, setChecked] = useState(
      {
          idModule: idRolSelected,
          moduleName: rolSelected,

          UsuariosCreate: false,
          UsuariosEdit: false,
          UsuariosView: false,
          UsuariosDelete: false,

          RolesCreate: false,
          RolesEdit: false,
          RolesView: false,
          RolesDelete: false,

          InventarioCreate: false,
          InventarioEdit: false,
          InventarioView: false,
          InventarioDelete: false,
          
          ClientesCreate: false,
          ClientesEdit: false,
          ClientesView: false,
          ClientesDelete: false,
      
          VentasCreate: false,
          VentasEdit: false,
          VentasView: false,
          VentasDelete: false,
      
          Entradas_SalidasCreate: false,
          Entradas_SalidasEdit: false,
          Entradas_SalidasView: false,
          Entradas_SalidasDelete: false,
      
          DashboardCreate: false,
          DashboardEdit: false,
          DashboardView: false,
          DashboardDelete: false,
      }
  );
    
  useEffect(() => {
    let statusCode = 0;
    console.log(idRolSelected);
    console.log(endpoint + '/opradesign/modulosrol/rol/' + idRolSelected);
    fetch( endpoint + '/opradesign/modulosrol/rol/' + idRolSelected)
      .then(response => {
        statusCode = response.status;
        return response.json();
      })
      .then(data => {
        if (statusCode === 200) {
          data.forEach(module => {
            console.log(module);
            let campo = module.name;
            setChecked((prevState) => ({
              ...prevState,
              [campo + 'Create'] : module.create,
              [campo + 'Edit']: module.edit,
              [campo + 'View']: module.view,
              [campo + 'Delete']: module.delete,
            }));               
          });
          const modulesfilter = data.map(objeto => {
            return {
              idModulo: objeto.idModulo,
              name: objeto.name
            };
          });
          
          setIdModules(modulesfilter);
          console.log(data);
          console.log('ID DE LOS MODULOS');
          console.log(idModules);
          setLoader(false);
          
        } else {
          setOpenError(true);
          setTypeError('error');
          setMessageError('Ocurrió un error inesperado con los roles, consulte con su administrador')
        }
      })
      .catch(error => {
        // Manejar el error
        console.error('Error:', error);
        // setOpenError(true);
        // setTypeError('error');
        // setMessageError('Ocurrió un error al conectarse con la base de datos de los roles y generó la siguiente excepción: ' + error.nombreExcepcion + ': ' + error.mensaje);
      });      
  }, [idRolSelected])
  //idRolSelected

  useEffect(() => {
    let statusCode = 0;
    fetch(endpoint + '/opradesign/rol')
      .then(response => {
        statusCode = response.status;
        return response.json();
      })
      .then(data => {
        if (statusCode === 200) {
          setData(data);
          // console.log(data);
        } else {
          // setOpenError(true);
          // setTypeError('error');
          // setMessageError('Ocurrió un error inesperado con los roles, consulte con su administrador')
        }
      })
      .catch(error => {
        // Manejar el error
        console.error('Error:', error);
        // setOpenError(true);
        // setTypeError('error');
        // setMessageError('Ocurrió un error al conectarse con la base de datos de los roles y generó la siguiente excepción: ' + error.nombreExcepcion + ': ' + error.mensaje);
      });
  }, [])
    
  const handleClickModal = () =>{
    setOpenModal(true);
  }
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
                <Stack alignItems="center"
                 direction="row" 
                 spacing={1}>
                </Stack>
              </Stack>
              <div>
                <Button
                onClick={handleClickModal}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Agregar
                </Button>
                <ModalUtility 
                openModal={openModal} 
                setOpenModal={setOpenModal} 
                styleModal={styleModal}>
                    <Box
                    sx={{
                      width:'100%',
                      height: '100%',
                      overflow:'auto'
                      // backgroundColor: 'red'
                    }}>
                      <Box
                      sx={{
                        width: '100%',
                        height: '15%',
                        display:"flex",
                        justifyContent:'center',
                        alignItems: 'center',
                        // backgroundColor: 'white'
                      }}>
                        <Typography 
                        variant = 'h6'>
                          Agregar rol
                        </Typography>
                      </Box>
                      <Divider/>
                      <Box
                      sx={{
                        // backgroundColor:'yellow',
                        m: '1vh',
                        display:"flex",
                        justifyContent:'center',
                        alignItems: 'center',
                      }}>
                        <TextField
                          id="rol_name"
                          label="Nombre rol"
                          value={name}
                          helperText='*El nombre del rol debe ser único'
                          onChange={(event) => {
                            setName(event.target.value);
                          }}
                        />
                      </Box>
                      <Box>
                        <ModulePermission
                        rolSelected={rolSelected}
                        idRolSelected={idRolSelected}
                        checked={checked}
                        setChecked={setChecked}
                        loader={loader}
                        idModules = {idModules}
                        />
                      </Box>
                    </Box>
                </ModalUtility>
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
                  setIdRolSelected = {setIdRolSelected}
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
                      <ModulePermission
                      rolSelected={rolSelected}
                      idRolSelected={idRolSelected}
                      checked={checked}
                      setChecked={setChecked}
                      loader={loader}
                      idModules = {idModules}
                      />
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
