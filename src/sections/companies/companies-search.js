import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const CompaniesSearch = (props) => {

  const {productos, setProductSearch, setSearching, change, setChange } = props
  const [inputValue, setInputValue] = useState("");
  
  function searchProduct (event) {
    setInputValue(event.target.value);
    setChange(!change)
    if(event.target.value.length>0){
      setSearching(true)      
    }else{
      setSearching(false);
    }
    
  };

  useEffect(() => {
  // console.log(filteredData);
  setProductSearch(inputValue)
  }, [change])
 
  

  return(
  
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Buscar referencia"
      onChange={searchProduct}
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
)};
