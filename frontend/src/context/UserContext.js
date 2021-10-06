import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useToastMessage } from './ToastContext';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const agent = useUserProvider();
  return <UserContext.Provider value={agent}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

const useUserProvider = () => {

  const [user, setUser] = useState( null )
  const { toastMessage, showToastMessage } = useToastMessage()

    const { mutate: loginUser, isLoading: loginLoading, error: loginError } = useMutation(
      formData => {
        return axios.post('http://localhost:3000/users/login', formData);
      },
      {
        onSuccess: res => {
          if (res.data?.user?.id) {
            setUser( res.data.user )
            showToastMessage({
              type: 'success',
              message: 'Login Successful!',
            });
          } else {
            throw new Error('No user came back with that email and password combination. Please try again.');
          }
        },
      }
  );

  const logoutUser = () => {
    showToastMessage({
      type: 'success',
      message: 'Successfully Logged out!',
    });
    setUser( null )
  }

    const {
      mutate: createUser,
      isLoading: createUserLoading,
      error: createUserError,
    } = useMutation(
      formData => {
        return axios.post('http://localhost:3000/users', formData);
      },
      {
          onSuccess: res => {
              console.log('res: ', res)
          if (res.data?.user?.id) {
            setUser( res.data.user );
            showToastMessage({
              type: 'success',
              message: 'User Created!',
            });
          } else {
            throw new Error(
              'Something went wrong, please try again.'
            );
          }
        },
      }
    );

  return {
      loginUser,
      loginLoading,
      loginError,
      logoutUser,
      user,
      createUser,
      createUserLoading,
      createUserError
  };
};
