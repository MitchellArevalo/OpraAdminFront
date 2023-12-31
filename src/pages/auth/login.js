import { useCallback, useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
import LoadingButton from '@mui/lab/LoadingButton';
import MainLoading from 'src/components/mainLoading'
import AlertMessage from 'src/components/alertMessage';
import { ApiContext } from 'src/contexts/Api-context';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false)
  const [method, setMethod] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setOpenError] = useState(false);
  const [image, setimage] = useState(1);
  const endpoint = useContext(ApiContext);

  const [notificationData, setNotificationData] = useState({
    error: error,
    typeError: "",
    messageError: ""
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Debes ingresar un correo válido')
        .max(255)
        .required('Debes ingresar tu Correo electrónico'),
      password: Yup
        .string()
        .max(255)
        .required('Debes ingresar tu contraseña')
    }),
    onSubmit: async (values, helpers) => {
      try {
        setLoading(true);
        await auth.signIn(values.email, values.password, data);
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        setLoading(false);
        helpers.setSubmitting(false);
      }
    }
  });
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (image === 9) {
        setimage(1);
      } else {
        setimage(image + 1);
      }
    }, 3000);

    return () => clearInterval(intervalo);
  }, [image]);

  useEffect(() => {
    fetch(endpoint + '/opradesign/employee')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setData(data);
        setLoadingData(true)
      })
      .catch(error => {
        // Manejar el error
        console.error('Error:', error);
        setNotificationData({
          ...notificationData,
          error: true,
          typeError: "error",
          messageError: "Ocurrió un error al intentar conectarse con el servidor"
        })
      });
  }, []);

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/');
    },
    [auth, router]
  );


  return (
    <>
      {loadingData ?
        <Box
          sx={{
            display: 'flex',
            height: '100vh',
          }}>
          <Head>
            <title>
              Iniciar sesion | Opra Design
            </title>
          </Head>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 5% ',
              width: '50%',
              height: '100vh',
              // backgroundColor: 'red'

            }}
          >
            <Box
              sx={{
                // backgroundColor: 'red',
                padding: '5%',
                borderRadius: '10px',
              }}
            >
              <Stack
                spacing={4}
                sx={{ mb: 5 }}
              >
                <Typography variant="h4">
                  Iniciar sesión
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                </Typography>
              </Stack>
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Correo electrónico"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Contraseña"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  En caso de errores por favor comuniquese con su administrador
                </FormHelperText>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <LoadingButton
                  loading={loading}
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  <span>Iniciar sesión</span>
                </LoadingButton>
              </form>

            </Box>
            {/* <AlertMessage
                open = {notificationData?.error}
                setOpen = {setOpenError}
                type = {notificationData?.typeError}
                message={notificationData?.messageError}
                /> */}
          </Box>

          <img
            className='ImageCarouselLoginPage'
            alt="Saco"
            src={`/assets/${image}.PNG`}
          />
        </Box>
        :
        <>
          <MainLoading />
          <AlertMessage
            open={notificationData?.error}
            setOpen={setOpenError}
            type={notificationData?.typeError}
            message={notificationData?.messageError}
          />
        </>
      }
    </>
  );
};

// Page.getLayout = (page) => (
//   <AuthLayout>
//     {page}
//   </AuthLayout>
// );

export default Page;
