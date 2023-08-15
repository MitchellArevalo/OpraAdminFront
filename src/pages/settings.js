import Head from 'next/head';
import { Box, Container, Stack, Typography, Grid } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';//Configuracion notificaciones
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { useAuth } from 'src/hooks/use-auth';

  const Page = () => {
    const auth = useAuth();
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
                    height: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                      <AccountProfile
                      user={auth.user}/>
                      
                      <AccountProfileDetails
                       user={auth.user} />
                  </Box>
                    
                </Stack>
              </Container>
            </Box>
            <SettingsPassword />
            <SettingsNotifications />
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
