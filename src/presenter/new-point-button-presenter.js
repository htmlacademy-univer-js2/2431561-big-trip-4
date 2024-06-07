import NewPointButtonView from '../view/new-point-button-view';
import { render } from '../framework/render';

export default class NewPointButtonPresenter {
  #container = null;
  #button = null;
  #handleButtonClick = null;

  constructor({ container }) {
    this.#container = container;
  }

  init({ onClick }) {
    this.#handleButtonClick = onClick;
    this.#button = new NewPointButtonView({ onClick: this.#buttonClickHandler });
    render(this.#button, this.#container);
  }

  #buttonClickHandler = () => {
    const disabledButton = document.querySelector('.event__reset-btn[disabled]');
    if (!disabledButton) {
      this.#handleButtonClick();
    }
  };

  disableButton() {
    this.#button.setDisabled(true);
  }

  enableButton() {
    this.#button.setDisabled(false);
  }
}
