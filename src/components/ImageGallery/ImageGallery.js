import { Component } from "react";
import "./ImageGallery.css";
import ImageGalleryItem from "../ImageGalleryItem";
import PropTypes from "prop-types";

export default class ImageGallery extends Component {
  handleOpenModal = (e) => {
    if (e.target !== e.currentTarget) {
      this.props.onClick();
    }
  };

  render() {
    const { images, onItemClick } = this.props;
    return (
      <ul className="ImageGallery" onClick={this.handleOpenModal}>
        {images &&
          images.map((image) => (
            <li key={image.id} className="ImageGalleryItem">
              <ImageGalleryItem {...image} onItemClick={onItemClick} />
            </li>
          ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};
