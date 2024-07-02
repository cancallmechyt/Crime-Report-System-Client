import Menu from './Menus.jsx'
import PropTypes from 'prop-types'; 

const Layout = ({ children }) => {
  return (
    <>
        <Menu />    {/* Include Menu component */}
            {children}  {/* Render children components */}
    </>
  );
};

// Add propTypes for children to ensure correct props validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;