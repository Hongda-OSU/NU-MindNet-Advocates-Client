import React from 'react';
import Header from './Header';

const Layout = props => {
  console.log('Layout children:', props.children);
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
