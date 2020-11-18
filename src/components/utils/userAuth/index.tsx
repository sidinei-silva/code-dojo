import React from 'react';

import withAuth from '../withAuth';

const UserAuth: React.FC = props => {
  const { children } = props;
  return <>{children}</>;
};

export default withAuth(UserAuth);
