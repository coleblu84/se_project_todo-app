class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._formEl = formEl;
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      showInputError(
        this._formEl,
        this._inputSelector,
        inputEl.validationMessage,
      );
    } else {
      hideInputError(this._formEl, this._inputSelector);
    }n
  }

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
