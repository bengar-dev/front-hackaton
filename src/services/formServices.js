import { BACKEND_ROOT } from "./constants";

export const postLogin = (content, responseHandler) => {
  fetch(`${BACKEND_ROOT}/user/connection.php`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(content),
  })
  .then((response) => (response.json()))
  .then(answer => {
    const userInfo = {
      id: answer["3"],
      username: answer["0"],
      email: answer["1"],
      type: "login"
    }
    responseHandler(userInfo)
  })
  .catch(error => {
    const newError = {
      type: "errRegister"
    }
    responseHandler(newError)
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
    const newError = {
      type: "errRegister"
    }
    responseHandler(newError)
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
    const newError = {
      type: "errVerifUsername"
    }
    responseHandler(newError)
  })
}

export const forgotPassword = (content) => {
  fetch(`${BACKEND_ROOT}/user/resetpassword.php`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
    },
    body: JSON.stringify(content)
  })
    .then((response) => response.json())
    .then(answer => {
      console.log(answer)
    })
    .catch(error => {
      console.log(error)
    })
}

export const searchProduct = (content) => {
  return fetch(`${BACKEND_ROOT}/api/research.php`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
    },
    body: JSON.stringify(content)
  })
  .then((response) => response.json())
  .then(answer => {
    return JSON.parse(answer)
  })
  .catch((error) => {
    return false
  })
}