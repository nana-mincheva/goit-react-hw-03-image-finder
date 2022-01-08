import PropTypes from "prop-types";
import "./Button.css";
export default function Button({ onLoadMoreClick }) {
  return (
    <button type="button" className="Button" onClick={onLoadMoreClick}>
      Load More
    </button>
  );
}

Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};
