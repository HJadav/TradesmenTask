const BASE_URL = "http://3.7.81.243/projects/plie-api/public/api/";

const Api = (endpoint, data) => {
  const url = BASE_URL + endpoint;
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .catch(error => {
      console.error('There was an error!', error);
      throw error;
    });
};

export {Api};
