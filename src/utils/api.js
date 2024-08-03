class Api {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }
  getInitialCards() {
    //la promesa se tiene que cumplir o no
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token,
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
 
  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: {
        authorization: this.token
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }).then((data) => {
      return data;
    }).catch((err) => console.log(err));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.token
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }).then((data) => {
      return data;
    });
  }

  setUserInfo(userInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }).then(result =>{
      return result;
    }).catch((err) => console.log(err));
  }
 
  setUserAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: avatar
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }return Promise.reject(`Error: ${res.status}`);
    }).then((data) => {
      return data;
    }).catch((error) => {
      return error;
    });
  }
  addCard(cardData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cardData)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }).then((data) => {
      return data;
    }).catch((error) => {
      return error;
    });
  }
}

const api = new Api(
  'https://around.nomoreparties.co/v1/web_es_11',
  '1e0b59e5-c96f-4c07-9a56-66e25879441b'
);

export default api;