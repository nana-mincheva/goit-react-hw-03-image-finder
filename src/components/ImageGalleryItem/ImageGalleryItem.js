import { Component } from "react";
import PropTypes from "prop-types";
import "./ImageGalleryItem.css";

export default class ImageGalleryItem extends Component {
  modalContent = (id) => {
    this.props.onItemClick(id);
  };

  render() {
    const { id, webformatURL, tags } = this.props;

    return (
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={() => this.modalContent(id)}
      />
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};
