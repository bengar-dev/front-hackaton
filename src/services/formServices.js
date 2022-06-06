import { BACKEND_ROOT } from "./constants";

export const postLogin = (content, responseHandler) => {
  fetch(`${BACKEND_ROOT}/user/connection.php`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(content),
  })
  .then((response) => (response.json()))
  .then(answer => {
    responseHandler(answer)
  })
};

export const postRegister = (content, responseHandler) => {
  fetch(`${BACKEND_ROOT}/user/crezaeazeation.php`, {
    method: "POST",
    headers: {
      "Accept": 'application/json',
  },
    body: JSON.stringify(content),
  })
  .then((response) => (response.json()))
  .then(answer => {
    responseHandler(answer)
  })
  .catch((error) => {
    responseHandler("error")
  })
};
