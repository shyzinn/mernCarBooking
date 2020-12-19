import React from "react";
import ReactDOM from "react-dom";
//import the Link component to use for linking prop information
import { Link } from "react-router-dom";

// define one single car row component
class Car extends React.Component {
  render() {
    return (
      <tr key={this.props.key}>
        <td>{this.props.name}</td>
        <td>{this.props.model}</td>
        <td>{this.props.chasis_number}</td>
        <td>{this.props.price}</td>
        <td>{this.props.avaialable ? "Avaialable" : "Not Avaialable"}</td>
        <td>
          <button
            className='btn btn-danger'
            onClick={() => {
              this.props.handleDelete(this.props.id);
            }}
          >
            Delete
          </button>{" "}
          <Link className='btn btn-warning' to={`/edit-car/${this.props.id}`}>
            Edit
          </Link>{" "}
        </td>
      </tr>
    );
  }
}

export default Car;
