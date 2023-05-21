import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage, user } from "../index.js";
import { getPosts } from "../api.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export let posts = [];

export const fetchGetPosts = () => {

  getPosts()
  
  .then((responseData) => {

    posts = responseData.posts.map((post) => {

      return {

        imageProfile: post.user.imageUrl,
        name: post.user.name,
        imageUrl: post.imageUrl,
        likes: post.likes.length,
        date: post.createdAt,
        description: post.description,
        isLiked: false,
        idUser: post.user.id,
        idPost: post.id,

      };

    });

    console.log(posts)

    renderPostsPageComponent();


  })

};

export function renderPostsPageComponent() {

  
  const usersHtml = posts.map((user, index) => {

    return `<li class="post" data-index="${index}">
          <div class="post-header" data-user-id="${user.idUser}">
              <img src="${user.imageProfile}" class="post-header__user-image">
              <p class="post-header__user-name">${user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${user.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${user.idPost}" class="like-button">
              <img src="./assets/images/like-not-active.svg">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${user.likes}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${user.name}</span>
            ${user.description}
          </p>
          <p class="post-date">
            ${user.date}
          </p>
        </li>`
  }).join('');
  
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${usersHtml}
                </ul>
              </div>`;
  
  const appEl = document.getElementById('app')

  appEl.innerHTML = appHtml;

  renderHeaderComponent({

    element: document.querySelector(".header-container"),

  });

  for (let userEl of document.querySelectorAll(".post-header")) {

    userEl.addEventListener("click", () => {

      goToPage(USER_POSTS_PAGE, {

        userId: userEl.dataset.userId,

      }) 

      const userId = userEl.dataset.userId

      const userPosts = [];

      for (let i = 0; i < posts.length; i++) {

        if (posts[i].idUser == userId) {
          
          userPosts.push(posts[i]);

        }

      }

      const userPostHtml = userPosts.map((user, index) => {

        return `<li class="post" data-index="${index}">
              <div class="post-image-container">
                <img class="post-image" src="${user.imageUrl}">
              </div>
              <div class="post-likes">
                <button data-post-id="${user.idPost}" class="like-button">
                  <img src="./assets/images/like-not-active.svg">
                </button>
                <p class="post-likes-text">
                  Нравится: <strong>${user.likes}</strong>
                </p>
              </div>
              <p class="post-text">
                <span class="user-name">${user.name}</span>
                ${user.description}
              </p>
              <p class="post-date">
                ${user.date}
              </p>
            </li>`
      }).join('');

      const appHtml = `
          <div class="page-container">
            <div class="header-container"></div>
            <div class="post-header" data-user-id="${userPosts[0].idUser}">
                  <img src="${userPosts[0].imageProfile}" class="post-header__user-image user-post-image">
                  <h1 class="post-header__user-name">${userPosts[0].name}</h1>
              </div>
            <ul class="posts">
            ${userPostHtml}
            </ul>
          </div>`

      console.log(userPosts)
      appEl.innerHTML = appHtml;

      renderHeaderComponent({

        element: document.querySelector(".header-container"),
    
      });

      window.scrollTo(0, 0);

    });
  }
}
