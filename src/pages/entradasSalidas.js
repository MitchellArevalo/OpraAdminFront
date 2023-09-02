import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box, Button, Container, Stack, SvgIcon, TextField, Typography, FormControl, InputAdornment, MenuItem, Divider } from '@mui/material';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ExportToExcel from 'src/components/exportToExcel';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

const Page = () => {
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
          {/* Parte interna del componente */}
          <Box
            sx={{
              // backgroundColor: 'red',
              width: '100%',
              height: '100%'
            }}
          >
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
