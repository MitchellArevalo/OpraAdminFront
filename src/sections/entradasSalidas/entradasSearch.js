import { useEffect, useState } from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';


const EntradasSearch = (props) => {

    const { dataEntries , setFilteredDataEntries, setBusquedaFallida} = props;

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

    const filteredData = dataEntries.filter((item) =>
    item.product.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    useEffect(() => {
    setFilteredDataEntries(filteredData)
    }, [change])

    return (
        <Card sx={{ p: 2}}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Busca una entrada"
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

export default EntradasSearch

