// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
import { getToken } from "./index.js";

const personalKey = "veronika";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts() {
  return fetch(postsHost, {
    method: "GET",
    headers: {

      Authorization: getToken()
      
    }
  })
    .then((response) => {
      return response.json();
    })
    
}

export function addPost({ description, imageUrl }) {
  
  return fetch(postsHost, {

    method: "POST",
    body: JSON.stringify({

      description,
      imageUrl,

    }),
    headers: {

      Authorization: getToken(),

    },

  }).then((response) => {
  
    return response.json();

  });
}

export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

export function likePostActive({ id }) {


  return fetch(postsHost + '/' + id +  "/like", {

    method: "POST",
    headers: {

      Authorization: getToken(),

    },

  })
  .then((response) => {

    return response.json();

  })

}

export function likePostDislike({ id }) {


  return fetch(postsHost + '/' + id +  "/dislike", {

    method: "POST",
    headers: {

      Authorization: getToken(),

    },

  })
  .then((response) => {

    return response.json();

  })

}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}
