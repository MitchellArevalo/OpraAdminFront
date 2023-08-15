import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const CompaniesSearch = ({productos, searching, setSearching, setEndpoint}) => {

  function searchProduct (event) {
    console.log('productos:', productos);
    console.log('Valor del evento:', event.target.value);
    // const url = event.target.value;
    const url = `https://fakestoreapi.com/products?limit=${event.target.value}`;
    setSearching(!searching)
    setEndpoint(url)
  };

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
