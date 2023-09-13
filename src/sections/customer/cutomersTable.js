import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRow from "@mui/material/TableRow";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { indigo, error } from "src/theme/colors";
import { Box, Typography } from "@mui/material";
import ModalUtility from "src/components/modalUtility";
import { ApiContext } from 'src/contexts/Api-context';

function formatPhoneNumber(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }

  return null;
}
const columns = [
  {
    id: "avatar",
    label: "Foto",
    minWidth: 200,
    align: "center",
  },
  {
    id: "nombre",
    label: "Nombre",
    minWidth: 200,
    align: "center",
  },
  {
    id: "rol.nombre",
    label: "Rol",
    minWidth: 80,
    align: "center",
  },
  {
    id: "email",
    label: "Correo electrónico",
    minWidth: 200,
    align: "center",
  },
  {
    id: "numeroTelefonico",
    label: "Celular",
    minWidth: 200,
    align: "center",
  },
  {
    id: "Options",
    label: "Opciones",
    minWidth: 50,
    align: "center",
  },
];

export default function CustomersTable(props) {
  
  const { 
    setLoading,
    setOpenError, 
    setTypeError, 
    setMessageError, 
    setRecharge, 
    recharge,
    setOpenModalEdit,
    setDataModalEdit
   } = props;

  const endpoint = useContext(ApiContext);

  function handleEditClick(user){
    console.log(user);
    let arrayAsignment = []
    arrayAsignment.push(user)
    setDataModalEdit(arrayAsignment);
    setOpenModalEdit(true)
  }
  function handleDeleteClick(id) {
    let statusCode
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch(endpoint + '/opradesign/employee/' + id, requestOptions)
    .then(response => {
      statusCode= response.status;
    })
    .then(result => {
      setLoading(false);
      if (statusCode == 200) {
        setOpenError(true);
        setTypeError('success');
        setMessageError('Se eliminó el usuario con éxito');
        setRecharge(!recharge)
      } else {
        setOpenError(true);
        setTypeError('error');
        setMessageError('No se puede crear el usuario debido a la siguiente excepción ' + result.nombreExcepcion + ': ' + result.mensaje);
      }
    })
    .catch(error => { 
      setOpenError(true);
      setTypeError('error');
      setMessageError('Ocurrió un error: ' + error)});
   
  };

  return (
    <Paper sx={{ width: "100%", height: "60vh" }}>
      {props.busquedaFallida ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            // backgroundColor: 'red'
          }}
        >
          <Box
            sx={{
              mb: 2,
              textAlign: "center",
            }}
          >
            <img
              alt="Under development"
              src="/assets/errors/error-404.png"
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 200,
              }}
            />
          </Box>
          <Typography align="center" sx={{ mb: 3 }} variant="h5">
            Lo sentimos, no se han encontrado usuarios con sus criterios de busqueda
          </Typography>
        </Box>
      ) : (
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table stickyHeader aria-label="sticky table">
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
              {props.data.length > 0 ? props.data.map((data) => (
                <TableRow key={data.idEmployee} align={"center"}>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      // backgroundColor:'red'
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "50%",
                        // backgroundColor: 'white'
                        // filter : 'saturate(50%)'
                      }}
                      src={
                        data.avatar.includes("base64") || data.avatar.includes("https")
                          ? data.avatar
                          : "https://www.dl.dropboxusercontent.com/scl/fi/uuew6bjab92ehc4aeugai/UserGray.png?rlkey=pcy2659qro6fxtqjsctpw6ytl&dl=0"
                      }
                    />
                  </TableCell>
                  <TableCell align="center">{data.name}</TableCell>
                  <TableCell align="center">{data.rol.nombre}</TableCell>
                  <TableCell align="center">{data.email}</TableCell>
                  <TableCell align="center">+57 {formatPhoneNumber(data.phoneNumber)}</TableCell>
                  <TableCell
                    align="center"
                    sx={
                      {
                        // backgroundColor: 'red'
                      }
                    }
                  >
                    <IconButton
                     aria-label="edit"
                     size="large"  >
                      <ModeEditIcon
                      onClick={() => handleEditClick(data)}
                        fontSize="inherit"
                        sx={{
                          "&:hover": {
                            color: indigo.main,
                          },
                        }}
                      />
                    </IconButton>
                    <ModalUtility>
                      este es un modal
                    </ModalUtility>
                    <IconButton 
                    aria-label="delete"
                    size="large">
                      <DeleteIcon
                      onClick={() => handleDeleteClick(data.idEmployee)}
                      fontSize="inherit"
                      sx={{
                        "&:hover": {
                          color: error.main,
                        },
                      }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )): ''}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
