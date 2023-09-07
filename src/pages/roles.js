import { useEffect, useState } from 'react';
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

const Page = () => {
    const [rolSelected, setRolSelected] = useState('');
    const [spreadRoles, setSpreadRoles] = useState({
        nombre: rolSelected,
        Modulo: {
          view: false,
          create: false,
          edit: false,
          del: false
        }
      });
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

    const rolClick = () =>{
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
                backgroundColor: 'blue',
                display: 'flex',
                justifyContent: 'space-around',
                width: '100% '
            }}
            >
                 <Box
                 sx={{
                    backgroundColor: 'red',
                    width: '30%'
                 }}>
                  <RolesTable
                  setRolSelected = {setRolSelected}
                   />
                </Box>
                <Divider 
                orientation="vertical"
                flexItem />
                <Box
                sx={{
                    backgroundColor: 'green',
                    width: '70%'
                }}>
                  {rolSelected}
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
