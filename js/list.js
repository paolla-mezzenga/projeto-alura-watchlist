import { fetchSeries } from './api.js';
import { setupDeleteListeners } from './delete.js';

const cardContainer = document.getElementById('cards-container');
const emptyMessage = document.getElementById('empty-message'); // Referência à mensagem

// Função para criar um card dinamicamente
const createCard = (serie) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${serie.cover}" alt="Capa da série">
    <h3>${serie.name}</h3>
    <p>Temporadas: ${serie.seasons}</p>
    <p>Gênero: ${serie.genre}</p>
    <button class="delete-btn" data-id="${serie.id}">Excluir</button>
  `;
  return card;
};

// Função para listar séries
const renderSeries = async () => {
  const series = await fetchSeries();
  console.log(series); // Verifique no console se o retorno é realmente vazio quando não há séries

  cardContainer.innerHTML = ''; // Limpa o contêiner antes de renderizar

  // Se não houver séries, exibe a mensagem e esconde os cards
  if (series.length === 0) {
    emptyMessage.style.display = 'block'; // Exibe a mensagem
  } else {
    emptyMessage.style.display = 'none'; // Esconde a mensagem
    // Se houver séries, renderiza os cards
    series.forEach((serie) => {
      const card = createCard(serie);
      cardContainer.appendChild(card);
    });
  }
};

// Configurar listeners de exclusão
setupDeleteListeners(cardContainer, renderSeries);

// Inicializa a lista de séries
renderSeries();
