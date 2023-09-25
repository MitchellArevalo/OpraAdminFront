import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Box, Typography} from '@mui/material';

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
        id: 'cliente.nombre', 
        label: 'Cliente',
        minWidth: 170 ,
        align: 'center'
    },
    {
      id: 'valorVenta',
      label: 'Monto',
      minWidth: 150,
      align: 'center',
    },
    {
      id: 'profitVenta',
      label: 'Ganancia',
      minWidth: 170,
      align: 'center',
    },
    {
        id: 'fechaVenta',
        label: 'Fecha',
        minWidth: 170,
        align: 'center',
    },
    {
      id: 'estadoVenta',
      label: 'Estado',
      minWidth: 170,
      align: 'center',
    }
  ];
  
  export default function TablaVentas(props) {
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
           Lo sentimos, no se han encontrado ventas con sus criterios de busqueda
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
                                align='center'>{data.cliente.nombre}</TableCell>
                                <TableCell
                                align='center'>{data.valorVenta}</TableCell>
                                <TableCell
                                align='center'>{data.profitVenta}</TableCell>
                                <TableCell
                                align='center'>{data.fechaVenta}</TableCell>
                                <TableCell
                                align='center'>{data.estadoVenta}</TableCell>
                         </TableRow>
                    ))
                    }
                    
            </TableBody>
          </Table>
        </TableContainer>
        }       
      </Paper>
    );
  }
  