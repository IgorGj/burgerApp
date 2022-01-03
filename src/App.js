import React, { useEffect, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import { connect } from "react-redux";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import * as actions from "./store/actions/index";

import Logout from "./containers/auth/Logout/Logout";
export * from "react-router";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});
const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});
const Auth = React.lazy(() => {
  return import("./containers/auth/Auth");
});

const App = (props) => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);
  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Route path="/auth" render={(props) => <Auth {...props} />}></Route>
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route
          path="/checkout"
          render={(props) => <Checkout {...props} />}
        ></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/orders" render={(props) => <Orders {...props} />}></Route>
        <Route path="/auth" render={(props) => <Auth {...props} />}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
