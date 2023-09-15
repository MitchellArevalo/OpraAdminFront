import React, { useState, useEffect, useContext } from 'react'
import { ApiContext } from 'src/contexts/Api-context';
import {
    Box,
    Button,
    Container,
    Stack,
    SvgIcon,
    Typography,
    FormControl,
    InputAdornment,
    Paper,
    FormControlLabel,
    Switch
  } from "@mui/material";
  
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

const stylePapers = {
    width: '100%',
    height: '30vh',
    margin: '3% 0',
    display:'grid',
    placeItems:'center',
    padding: '8%'
}
const Styles = {
    width: '48%',
    padding: '2% 5%',
    margin:'0 1%',
    // backgroundColor:'red'
}
const modulosDisponibles = [
    {
        name: 'Usuarios'
    },
    {
        name: 'Roles'
    },
    {
        name: 'Inventario'
    },
    {
        name: 'Clientes'
    },
    {
        name: 'Ventas'
    },
    {
        name: 'Entradas_Salidas'
    },
    {
        name: 'Dashboard'
    },
]

export default function ModulePermission(props) {
    const { rolSelected, idRolSelected, checked, setChecked, loader, idModules, setRolSelected, setOpenAlert, setTypeAlert, setMessageAlert, setRechargeData, rechargeData, nameNewRole, setOpenModal} = props    
    const [loading, setLoading] = useState(false);
    const [ idRolCreated, setIdRolCreated ] = useState(0)
    const endpoint = useContext(ApiContext);
    const clearFields = () => {
        setChecked({
          ...checked,
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
        })
        setRolSelected('');
        setRechargeData(!rechargeData)
    }
    
    function obtenerIdPorNombre(nombre) {
        const objetoEncontrado = idModules.find(objeto => objeto.name === nombre);
        return objetoEncontrado ? objetoEncontrado.idModulo : null;
    }
    
    function handleClick(idButton){
        let succesfully = false;
        // let idRolCreated = undefined;
        let idsModulesCreated = [];
        console.log('id del boton: ' + event.target.id);
        setLoading(true);
        if (idButton.length > 0) {
            modulosDisponibles.forEach(item => {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
    
                var raw = JSON.stringify({
                "name": item.name,
                "edit": checked?.[item.name + 'Edit'],
                "view": checked?.[item.name + 'View'],
                "create": checked?.[item.name + 'Create'],
                "delete": checked?.[item.name + 'Delete'],
                });
    
                var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };
    
                console.log('valores a actualizar modulo ' + item.name);
                console.log(raw);
                
                fetch(endpoint + "/opradesign/module/" + obtenerIdPorNombre(item.name) , requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
                
            });
            clearFields();
            setOpenAlert(true);
            setTypeAlert('success');
            setMessageAlert('Cambios realizados correctamente');
        }else{
            
            var myHeadersPostRol = new Headers();
            myHeadersPostRol.append("Content-Type", "application/json");

            var rawRol = JSON.stringify({
            "nombre": nameNewRole
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeadersPostRol,
            body: rawRol,
            redirect: 'follow'
            };

            let statusCode
            fetch(endpoint + "/opradesign/rol", requestOptions)
            .then(response => {
                statusCode = response.status;
                return response.json();
              })
              .then(data => {
                if (statusCode === 201) {
                    console.log(data);
                    console.log(data.valor)
                    setIdRolCreated(data.valor);
                    if(data.valor > 0){
                  
                        modulosDisponibles.forEach(item => {
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                
                            var raw = JSON.stringify({
                            "name": item.name,
                            "edit": checked?.[item.name + 'Edit'],
                            "view": checked?.[item.name + 'View'],
                            "create": checked?.[item.name + 'Create'],
                            "delete": checked?.[item.name + 'Delete'],
                            });
                
                            var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                            };
                            
                            fetch(endpoint + "/opradesign/module" , requestOptions)
                            .then(response => response.json())
                            .then(result => {
                                  console.log('data de la creación de los modulos: ', result)
                                  var myHeaders = new Headers();
                                  myHeaders.append("Content-Type", "application/json");
                  
                                  var raw = JSON.stringify({
                                  "idModulo": result.valor,
                                  "idRol": data.valor
                                  });
                  
                                  var requestOptions = {
                                  method: 'POST',
                                  headers: myHeaders,
                                  body: raw,
                                  redirect: 'follow'
                                  };
                  
                                  fetch(endpoint + "/opradesign/modulosrol/", requestOptions)
                                  .then(ultimaRespuesta => ultimaRespuesta.text())
                                  .then(result => {
                                      console.log(result)
                                      clearFields();
                                      setOpenAlert(true);
                                      setTypeAlert('success');
                                      setMessageAlert('Modulo creado correctamente');
                                  })
                                  .catch(error => {
                                    setLoading(false);
                                    setOpenAlert(true);
                                    setTypeAlert('error');
                                    setMessageAlert('Ocurrió un error al intentar crear el modulo' + error.nombreExcepcion + ' ' + error.mensaje);
                                  });

                            })
                            .catch(error => console.log('error', error));
                            
                        });
                    }
                  
                } else {
                    console.log(data);
                  setOpenAlert(true);
                  setTypeAlert('error');
                  setMessageAlert('Ocurrió un error al intentar crear el rol y generó la siguiente excepción: ' + data.nombreExcepcion + ': ' + data.mensaje)
                  setLoading(false);
                  return;
                }
              })
              .catch(error => {
                // Manejar el error
                console.error('Error:', error);
                setOpenAlert(true);
                setTypeAlert('error');
                setMessageAlert('Ocurrió un error al intentar crear el rol y generó la siguiente excepción: ' + error.nombreExcepcion + ': ' + error.mensaje);
              });      
        }

    }
    
   
    const IOSSwitch = styled((props) => (
          <Switch focusVisibleClassName=".Mui-focusVisible"
           disableRipple
           {...props} />
        ))(({ theme }) => ({
          width: 42,
          height: 26,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
              transform: 'translateX(16px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
              },
              
            },
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
          },
          '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
              duration: 500,
            }),
          },
        }));

        function handleSwitch(campo) {
            console.log(campo);
            setChecked((prevState) => ({
              ...prevState,
              [campo]: !checked?.[campo]
            }));
        }
  return (
    <>
    {!loader > 0?
        <>
            <Paper
            elevation={24}
            sx={stylePapers}>
                <Box>
                    <Typography
                    variant='h6'>
                        Usuarios
                    </Typography>
                </Box>
                <Box>
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.UsuariosCreate}  />}
                onClick={()=>handleSwitch('UsuariosCreate')}
                label="Crear"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.UsuariosEdit}  />}
                onClick={()=>handleSwitch('UsuariosEdit')}
                label="Editar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.UsuariosView}  />}
                onClick={()=>handleSwitch('UsuariosView')}
                label="Visualizar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.UsuariosDelete}  />}
                onClick={()=>handleSwitch('UsuariosDelete')}
                label="Eliminar"
                />
                </Box>
            </Paper>
            <Paper
            elevation={24}
            sx={stylePapers}>
                <Box>
                    <Typography
                    variant='h6'>
                        Roles
                    </Typography>
                </Box>
                <Box>
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.RolesCreate}  />}
                onClick={()=>handleSwitch('RolesCreate')}
                label="Crear"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.RolesEdit}  />}
                onClick={()=>handleSwitch('RolesEdit')}
                label="Editar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.RolesView}  />}
                onClick={()=>handleSwitch('RolesView')}
                label="Visualizar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.RolesDelete}  />}
                onClick={()=>handleSwitch('RolesDelete')}
                label="Eliminar"
                />
                </Box>
            </Paper>
            <Paper
            elevation={24}
            sx={stylePapers}>
                <Box>
                    <Typography
                    variant='h6'>
                        Inventario
                    </Typography>
                </Box>
                <Box>
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.InventarioCreate}  />}
                onClick={()=>handleSwitch('InventarioCreate')}
                label="Crear"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.InventarioEdit}  />}
                onClick={()=>handleSwitch('InventarioEdit')}
                label="Editar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.InventarioView}  />}
                onClick={()=>handleSwitch('InventarioView')}
                label="Visualizar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.InventarioDelete}  />}
                onClick={()=>handleSwitch('InventarioDelete')}
                label="Eliminar"
                />
                </Box>
            </Paper>
            <Paper
            elevation={24}
            sx={stylePapers}>
                <Box>
                    <Typography
                    variant='h6'>
                        Ventas
                    </Typography>
                </Box>
                <Box>
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.VentasCreate}  />}
                onClick={()=>handleSwitch('VentasCreate')}
                label="Crear"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.VentasEdit}  />}
                onClick={()=>handleSwitch('VentasEdit')}
                label="Editar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.VentasView}  />}
                onClick={()=>handleSwitch('VentasView')}
                label="Visualizar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.VentasDelete}  />}
                onClick={()=>handleSwitch('VentasDelete')}
                label="Eliminar"
                />
                </Box>
            </Paper>
            <Paper
            elevation={24}
            sx={stylePapers}>
                <Box>
                    <Typography
                    variant='h6'>
                        Clientes
                    </Typography>
                </Box>
                <Box>
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.ClientesCreate}  />}
                onClick={()=>handleSwitch('ClientesCreate')}
                label="Crear"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.ClientesEdit}  />}
                onClick={()=>handleSwitch('ClientesEdit')}
                label="Editar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.ClientesView}  />}
                onClick={()=>handleSwitch('ClientesView')}
                label="Visualizar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.ClientesDelete}  />}
                onClick={()=>handleSwitch('ClientesDelete')}
                label="Eliminar"
                />
                </Box>
            </Paper>
            <Paper
            elevation={24}
            sx={stylePapers}>
                <Box>
                    <Typography
                    variant='h6'>
                        Entradas / Salidas
                    </Typography>
                </Box>
                <Box>
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.Entradas_SalidasCreate}  />}
                onClick={()=>handleSwitch('Entradas_SalidasCreate')}
                label="Crear"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.Entradas_SalidasEdit}  />}
                onClick={()=>handleSwitch('Entradas_SalidasEdit')}
                label="Editar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.Entradas_SalidasView}  />}
                onClick={()=>handleSwitch('Entradas_SalidasView')}
                label="Visualizar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.Entradas_SalidasDelete}  />}
                onClick={()=>handleSwitch('Entradas_SalidasDelete')}
                label="Eliminar"
                />
                </Box>
            </Paper>
            <Paper
            elevation={24}
            sx={stylePapers}>
                <Box>
                    <Typography
                    variant='h6'>
                        Dashboard
                    </Typography>
                </Box>
                <Box>
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.DashboardCreate}  />}
                onClick={()=>handleSwitch('DashboardCreate')}
                label="Crear"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.DashboardEdit}  />}
                onClick={()=>handleSwitch('DashboardEdit')}
                label="Editar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.DashboardView}  />}
                onClick={()=>handleSwitch('DashboardView')}
                label="Visualizar"
                />
                <FormControlLabel
                sx={Styles}
                control={<IOSSwitch sx={{ m: 1 }} 
                checked={checked?.DashboardDelete}  />}
                onClick={()=>handleSwitch('DashboardDelete')}
                label="Eliminar"
                />
                </Box>
            </Paper>
            <Box
            sx={{
                // backgroundColor: 'red',
                width: '100%',
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center'
            }}>
                <LoadingButton
                    id={rolSelected}
                    color="primary"
                    onClick={()=>{handleClick(rolSelected.length>0?rolSelected:'')}}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    sx={{
                        marginRight:'1%'
                    }}
                >
                    <span>Save</span>
                </LoadingButton>
            </Box>
        </> :
        <>
        <Box sx={{ 
            display: 'flex',
            width: '100%',
            alignItems:'center',
            justifyContent: 'center',
            height: '40vh'
        }}>
            <CircularProgress />
        </Box>
        </>}
    </>
   
  )
}