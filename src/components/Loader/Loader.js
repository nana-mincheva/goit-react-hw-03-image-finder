import { Component } from "react";
import Loader from "react-loader-spinner";

export default class Spinner extends Component {
  render() {
    return (
      <div>
        <Loader type="Hearts" color="#00BFFF" height={80} width={80}
          // timeout={3000}
        />
      </div>
    );
  }
}
