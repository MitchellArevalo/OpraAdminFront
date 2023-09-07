import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

  
  export default function RolesTable(props) {
    
    const {setRolSelected} = props;
    const data = [
        {
            Nombre: "Administrador"
        },
        {
            Nombre: "Vendedor"
        },
        {
            Nombre: "Gerente"
        }
    ]

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
                    <ListItemText primary={item.Nombre} />
                </ListItemButton>
              </ListItem>
            
          </ul>
        </li>
      ))}
    </List>
    );
  }
  