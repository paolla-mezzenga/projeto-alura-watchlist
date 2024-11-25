import { deleteSerie } from './api.js';

// Função para configurar o evento de exclusão em cards
export const setupDeleteListeners = (cardContainer, renderCallback) => {
  cardContainer.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const id = event.target.getAttribute('data-id');
      await deleteSerie(id);
      renderCallback(); // Re-renderiza os cards após a exclusão
    }
  });
};
