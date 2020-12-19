import React from "react";
import { HashRouter, Route } from "react-router-dom";
//import required components
import CreateCar from "./CreateCar";
import EditCar from "./EditCar";
import CartList from "./CarList";

// this is the "main" component which sets up the React Router and respective routes
const App = () => {
  return (
    <HashRouter>
      <div>
        {/*SERVERSIDE: Link the routes to components*/}
        <Route exact path='/' component={CartList} />
        {/*pass the id through the EditCar component*/}
        <Route path='/edit-car/:id' component={EditCar} />
        {/*set the path to create a new car to CreateCar component*/}
        <Route path='/create-car' component={CreateCar} />
      </div>
    </HashRouter>
  );
};

export default App;
