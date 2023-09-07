import { createContext, useContext, useState, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';

//Clase para autenticar el inicio de sesión, cierre de sesión y deserializar la información del usuario que inicio el aplicativo
const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// La función de este contexto es propagar el estado de autenticación a través del árbol de aplicaciones.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      
      const userDataJson = window.sessionStorage.getItem('userData');
      const userData = JSON.parse(userDataJson);
      // console.log(userData)
      // console.log(userData.contrasena);

      const user = {
        idEmployee: userData.idEmployee,
          avatar: userData.avatar,
          username: userData.username,
          password: userData.password,
          document: userData.document,
          name: userData.name,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          notificationsEmail: userData.notificationsEmail,
          rol: {
            idRol: userData.rol.idRol,
            nombre: userData.rol.nombre
          }
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    []
  );
  
  const signIn = async (email, password, data) => {
    
    const filteredData = data.filter((item) =>
    item.email.toLowerCase().includes(email.toLowerCase()) 
    );

    if(filteredData.length < 1){
      throw new Error('Verifique su correo y contraseña por favor');
    }
    if (password !== filteredData[0].password || email !== filteredData[0].email ) {
      throw new Error('Verifique su correo y contraseña por favor');
    }
    // if (password !== filteredData[0].contrasena ) {
    //   throw new Error('Contraseña incorrecta');
    // }
    // if (email !== 'Admin@Opra.com' || password !== '123') {
    //   throw new Error('Verifica tu usuario y contraseña');
    // }


    try {
      window.sessionStorage.setItem('authenticated', 'true');
      
    } catch (err) {
      console.error(err);
    }

    const user = {
      idEmployee: filteredData[0].idEmployee,
      avatar: filteredData[0].avatar,
      username: filteredData[0].username,
      password: filteredData[0].password,
      document: filteredData[0].document,
      name: filteredData[0].name,
      email: filteredData[0].email,
      phoneNumber: filteredData[0].phoneNumber,
      notificationsEmail: filteredData[0].notificationsEmail,
      rol: {
        idRol: filteredData[0].rol.idRol,
        nombre: filteredData[0].rol.nombre
      }
    };
    window.sessionStorage.setItem('userData', JSON.stringify(user));

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };
  
  const signUp = async (email, name, password) => {
    throw new Error('Error con el inicio de sesión');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
