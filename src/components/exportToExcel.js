import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import AlertMessage from 'src/components/alertMessage';
import { Button, SvgIcon, Box } from '@mui/material';

const ExportToExcel = (props) => {

    const { data, mainComponent, allow } = props;

    const [error, setOpenError] = useState(false);
    const [typeError, setTypeError] = useState("");
    const [messageError, setMessageError] = useState("");
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = currentDate.toLocaleString('es-ES', options);

    const exportar = () =>{
        if (allow && data !== '') {
            console.log('Entró al componente del botón exportar');
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, mainComponent);
            XLSX.writeFile(workbook, mainComponent + '.xlsx');    
        }else{
            setOpenError(true);
            setTypeError('warning');
            setMessageError('Debes esperar que se cargue la información antes de exportar')
        }
    };

  return (
    
    <Box>
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
        <AlertMessage
        open={error}
        setOpen={setOpenError}
        type={typeError}
        message={messageError}
        />

    </Box>
    
  );
};

export default ExportToExcel;