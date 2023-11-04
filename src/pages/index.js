import React, {useEffect, useState, useContext} from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget'; //Ventas tablero ajustes
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';//Grafico Ventas
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';//Grafico ultimos productos vendidos
import { OverviewSales } from 'src/sections/overview/overview-sales'; //Grafico de ventas
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic'; //Grafico trafico
import { ApiContext } from 'src/contexts/Api-context';

const now = new Date();

const Page = () => {
  
  const endpoint = useContext(ApiContext);
  const [dataClientes, setDataClientes] = useState([]);
  const [ventasTotales,setVentasTotales] = useState([])
  const [porcentajeDeVenta,setporcentajeDeVenta] = useState([])
  const [VentasAnuales,setVentasAnuales] = useState([])
  const [LastestOrders,setLastestOrders] = useState([])
  const [BetterProduct,setBetterProduct] = useState([])
  const [OnlineVsFisicas,setOnlineVsFisicas] = useState([])
  const [TotalProfit,setTotalProfit] = useState()


  useEffect(() => {   
    
    fetch(endpoint+"/opradesign/client")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setDataClientes(data);
      })
      .catch(error => {
        // Manejar el error
        console.error('Error:', error);
      });

      var requestOptionsSalesMonthly = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(endpoint+"/opradesign/sale/ventas", requestOptionsSalesMonthly)
        .then(response => response.json())
        .then(data => {
          setVentasTotales(data.valorMesActual);
          let diferencia = data.valorMesAnterior - data.valorMesActual;
          let porcentaje = (diferencia / (data.valorMesAnterior === 0 ? 1:data.valorMesAnterior)) * 100;
          let resultado = porcentaje < 0 ? porcentaje * -1: porcentaje;
          setporcentajeDeVenta(resultado);
        })
        .catch(error => {
          // Manejar el error
          console.error('Error:', error);
        });
      var requestOptionsAnualSales = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(endpoint + "/opradesign/sale/anuales", requestOptionsAnualSales)
        .then(response => response.json())
        .then(data => {
          setVentasAnuales(data);
          ////console.log(data)
        })
        .catch(error => {
          // Manejar el error
          console.error('Error:', error);
        });

        var requestOptionsLastOrders = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(endpoint + "/opradesign/sale/recientes", requestOptionsLastOrders)
          .then(response => response.json())
          .then(data => {
            getLastOrdersContructor(data);
            ////console.log(data)
          })
          .catch(error => {
            // Manejar el error
            console.error('Error:', error);
          });

          var requestOptionsBetterProducts = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(endpoint + "/opradesign/sale/better", requestOptionsBetterProducts)
            .then(response => response.json())
            .then(data => {
              getBetterProductsContructor(data)
              ////console.log(data)
            })
            .catch(error => {
              // Manejar el error
              console.error('Error:', error);
            });

          var requestOptionsOnlineVsFisicas = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(endpoint + "/opradesign/sale/lugar", requestOptionsOnlineVsFisicas)
            .then(response => response.json())
            .then(data => {
              calcularPorcentajeVentas(data)
              ////console.log(data)
            })
            .catch(error => {
              // Manejar el error
              console.error('Error:', error);
            });

            var requestOptionsTotalProfit = {
              method: 'GET',
              redirect: 'follow'
            };
            
            fetch(endpoint + "/opradesign/sale/ganancias", requestOptionsTotalProfit)
              .then(response => response.json())
              .then(data => {
                setTotalProfit(data.valorMesActual.toString())
                //console.log(data.valorMesActual.toString())
              })
              .catch(error => {
                // Manejar el error
                console.error('Error:', error);
              });

  }, []);

  function getLastOrdersContructor(data) {
    const newOrders = data.map(order => {
      return {
        id: order.idSale,
        ref: order.idSale,
        amount: order.valorVenta,
        customer: {
          name: order.cliente.nombre
        },
        createdAt: order.fechaVenta,
        status: order.estadoVenta
      };
    });
  
    setLastestOrders(newOrders);
  }

  function getBetterProductsContructor(data) {
    const betterProductsConstructor = data.map(betterProducts => {
      return {
        id: betterProducts.id,
        image: betterProducts.image,
        name: betterProducts.name,
        salesPrice: betterProducts.salesPrice,
      };
    });
  
    setBetterProduct(betterProductsConstructor);
  }

  function calcularPorcentajeVentas(data) {
    let totalVentas = data.cantidadVentasLocales + data.cantidadVentasWebsite;
    let porcentajeVentasLocales = (data.cantidadVentasLocales / totalVentas) * 100;
    let porcentajeVentasWebsite = (data.cantidadVentasWebsite / totalVentas) * 100;
  
    let resultado = []
    resultado.push(parseFloat(porcentajeVentasWebsite.toFixed(2)));
    resultado.push(parseFloat(porcentajeVentasLocales.toFixed(2)));

    //console.log(resultado);
    setOnlineVsFisicas(resultado)
   
  }

  function formatearMoneda(numero) {
    if (numero === undefined || numero === null) {
      return null
    }else{
      let unidades = ["", "K", "M", "B", "T"];
      let contador = 0;
      let esNegativo = false;
    
      if (numero < 0) {
        esNegativo = true;
        numero = Math.abs(numero);
      }
    
      while (numero >= 1000) {
        numero /= 1000;
        contador++;
      }
    
      //console.log('este es el numero' + numero)
      let texto = numero.toString();
      let partes = texto.split('.');
      let decimal;
    
      if (partes.length > 1) {
        decimal = partes[1].substring(0, 2);
      }
    
      let numeroFormateado = esNegativo ? '-$' + partes[0] + '.' + decimal + unidades[contador]: '$' + partes[0] + '.' + decimal + unidades[contador];
    
      return numeroFormateado;
    }
   
  }

  function calcularPorcentajeCumplimiento() {
    var porcentaje = (ventasTotales / 1000000000) * 100;
    return porcentaje.toFixed(2);
  };

  return(
  <>
    <Head>
      <title>
        Dashboard | Opra Design
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              positive
              sx={{ height: '100%' }}
              value= {formatearMoneda(ventasTotales)}
              difference={porcentajeDeVenta}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value={dataClientes.length.toString()}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={calcularPorcentajeCumplimiento()}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value= {formatearMoneda(TotalProfit)}
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'Este año',
                  data: VentasAnuales
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
          <OverviewTraffic
            chartSeries={OnlineVsFisicas}
            labels={['Virtual', 'Fisico']}
            sx={{ height: '100%' }}
          />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={BetterProduct}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestOrders
              orders={LastestOrders}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
