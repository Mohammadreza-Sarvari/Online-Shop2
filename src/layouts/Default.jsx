import { Footer, Header, ProtectedRoute, Sidebar } from "../components";
import React from "react";
import { Route, Switch } from "react-router-dom";
import AppRoutes from "../routes";

const DefaultLayout = (props) => {
  return (
    <div
      id="main-wrapper"
      data-layout="vertical"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
      data-boxed-layout="full"
    >
      <Header />
      <Sidebar {...props} routes={AppRoutes} />
      <div className="page-wrapper d-block">
        <div className="page-content container-fluid">
          <Switch>
            {AppRoutes.map((comp, index) => {
              if (comp.private) {
                return (<ProtectedRoute path={comp.path} component={comp.component} key={index}/>);
              } else {
                return (<Route path={comp.path} component={comp.component} key={index} />)
              }
            })}
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
