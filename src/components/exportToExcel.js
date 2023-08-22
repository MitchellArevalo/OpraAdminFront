import React from 'react';
import * as XLSX from 'xlsx';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Button, SvgIcon } from '@mui/material';

const ExportToExcel = (props) => {

    const { data, mainComponent } = props;
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = currentDate.toLocaleString('es-ES', options);

    const exportar = () =>{
        console.log('Entró al componente del botón exportar');
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, mainComponent);
        XLSX.writeFile(workbook, mainComponent + '.xlsx');
    };

  return (
    <Button
    color="inherit"
    onClick={exportar}
    startIcon={(
        <SvgIcon fontSize="small">
        <ArrowDownOnSquareIcon />
        </SvgIcon>
    )}
    >
        Exportar
    </Button>
  );
};

export default ExportToExcel;