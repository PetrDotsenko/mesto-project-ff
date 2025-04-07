// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(cardData, deleteCallback) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  deleteButton.addEventListener("click", () => deleteCallback(cardElement));

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Отрисовка карточек из массива initialCards
initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard);
  placesList.appendChild(card);
});

import './pages/index.css';