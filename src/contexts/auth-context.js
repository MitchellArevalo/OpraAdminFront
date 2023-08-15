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
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Mitchell desde contexto',
        email: 'Admin@Opra.com'
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

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Mitchell contexto2',
      email: 'Admin@Opra.com'
    };//Usuario que ya tiene iniciada la sesion para skipear

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };
  
  const signIn = async (email, password, data) => {
    
    const filteredData = data.filter((item) =>
    item.email.toLowerCase().includes(email.toLowerCase()) 
    );

    if(filteredData.length < 1){
      throw new Error('Verifique su correo y contraseña por favor');
    }
    if (password !== filteredData[0].contrasena || email !== filteredData[0].email ) {
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
      idPersona: filteredData[0].idPersona,
      avatar: filteredData[0].avatar,
      username: filteredData[0].username,
      contrasena: filteredData[0].contraseña,
      documento: filteredData[0].documento,
      nombre: filteredData[0].nombre,
      email: filteredData[0].email,
      numeroTelefonico: filteredData[0].numeroTelefonico,
      rol: {
          idRol: filteredData[0].rol.idRol,
          nombre: filteredData[0].rol.nombre
      }
      // id: '5e86809283e28b96d2d38537',
      // avatar: '/assets/avatars/avatar-anika-visser.png',
      // name: 'Mitchell Arévalo',
      // email: 'Admin@Opra.com'
    };

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
        skip,
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
