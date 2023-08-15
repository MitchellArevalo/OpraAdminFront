import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
  Box,
  Typography
} from '@mui/material';


function formatPhoneNumber(phoneNumber) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }

  return null;
}
  const columns = [
    { 
        id: 'avatar',
        label: 'Foto', 
        minWidth: 150,
        align: 'center',
    },
    { 
        id: 'nombre', 
        label: 'Nombre',
        minWidth: 170 ,
        align: 'center'
    },
    {
      id: 'rol.nombre',
      label: 'Rol',
      minWidth: 150,
      align: 'center',
    },
    {
      id: 'email',
      label: 'Correo electrónico',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'numeroTelefonico',
      label: 'Celular',
      minWidth: 170,
      align: 'center',
    },
  ];
  
  export default function CustomersTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper sx={{ width: '100%' }}>
        {
          props.busquedaFallida?
          <Box
          sx={{
            width: '100%',
            height: '40vh',
            // backgroundColor: 'red'
          }}>
        <Box
          sx={{
            mb: 2,
            textAlign: 'center'
          }}>
            <img
              alt="Under development"
              src="/assets/errors/error-404.png"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 200
              }}
          />
        </Box>
          <Typography
            align="center"
            sx={{ mb: 3 }}
            variant="h5"
          >
           Lo sentimos, no se han encontrado usuarios con sus criterios de busqueda
          </Typography>
      </Box>
          :

          <TableContainer sx={{ maxHeight: '50vh' }}>
          <Table stickyHeader 
          aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 0, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
                    {props.data.map((data) => (
                         <TableRow
                         key={data.id}
                         align = {'center'}
                         >
                                <TableCell
                                sx={{
                                    width: '10%',
                                    // backgroundColor: 'red',
                                    textAlign: 'center',
                                    verticalAlign: 'center'
                                }}>
                                    <img style={{
                                    width: '80%',
                                    borderRadius: '100%',
                                    objectFit: 'contain',
                                    // filter : 'saturate(50%)'
                                }} 
                                src={data.avatar.includes('base64')?data.avatar:'https://www.dl.dropboxusercontent.com/scl/fi/uuew6bjab92ehc4aeugai/UserGray.png?rlkey=pcy2659qro6fxtqjsctpw6ytl&dl=0'}/></TableCell>
                                <TableCell
                                align='center'>{data.nombre}</TableCell>
                                <TableCell
                                align='center'>{data.rol.nombre}</TableCell>
                                <TableCell
                                align='center'>{data.email}</TableCell>
                                <TableCell
                                align='center'>+57 {formatPhoneNumber(data.numeroTelefonico)}</TableCell>
                         </TableRow>
                    ))
                    }
                    
            </TableBody>
          </Table>
        </TableContainer>
        }
        {props.busquedaFallida?
          ''
                    :
          <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
          
        }        
      </Paper>
    );
  }
  