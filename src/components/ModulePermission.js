import React, { useState, useEffect } from 'react'
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
    height: '20vh',
    margin: '3% 0',
    padding: '4%'
}
export default function ModulePermission(props) {
    const { rolSelected, idRolSelected, checked, setChecked, loader, idModules } = props    
    const [loading, setLoading] = useState(false);

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
    }
    function handleClick() {
      setLoading(true);
    }
    
    const Styles = {
        width: '40%',
        padding: '2% 5%'
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
                    color="primary"
                    onClick={handleClick}
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