
class ApiAuth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status} ${res.statusText}`);
  }

  signup() {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._checkResponse);
  }
  signin() {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._checkResponse);
  }

  getUsersMe(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}
const apiAuth = new ApiAuth({
  baseUrl: "http://api.mesto.pr15.nomoredomainsrocks.ru",
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiAuth;
