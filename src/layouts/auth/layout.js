import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { maxHeight } from '@mui/system';

// TODO: Change subtitle text

export const Layout = (props) => {
  const { loadingData, children } = props;

  return (
    <>
      <Box
      component="main"
      sx={{
        // display: 'flex',
        // flex: '1 1 auto',
        width: '100vw',
        height: '100vh'
      }}
    >
      <Grid
        lg ={12}
        xs = {6}
        container
        sx={{ 
          flex: '1 1 auto',
          height: '100%',
          width: '100%'
        }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <Box sx={{ p: 0 }}>
            <img
              alt="Saco"
              src="/assets/saco3.PNG"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
    
  );
};

Layout.prototypes = {
  children: PropTypes.node
};