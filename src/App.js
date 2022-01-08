import React, { Component } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Modal from "./components/Modal";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import { fetchImages, PER_PAGE } from "./services/fetchApi";
import Spinner from "./components/Loader";

class App extends Component {
  state = {
    showModal: false,
    modalContent: "",
    searchQuery: "",
    status: "idle",
    output: [],
    page: 1,
    error: null,
    hideLoadMoreBtn: false,
  };

  componentDidUpdate(prevProps, { searchQuery, page }) {
    if (searchQuery !== this.state.searchQuery) {
      this.setState({ status: "pending" });
    }
    if (searchQuery !== this.state.searchQuery || page !== this.state.page) {
      this.getImages();
    }
    this.handleScroll();
  }

  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  toggleLoadMoreBtn = () => {
    this.setState(({ hideLoadMoreBtn }) => ({
      hideLoadMoreBtn: !hideLoadMoreBtn,
    }));
  };

  getImages = () => {
    const { searchQuery, page } = this.state;
    fetchImages(searchQuery, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          this.setState({ status: "rejected" });
          return;
        }
        if (hits.length < PER_PAGE) {
          this.toggleLoadMoreBtn();
        }
        this.setState(({ output }) => {
          return {
            output: [...output, ...hits],
            status: "resolved",
          };
        });
      })
      .catch((error) => this.setState({ error, status: "rejected" }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  modalContentShow = (itemId) => {
    const { output } = this.state;
    const element = output.find(({ id }) => id === itemId);
    this.setState({ modalContent: element.largeImageURL });
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery, page: 1, output: [], hideLoadMoreBtn: false });
  };

  handleLoadMoreBtnClick = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  modalContentShow = (itemId) => {
    const { output } = this.state;
    const element = output.find(({ id }) => id === itemId);
    this.setState({ modalContent: element.largeImageURL });
  };

  render() {
    const { showModal, output, modalContent, status, hideLoadMoreBtn } =
      this.state;
    const showBtn =
      output.length > 0 && status !== "rejected" && !hideLoadMoreBtn;

    let result = null;
    if (status === "idle") {
      result = (
        <div className="TextBlock">
          <h2>Enter search query</h2>
        </div>
      );
    }

    if (status === "pending") {
      result = (
        <div className="Wrapper">
          <Spinner />
        </div>
      );
    }

    if (status === "rejected") {
      result = (
        <div className="TextBlock">
          <h2>Nothing was found on your query. Please try again</h2>
        </div>
      );
    }

    if (status === "resolved") {
      result = (
        <ImageGallery
          images={output}
          onClick={this.toggleModal}
          onItemClick={this.modalContentShow}
        />
      );
    }

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {result}
        {showBtn && (
          <div className="Wrapper">
            <Button onLoadMoreClick={this.handleLoadMoreBtnClick} />
          </div>
        )}
        {showModal && (
          <Modal content={modalContent} onClose={this.toggleModal} />
        )}
        <ToastContainer autoClose={3000} position="top-center" />
      </div>
    );
  }
}

export default App;
