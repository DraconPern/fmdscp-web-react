import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DestinationListItem from './item';
import axios from 'axios';

const DestinationList = (props) => {
  return (
    <div>
      <h2>Destinations</h2>
      {
        props.destinations ?
          props.destinations.map(destination => (
            <DestinationListItem
              {...destination}
              key={destination.id}
              onDelete={() => props.handleDeleteDestination(destination.id)}
            />
          )) : <div>Empty</div>
      }
    </div>
  );
};

DestinationList.propTypes = {
  destinations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    destinationhost: PropTypes.string.isRequired,
    destinationport: PropTypes.string.isRequired,
    destinationAE: PropTypes.string.isRequired,
    sourceAE: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteDestination: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  console.log('mapStateToProps');
  console.log(state.destination);
  return {
    destinations: state.destination.destinations,
    newDestination: state.destination.newDestination
  };
}

export function fetchDestinationData() {
  console.log('fetchDestinations');
  return axios.get('/api/destinations')
  .then(res => res.data);
}

export default connect(mapStateToProps)(DestinationList);
