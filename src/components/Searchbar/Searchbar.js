import "./Searchbar.css";
import { Component } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";
import "react-toastify/dist/ReactToastify.css";

export default class Searchbar extends Component {
  state = { searchQuery: "" };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === "") {
      toast("Please enter search query");
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
  };

  handleQueryChange = (e) => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button
            type="button"
            className="SearchForm-button"
            onClick={this.handleSubmit}
          >
            <ImSearch />
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
