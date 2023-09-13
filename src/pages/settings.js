import Head from 'next/head';
import { useEffect } from 'react';
import { Box, Container, Stack, Typography, Grid } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';//Configuracion notificaciones
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { useAuth } from 'src/hooks/use-auth';
import { AES, enc } from 'crypto-js';

  const Page = () => {
    const auth = useAuth();
    
    function desencriptarPassword(password) {
      return AES.decrypt(password, 'secretPassword').toString(enc.Utf8);
    }
    useEffect(() => {
      let passwordDesencripted = desencriptarPassword(auth.user.password);
      console.log('contraseña desencriptada: ', passwordDesencripted);
    }, [])
    
    
    return(
      <>
      <Head>
        <title>
          Configuración | Opra Design
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h4">
              Configuración
            </Typography>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: 2
              }}
            >
              <Container maxWidth="lg">
                <Stack spacing={3}>
                  <div>
                    <Typography variant="h5">
                      Información general
                    </Typography>
                  </div>
                  <Box
                  sx={{
                    // backgroundColor: 'red',
                    height: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                      <AccountProfile
                      user={auth.user === null?'':auth.user}/>
                      
                      <AccountProfileDetails
                       user={auth.user === null?'':auth.user} />
                  </Box>
                    
                </Stack>
              </Container>
            </Box>
            <SettingsPassword />
            <SettingsNotifications 
            notification = {auth.user === null?'': auth.user.notificationsEmail}
            user={auth.user}/>
          </Stack>
        </Container>
      </Box>
    </>
    );
  };

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
