import Menu from "./Menus.jsx";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
