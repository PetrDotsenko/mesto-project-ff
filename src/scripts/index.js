import "core-js/stable";
import "regenerator-runtime/runtime";

import { initialCards } from "./cards.js";
import { images } from "../utils/images.js";
import { createCard, deleteCard } from "./card.js";

// Инициализация аватара и логотипа
const avatar = document.querySelector(".profile__image");
avatar.style.backgroundImage = `url(${images["avatar.jpg"]})`;

const logo = document.querySelector(".header__logo");
logo.src = images["logo.svg"];

// Инициализация карточек
const placesList = document.querySelector(".places__list");

initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard);
  placesList.appendChild(card);
});

// Импорт стилей
import "../pages/index.css";
// Отрисовка карточек из массива initialCards
initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard);
  placesList.appendChild(card);
});

import "../pages/index.css";
import "./modal.js";
