import React from "react";
import * as XLSX from "xlsx";
import { useState, useEffect, useContext } from "react";
import ModalUtility from "./modalUtility";
import { Button, SvgIcon, Box, Typography, LinearProgress } from "@mui/material";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ApiContext } from "src/contexts/Api-context";

//Modal Desktop
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "40vh",
  padding: "2%",
  bgcolor: "background.paper",
  boxShadow: 2,
  borderRadius: 1,
  overflow: "hidden",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ImportFromExcel = () => {
  const endpoint = useContext(ApiContext);
  const [importing, setImporting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [fileName, setFileName] = useState("");
  const [percent, setPercent] = useState(0);
  const [jsonData, setJsonData] = useState([]);

  const rebootValues = () => {
    jsonObject = {};
    setFileName("");
  };
  let jsonObject = {};

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const workSheet = workbook.Sheets[workbook.SheetNames[0]];
    jsonObject = XLSX.utils.sheet_to_json(workSheet);
    setFileName(file.name);
    let arrayAsignment = [];
    jsonObject.forEach(element => {
        console.log('elemento iterado del json: ', element);
        arrayAsignment.push(element)
    });
    setJsonData(arrayAsignment)
    console.log(jsonObject);
    console.log(workbook);
    console.log(file);
  };

  const importMassiveData = async (event) => {
    setImporting(true);
    console.log('tamaño del array',jsonData.length)
    console.log('array desde el guardar: ', jsonData);
    if (jsonData.length > 0) {
        let arrayLength = jsonData.length;
        let iteratedIndex = 1;
      for (let index = 0; index < jsonData.length; index++) {
        await fetch(endpoint + "/opradesign/employee", {
          method: "POST",
          body: JSON.stringify({
            avatar: jsonData[index].avatar,
            name: jsonData[index].name,
            email: jsonData[index].email,
            contrasena: jsonData[index].contrasena,
            documento: jsonData[index].documento,
            direccion: jsonData[index].direccion,
            numeroTelefonico: jsonData[index].numeroTelefonico,
            idRol: parseInt(jsonData[index].idRol),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            console.log('percent: ', percent)
            setPercent((iteratedIndex / arrayLength) * 100);
            iteratedIndex++;
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
      // setTimeout(() => {
      //     fetch("http://localhost:3002/api/v1/products")
      //         .then((response) => response.json())
      //         .then((data) => {
      //             setProductsName(data);
      //         });
      //         setImportOpen(false);
      //         setImporting(false);
      // }, 2000);
    } else {
      alert("Debe llenar las columnas obligatorias");
      setImporting(false);
      return;
    }
  };

  const closeImportModal = (event) => {
    rebootValues()
    setOpenModal(false);
  };

  const handleOpenClick = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth);
      // console.log(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      <Button
        color="inherit"
        onClick={handleOpenClick}
        startIcon={
          <SvgIcon fontSize="small">
            <ArrowUpOnSquareIcon />
          </SvgIcon>
        }
      >
        Importar
      </Button>
      <ModalUtility openModal={openModal} setOpenModal={setOpenModal} styleModal={styleModal}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            // backgroundColor: "red",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
            //   backgroundColor: 'yellow',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around'
            }}
          >
            {importing ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  padding:percent === 100?'0':'25% 0',                
                }}
              >
                {percent === 100?
                <>
                <Box
                sx={{
                    // backgroundColor:'red',
                    height:'100%',
                    display:'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CheckCircleIcon
                    sx={{
                        color: 'green',
                        width: '10vw',
                        height: '10vw',
                    }}/>
                    <Typography 
                     variant="h5"
                     color="initial">
                        Usuarios importados con éxito
                    </Typography>
                    <Button
                    variant="text"
                    onClick={closeImportModal}
                    sx={{
                        margin: "1vw",
                        color: 'green'
                        // backgroundColor: "white",
                    }}
                    >
                    Entendido
                    </Button>
                </Box>
                </>
                :
                <>
                    <Typography
                    variant="h5">
                        {percent}%
                    </Typography>
                    <LinearProgress 
                    variant="determinate"
                    value={percent} />
                </>
                }
              </Box>
            ) : (
                <>
                <Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "5vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    >
                    <Typography variant="h5">Importar</Typography>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "18vh",
                        // backgroundColor: 'brown',
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                    >
                    <Typography variant="subtitle1">{fileName}</Typography>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Seleccionar archivo
                        <VisuallyHiddenInput
                        type="file"
                        accept=".xlsx"
                        name="InputFile"
                        onChange={(e) => handleFile(e)}
                        />
                    </Button>
                    </Box>
                </Box>
                <Box>
                <Box
                    sx={{
                    width: "100%",
                    height: "10vh",
                    // backgroundColor: 'green',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                >
                    <Button
                    variant="outlined"
                    onClick={closeImportModal}
                    sx={{
                        margin: "0 5px",
                        backgroundColor: "white",
                    }}
                    >
                    <CloseIcon /> Cancelar
                    </Button>
                    <Button
                    variant="contained"
                    onClick={importMassiveData}
                    sx={{
                        margin: "0 5px",
                        // backgroundColor: "white",
                    }}
                    >
                    <SaveIcon /> Guardar
                    </Button>
                </Box>
                </Box>
                
                </>
            )}
          </Box>
         
        </Box>
      </ModalUtility>
    </>
  );
};

export default ImportFromExcel;
