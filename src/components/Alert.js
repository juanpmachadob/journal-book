import PropTypes from "prop-types";
const Alert = ({ type, description }) => {
  return (
    <div className={`alert alert__${type}`}>
      <p class="alert__title">{type}</p>
      <p class="alert__description">{description}</p>
    </div>
  );
};
Alert.propTypes = {
  type: PropTypes.string,
  description: PropTypes.string,
};
export default Alert;
