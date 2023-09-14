import React, { useEffect, useState, useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { indigo, error } from "src/theme/colors";
import AlertMessage from 'src/components/alertMessage';
import { ApiContext } from 'src/contexts/Api-context';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button'
  
  export default function RolesTable(props) {
    
    const {setRolSelected, setIdRolSelected, data, setRechargeData, rechargeData} = props;

    const endpoint = useContext(ApiContext);
    const [alert, setOpenAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState("");
    const [messageAlert, setMessageAlert] = useState("")

    const handleClick = (event) =>{
        setRolSelected(event.target.innerText)
        setRechargeData(!rechargeData)
    }

    function handleDeleteClick(idRol){
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(endpoint +"/opradesign/modulosrol/rol/"+idRol, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log('Resultado:', result);
            result.forEach(item => {
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                "idModulo": item.idModulo
              });

              var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                 redirect: 'follow'
              };

          fetch(endpoint + "/opradesign/modulosrol/rol/"+idRol, requestOptions)
            .then(response => response.json())
            .then(result => console.log('Rol eliminado con éxito' , result))
            .catch(error => console.log('error', error));
                      });
        })
        .catch(error => console.log('error', error));

      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch( endpoint + "/opradesign/rol/"+idRol, requestOptions)
        .then(response => response.text())
        .then(result => {
          setOpenAlert(true);
          setTypeAlert('success');
          setMessageAlert('Rol eliminado con éxito');
        })
        .catch(error => console.log('error', error));
        setRechargeData(!rechargeData)
        setRolSelected('');
        setIdRolSelected(0);
    }

    function assignIdRol(id){
      setIdRolSelected(id);
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
      <AlertMessage
        open={alert}
        setOpen={setOpenAlert}
        type={typeAlert}
        message={messageAlert}
      />
      {data.map((item, index) => (
        <li key={`section-${item}`}>
          <ul>
            
              <ListItem key={index}
                onClick={()=>{assignIdRol(item.idRol)}}

              >
                <ListItemButton
                id={item.Nombre}
                onClick={handleClick}
                >
                    <ListItemIcon>
                    <RadioButtonCheckedIcon
                    color='primary'/>
                    </ListItemIcon>
                    <ListItemText 
                    id={item.id} 
                    primary={item.nombre} />
                </ListItemButton>
                <IconButton 
                    aria-label="delete"
                    size="large">
                      <DeleteIcon
                      onClick={() => handleDeleteClick(item.idRol)}
                      fontSize="inherit"
                      sx={{
                        "&:hover": {
                          color: error.main,
                        },
                      }}
                      />
                </IconButton>
              </ListItem>
            
          </ul>
        </li>
      ))}
    </List>
    );
  }
  