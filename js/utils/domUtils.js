'use strict';

export function toggleDetails(element) {
  element.classList.toggle('open');
}

export const setupPasswordToggle = (toggleSelector, inputSelector) => {
  const toggleButton = document.querySelector(toggleSelector);
  const passwordInput = document.querySelector(inputSelector);

  if (toggleButton && passwordInput) {
    toggleButton.addEventListener('click', () => {
      const type =
        passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      toggleButton.textContent = type === 'password' ? '👁️' : '🙈';
    });
  }
};
