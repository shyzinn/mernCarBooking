import React, { Component } from "react";
import { Link } from "react-router-dom";
//Axios is a lightweight HTTP client based on the $http service within Angular.js
//Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from "axios";

//Create car component that will create a new car card
class EditCar extends Component {
  constructor(props) {
    super(props);
    // the form fields are stored in a state
    this.state = {
      name: "",
      model: "",
      chasis_number: "",
      price: 0,
      avaialable: false,
    };

    //this binding is necessary to make `this` work in the callback
    //generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAvailable = this.handleAvailable.bind(this);
  }

  //once the input boxes are changed, update the state to match the value
  handleChange(event) {
    //name of the input boxes must match the property names in the state
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  }

  componentDidMount() {
    // get the cars API and include the id which is passed via the URL and accessed via props
    axios
      .get("/api/cars/" + this.props.match.params.id)
      .then((response) => {
        //on resonse set the state values to match empty state values set in the constructor
        this.setState({
          _id: response.data._id,
          name: response.data.name,
          model: response.data.model,
          chasis_number: response.data.chasis_number,
          price: response.data.price,
          avaialable: response.data.avaialable,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleAvailable = (e) => {
    this.setState({
      avaialable: !this.state.avaialable,
    });
  };
  handleSubmit(event) {
    //preventDefault() is called on the event when it occurs to prevent a browser reload/refresh
    event.preventDefault();

    //use axios to send a POST request to the server which includes the state information for the new car to be created
    console.log("add data", this.state);

    axios
      .put("/api/cars", this.state)
      //on success go to home
      .then((res) => this.props.history.push("/"))
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // remember that the name of the input fields should match the state
    return (
      <div className='container-fluid'>
        {/*on form submit call handleSubmit()*/}
        <div className='row'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <form onSubmit={this.handleSubmit}>
              <h2 className='text-center '>Create New Car</h2>
              <hr />
              {/*main container for input fields*/}
              <div className='container'>
                {/*FIRST COLUMN*/}
                <div className='row'>
                  <div className='col-md-6'>
                    <div class='form-group'>
                      <label>Name</label>
                      <input
                        type='text'
                        class='form-control'
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div class='form-group'>
                      <label>Model</label>
                      <input
                        type='text'
                        class='form-control'
                        name='model'
                        value={this.state.model}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div class='form-group'>
                      <label>Chasis Number</label>
                      <input
                        type='text'
                        name='chasis_number'
                        value={this.state.chasis_number}
                        onChange={this.handleChange}
                        class='form-control'
                      />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div class='form-group'>
                      <label>Price</label>
                      <input
                        type='number'
                        value={this.state.price}
                        onChange={this.handleChange}
                        class='form-control'
                        name='price'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div class='form-group'>
                      <input
                        type='checkbox'
                        name='avaialable'
                        checked={this.state.avaialable}
                        value='true'
                        onClick={this.handleAvailable}
                      />{" "}
                      &nbsp;&nbsp; Availability{" "}
                    </div>
                  </div>
                </div>

                <input
                  className='btn btn-primary'
                  type='submit'
                  value='Submit'
                />
              </div>
            </form>
          </div>
          <div className='col-md-2'></div>
        </div>
      </div>
    );
  }
}

export default EditCar;
