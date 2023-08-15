import { useTheme } from '@mui/material/styles';
import { width } from '@mui/system';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <img src='/assets/LogoSinFondoOpra.png'
     alt='OpraLogoName'
     style={{width: '200px', height: '10vh'}}/>
  );
};
