import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/contexts/auth-context';

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  useEffect(
    () => {
      // permissions.forEach((permission, index) => {
        //   const permissionFormat = permission.name;
      //   console.log('permiso name desde local storage: ' + permissionFormat.toLowerCase());
      //   console.log('permiso name from path: ' + path.replace('/', ''));
      //   console.log('permiso de vista' + permission.view)
      //   if (pathFormat === permissionFormat.toLowerCase() && permission.view) {
        //     setAuthRole(true);
      //   }
      //   // No se hace nada con router.pathname, considera eliminar esta línea si no se necesita
      // });
      // console.log('variable auth role: ' + authRole);
      if (!router.isReady) {
        return;
      }

      // Prevent from calling twice in development mode with React.StrictMode enabled
      if (ignore.current) {
        return;
      }

      ignore.current = true;
      
      let authRole = false;
      const permissions = JSON.parse(localStorage.getItem('permissionSet'));
      const path = router.pathname.toString();
      let pathFormat = path.replace('/', '');
      switch (pathFormat) {
        case '':
          pathFormat = 'dashboard'
          break;
        case 'settings':
          authRole =true;
          break;
        case 'entradasSalidas':
          pathFormat = 'entradas_salidas'
          break;

        default:
          break;
      }
      let permiso = permissions.filter(permise => permise.name.toLowerCase() === pathFormat);
      permiso.map((per, index) => {
        console.log('valor del view: ' + per.view);
        authRole = per.view;
      });

      if (!isAuthenticated) {
        console.log('Not authenticated, redirecting');
        router
        .replace({
          pathname: '/auth/login',
          query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          })
          .catch(console.error);
      }else if(!authRole){
        console.log('Not Access to this page, redirecting');
        router
          .replace({
            pathname: '/404',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          })
          .catch(console.error);
      } else {
        setChecked(true);
      }
    },
    [router.isReady]
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
