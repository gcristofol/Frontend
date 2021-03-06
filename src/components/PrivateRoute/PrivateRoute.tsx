import * as React from 'react';
import { useAuth } from 'gatsby-theme-firebase';
import { Spinner } from '@chakra-ui/core';

interface PrivateRouteProps {
  path: string;
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isLoading, isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
