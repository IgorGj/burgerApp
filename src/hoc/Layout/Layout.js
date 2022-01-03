import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../Auxilary/Auxilary";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDraweIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDraweIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDraweIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      ></Toolbar>
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      ></SideDrawer>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className="Content">{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
