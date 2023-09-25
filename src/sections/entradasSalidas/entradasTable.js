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

  const columns = [
    { 
        id: 'Producto', 
        label: 'Producto',
        minWidth: 170 ,
        align: 'center'
    },
    {
      id: 'costProduct',
      label: 'Costo',
      minWidth: 150,
      align: 'center',
    },
    {
      id: 'quantityProduct',
      label: 'Cantidad',
      minWidth: 170,
      align: 'center',
    },
    {
        id: 'description',
        label: 'Comentarios',
        minWidth: 170,
        align: 'center',
    },
    {
      id: 'Employee',
      label: 'Ingresado por',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'dateInput',
      label: 'Fecha de ingreso',
      minWidth: 170,
      align: 'center',
    }
  ];
  
  export default function EntradasTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    var formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    });
    
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
           Lo sentimos, no se han encontrado entradas con sus criterios de busqueda
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
                                align='center'>{data.product.name}</TableCell>
                                <TableCell
                                align='center'>{formatter.format(data.costProduct)}</TableCell>
                                <TableCell
                                align='center'>{data.quantityProduct}</TableCell>
                                <TableCell
                                align='center'>{data.description}</TableCell>
                                <TableCell
                                align='center'>{data.employee.username}</TableCell>
                                <TableCell
                                align='center'>{data.dateInput}</TableCell>
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
  