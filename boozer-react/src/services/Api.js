const API_ROOT = "http://localhost:3000/api/v1/";
const headers = {
  accept: "application/json",
  "content-type": "application/json"
};

const getCocktails = () => {
  return fetch(`${API_ROOT}/cocktails/`, { headers: headers }).then(res =>
    res.json()
  );
};

const getCocktailDetails = id => {
  return fetch(`${API_ROOT}cocktails/${id}`, { headers: headers }).then(res =>
    res.json()
  );
};

const addCocktail = data => {
  return fetch(`${API_ROOT}cocktails/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const deleteCocktail = id => {
  return fetch(`${API_ROOT}cocktails/${id}`, {
    method: "DELETE",
    headers: headers
  }).then(res => res.json());
};

const getProportions = () => {
  return fetch(`${API_ROOT}proportions/`, { headers: headers }).then(res =>
    res.json()
  );
};

const addRating = data => {
  return fetch(`${API_ROOT}ratings/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const addComment = data => {
  return fetch(`${API_ROOT}comments/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

export default {
  cocktails: { getCocktails },
  cocktailDetail: { getCocktailDetails },
  addCocktail: { addCocktail },
  deleteCocktail: { deleteCocktail },
  proportions: { getProportions },
  rating: { addRating },
  comment: { addComment }
};
