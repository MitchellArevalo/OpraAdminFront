import NextLink from 'next/link';
import { useState, useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { useAuth } from 'src/hooks/use-auth';
import { ApiContext } from 'src/contexts/Api-context';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const [ moduleData, setModuleData ] = useState([]);
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const auth = useAuth();
  const endpoint = useContext(ApiContext);

  useEffect(() => {
    let statusCode = 0;
    fetch( endpoint + '/opradesign/modulosrol/rol/' + auth.user.rol.idRol)
      .then(response => {
        statusCode = response.status;
        return response.json();
      })
      .then(data => {
        if (statusCode === 200) {
          setModuleData(data);
          const modulesStorage = data.map(objeto => {
            return {
              name: objeto.name,
              edit: objeto.edit,
              view: objeto.view,
              create: objeto.create,
              delete: objeto.delete
            };
          });
          console.log('modulos para el local storage: ' ,modulesStorage);
          localStorage.setItem('permissionSet', JSON.stringify(modulesStorage));
          
        } else {
          console.log('El estatus code es diferente a 200: StatusCode: ' + statusCode);
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
  
  function ShowModule(moduleName) {
    let modulo = moduleData.filter(modulo => modulo.name === moduleName);
    let show = false;
    modulo.map((item, index) => {
      show = item.view;
    });
    
    return show;
  }

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                {auth.user == null?'':auth.user.name}
              </Typography>
              <Typography
                color="neutral.400"
                variant="body2"
              >
                {auth.user == null?'':auth.user.rol.nombre}
              </Typography>
            </div>
            <SvgIcon
              fontSize="small"
              sx={{ color: 'neutral.500' }}
            >
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;
              if(ShowModule(item.apiName)){
                return (
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                  />
                );
              }
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
