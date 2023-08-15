import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography, Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from 'src/hooks/use-auth';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { width } from '@mui/system';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );
  const handleOptions = (event) =>{
    onClose?.();
    router.push(event.target.id);
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 300 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Cuenta
        </Typography>
        <Box
        sx={{
          width: '100%',
          // backgroundColor: 'red',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        >
          <Avatar
          alt="Remy Sharp"
          src={auth.user == null?'':auth.user.avatar}
          sx={{
            width: '150px',
            height: '150px',
            margin: '5px 0 15px 0'
          }}
          />  
          <Typography
          color="text.primary"
          variant="h6" 
          sx={{
          }}
        >
          {auth.user == null?'':auth.user.nombre}
        </Typography>
        <Typography
          color="text.primary"
          variant="subtitle1"
          sx={{
          }}
        >
          {auth.user == null?'':auth.user.rol.nombre}
        </Typography>
        </Box>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem
         onClick={handleOptions}
         id='/settings'
         >
            <SettingsIcon
            sx={{
              mr: 1
            }}/> Configuración
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
           <PowerSettingsNewIcon
           sx={{
            mr: 1
          }}/> Cerrar sesión
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
