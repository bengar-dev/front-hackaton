import { BACKEND_ROOT } from "./constants";

export const postLogin = (content, responseHandler) => {
  fetch(`${BACKEND_ROOT}/user/connection.php`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(content),
  })
  .then((response) => (response.json()))
  .then(answer => {
    const newAnswer = {
      ...answer,
      type: "login"
    }
    responseHandler(newAnswer)
  })
  .catch(error => {
    responseHandler("false")
  })
};

export const postRegister = (content, responseHandler) => {
  fetch(`${BACKEND_ROOT}/user/creation.php`, {
    method: "POST",
    headers: {
      "Accept": 'application/json',
  },
    body: JSON.stringify(content),
  })
  .then((response) => (response.json()))
  .then(answer => {
    const newAnswer = {
      ...answer,
      type: "register"
    }
    responseHandler(newAnswer)
  })
  .catch(error => {
    console.log(error)
    responseHandler("false")
  })
};

export const verifUsername = (content, responseHandler) => {
  fetch(`${BACKEND_ROOT}/user/check_login.php`, {
    method: "POST",
    headers: {
      "Accept": 'application/json',
  },
    body: JSON.stringify(content),
  })
  .then((response) => response.json())
  .then(answer => {
    const newAnswer = {
      input: answer,
      type: "verifUsername"
    }
    responseHandler(newAnswer)
  })
  .catch((error) => {
    responseHandler("false")
  })
}