import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
  
  export default function RolesTable(props) {
    
    const {setRolSelected, data} = props;
    // const data = [
    //     {
    //         Nombre: "Administrador"
    //     },
    //     {
    //         Nombre: "Vendedor"
    //     },
    //     {
    //         Nombre: "Gerente"
    //     }
    // ]

  //   const data = [
  //     {
  //         idModulo: 1,
  //         modulo: {
  //             idModulo: 1,
  //             name: "Usuarios",
  //             edit: true,
  //             view: true,
  //             create: true,
  //             delete: true
  //         },
  //         rol: {
  //             idRol: 1,
  //             nombre: "Administrador"
  //         }
  //     },
  //     {
  //         idModulo: 2,
  //         modulo: {
  //             idModulo: 2,
  //             name: "Roles",
  //             edit: true,
  //             view: true,
  //             create: true,
  //             delete: true
  //         },
  //         rol: {
  //             idRol: 1,
  //             nombre: "Administrador"
  //         }
  //     },
  //     {
  //         idModulo: 3,
  //         modulo: {
  //             idModulo: 3,
  //             name: "Inventario",
  //             edit: true,
  //             view: true,
  //             create: true,
  //             delete: true
  //         },
  //         rol: {
  //             idRol: 1,
  //             nombre: "Administrador"
  //         }
  //     },
  //     {
  //         idModulo: 4,
  //         modulo: {
  //             idModulo: 4,
  //             name: "Clientes",
  //             edit: true,
  //             view: true,
  //             create: true,
  //             delete: true
  //         },
  //         rol: {
  //             idRol: 1,
  //             nombre: "Administrador"
  //         }
  //     },
  //     {
  //         idModulo: 5,
  //         modulo: {
  //             idModulo: 5,
  //             name: "Ventas",
  //             edit: true,
  //             view: true,
  //             create: true,
  //             delete: true
  //         },
  //         rol: {
  //             idRol: 1,
  //             nombre: "Administrador"
  //         }
  //     },
  //     {
  //         idModulo: 6,
  //         modulo: {
  //             idModulo: 6,
  //             name: "Entradas/Salidas",
  //             edit: true,
  //             view: true,
  //             create: true,
  //             delete: true
  //         },
  //         rol: {
  //             idRol: 1,
  //             nombre: "Administrador"
  //         }
  //     },
  //     {
  //         idModulo: 7,
  //         modulo: {
  //             idModulo: 7,
  //             name: "Dashboard",
  //             edit: true,
  //             view: true,
  //             create: true,
  //             delete: true
  //         },
  //         rol: {
  //             idRol: 1,
  //             nombre: "Administrador"
  //         }
  //     },
      
  // ]

    const handleClick = (event) =>{
        setRolSelected(event.target.innerText)
    }
  
    return (

        <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {data.map((item, index) => (
        <li key={`section-${item}`}>
          <ul>
            
              <ListItem key={index}>
                <ListItemButton
                id={item.Nombre}
                onClick={handleClick}>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary={item.nombre} />
                </ListItemButton>
              </ListItem>
            
          </ul>
        </li>
      ))}
    </List>
    );
  }
  