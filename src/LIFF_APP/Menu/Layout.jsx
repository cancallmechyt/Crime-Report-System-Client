import Navbar from "./Navbar";
import Footer from "./Footer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

// Add propTypes for children to ensure correct props validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;