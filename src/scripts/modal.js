import { createCard, deleteCard } from "./card.js";

// Общие функции для работы с попапами
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closePopup(openedPopup);
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function openPopup(popup) {
  popup.style.opacity = "0";
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
  popup.addEventListener("click", handleOverlayClick);

  requestAnimationFrame(() => {
    popup.style.opacity = "1";
  });
}

function closePopup(popup) {
  popup.style.opacity = "0";

  setTimeout(() => {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscape);
    popup.removeEventListener("click", handleOverlayClick);
  }, 300);
}

// Закрытие попапов по крестику
document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

// Редактирование профиля
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editForm = document.forms["edit-profile"];
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editPopup);
});

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
}

editForm.addEventListener("submit", handleProfileSubmit);

// Добавление новых карточек
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = document.forms["new-place"];
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");

addButton.addEventListener("click", () => {
  newCardForm.reset();
  openPopup(newCardPopup);
});

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const card = createCard(newCardData, deleteCard);
  placesList.prepend(card);

  closePopup(newCardPopup);
}

newCardForm.addEventListener("submit", handleNewCardSubmit);

// Просмотр изображений
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__image")) {
    const imagePopup = document.querySelector(".popup_type_image");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");

    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(imagePopup);
  }
});
