
class ApiAuth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status} ${res.statusText}`);
  }

  signup(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then(this._checkResponse);
  }
  signin(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then(this._checkResponse);
  }

  getUsersMe(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
}
const apiAuth = new ApiAuth({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiAuth;
