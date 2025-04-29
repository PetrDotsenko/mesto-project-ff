/** Функция показа ошибки */
function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  // Выбираем сообщение: кастомное при несоответствии pattern, иначе стандартное validationMessage
  const message = inputElement.validity.patternMismatch
    ? inputElement.dataset.errorMessage
    : inputElement.validationMessage;
  errorElement.textContent = message;
  errorElement.classList.add(config.errorClass);
}

/** Функция скрытия ошибки */
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

/** Проверка валидности поля с использованием validity */
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
    return false;
  }
  hideInputError(formElement, inputElement, config);
  return true;
}

/** Проверка на наличие невалидных полей */
function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

/** Переключение состояния кнопки отправки */
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

/** Установка слушателей всем полям формы */
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Деактивируем кнопку при инициализации
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach(inputElement => {
    // Создаем элемент для ошибки, если отсутствует
    if (!formElement.querySelector(`.${inputElement.id}-error`)) {
      const errorEl = document.createElement('span');
      errorEl.classList.add(`${inputElement.id}-error`);
      formElement.insertBefore(errorEl, inputElement.nextSibling);
    }
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

/** Включение валидации всех форм */
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => setEventListeners(formElement, config));
}

/** Очистка ошибок и деактивация кнопки */
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => hideInputError(formElement, inputElement, config));
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

