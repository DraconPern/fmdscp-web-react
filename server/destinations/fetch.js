import fetch from 'isomorphic-fetch';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getDestinations(req, res) {
  fetch('http://localhost:8080/api/destinations')
  .then(response => {
    if (!response.ok) {
      res.status(500).send('API call returned failure');
    }
    return response.json();
  })
  .then(json => {
    res.json(json.destinations);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send('Unable to contact backend');
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addDestination(req, res) {

}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getDestination(req, res) {
  fetch('http://localhost:8080/api/destinations/' + req.params.id)
  .then(response => {
    if (!response.ok) {
      res.status(500).send('API call returned failure');
    }
    return response.json();
  })
  .then(json => {
    res.json(json);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send('Unable to contact backend');
  });
}


/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function updateDestination(req, res) {
  fetch('http://localhost:8080/api/destinations/' + req.params.id, {
    method: 'POST',
    body: JSON.stringify(req.body),
  })
  .then(response => {
    if (!response.ok) {
      res.status(500).send('API call returned failure');
    }
    return response.json();
  })
  .then(json => {
    res.json(json);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send('Unable to contact backend');
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteDestination(req, res) {
  fetch('http://localhost:8080/api/destinations/' + req.params.id + '/delete', { method: 'POST' })
  .then(response => {
    if (!response.ok) {
      res.status(500).send('API call returned failure');
    }
    return response.json();
  })
  .then(json => {
    res.json(json);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send('Unable to contact backend');
  });
}
