import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
        <div class="page-container">
          <div class="header-container"></div>
          <div class="form form-post">
          <h1 class="form-title">Добавить пост</h1>
          <div class="form-inputs">
            <div class="upload-image-container"></div>
            <div>
              <h4>Опишите фотографию:</h4>
              <textarea class="input textarea" rows="10"></textarea>
              <br/><br/>
              <button class="button post-button" id="add-button">Добавить</button>
            </div>
          </div>
        </div>
        </div>
      `;


    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: document.querySelector(".upload-image-container")
    });

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });
  };

  render();
}
