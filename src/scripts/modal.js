export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
  popup.addEventListener("click", handleOverlayClick);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
  popup.removeEventListener("click", handleOverlayClick);
}

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
