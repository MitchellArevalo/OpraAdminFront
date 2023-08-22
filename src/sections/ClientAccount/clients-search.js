import { useEffect, useState } from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';


const ClientsSearch = (props) => {

    const { data , setFilteredDataUsers, setBusquedaFallida} = props;

    const [inputValue, setInputValue] = useState("");
    const [change, setChange] = useState(false);

    const searchChange = (event) => {
    setInputValue(event.target.value);
    setChange(!change)
    if (event.target.value.length > 0 && filteredData.length < 1) {
        setBusquedaFallida(true)
    }else{
        setBusquedaFallida(false)
    }
    };

    const filteredData = data.filter((item) =>
    item.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );

    useEffect(() => {
    // console.log(filteredData);
    setFilteredDataUsers(filteredData)
    }, [change])

    return (
        <Card sx={{ p: 2}}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Busca un cliente"
            onChange={searchChange}
            startAdornment={(
              <InputAdornment position="start">
                <SvgIcon
                  color="action"
                  fontSize="small"
                >
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </InputAdornment>
            )}
            sx={{ maxWidth: '100%' }}
          />
        </Card>
       )
}

export default ClientsSearch

