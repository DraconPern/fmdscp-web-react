import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function DestinationListItem(props) {
  return (
    <div>
      <h3>
        <Link to={`/destinations/${props.id}`} >
          {props.name}
        </Link>
      </h3>
      <p>{props.name}</p>
      <p>{props.destinationhost}</p>
      <p>{props.destinationport}</p>
      <p>{props.destinationAE}</p>
      <p>{props.sourceAE}</p>
      <hr />
    </div>
  );
}

DestinationListItem.propTypes = {
  name: PropTypes.string.isRequired,
  destinationhost: PropTypes.string.isRequired,
  destinationport: PropTypes.string.isRequired,
  destinationAE: PropTypes.string.isRequired,
  sourceAE: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DestinationListItem;
