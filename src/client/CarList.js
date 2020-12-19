import React, { Component } from "react";
//import the Link component to handle React Router
import { Link } from "react-router-dom";
import Car from "./Car";
//Axios is a lightweight HTTP client based on the $http service within Angular.js
//Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from "axios";
import "./app.css";
// import stylesheet
//MAKE SURE TO INSTALL USING npm install bulma

// this component will handle all elements in the cars array
class CarsList extends Component {
  constructor(props) {
    super(props);
    // store the cars array in the state
    this.state = { cars: [] };

    //this binding is necessary to make `this` work in the callback
    //generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
    this.updateCars = this.updateCars.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // fetch all cars data from the server when the component mounts
  componentDidMount() {
    this.updateCars();
  }

  //
  updateCars() {
    // get the cars API using axios GET request to the server
    axios
      .get("api/cars")
      .then((response) => {
        //store the response in the state
        console.log(response.data);
        this.setState({ cars: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete(carId) {
    // make a DELETE request to the server which will handle the removal of the user with the specific userId
    axios
      .delete("api/cars", {
        data: {
          id: carId,
        },
      })
      .then((response) => {
        //if the deletion was successful then re-render the list of cars
        this.updateCars();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // produce a User component for each user object
    const carlist = this.state.cars.map((u) => (
      //map through each element in the array and set to the value received from the server

      <Car
        key={u._id}
        id={u._id}
        name={u.name}
        model={u.model}
        price={u.price}
        chasis_number={u.chasis_number}
        available={u.available}
        //you must include the handleDelete method to use in child components
        handleDelete={this.handleDelete}
      />
    ));

    //return the list of cars
    return (
      <div className='is-fluid'>
        {/*Navigation bar*/}
        <nav className='navbar'>
          <h1 className='navbar-item title is-1 has-text-primary'>
            List of Cars
          </h1>
          {/*when this button is pressed, CreateUser component will be rendered by using React Router*/}
          <Link to={"/create-car"} className='navbar-item navbar-end'>
            <button className='btn btn-primary' type='button'>
              Create new Car
            </button>
          </Link>
        </nav>
        <hr />

        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
              <table class='table table-bordered table-striped'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Model</th>
                    <th scope='col'>Chasis Number</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Availability </th>
                    <th scope='col'>Action </th>
                  </tr>
                </thead>
                <tbody>{carlist}</tbody>
              </table>
            </div>
            <div className='col-md-3'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default CarsList;
