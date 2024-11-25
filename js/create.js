import { createSerie } from './api.js';
import { fetchSeries } from './api.js';

const form = document.getElementById('form-serie');
const cardContainer = document.getElementById('cards-container'); // Contêiner onde os cards serão exibidos

// Função para criar cards dinamicamente
const renderSeries = async () => {
  try {
    const series = await fetchSeries();
    cardContainer.innerHTML = ''; // Limpa os cards antes de renderizar
    series.forEach((serie) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${serie.cover}" alt="Capa da série">
        <h3>${serie.name}</h3>
        <p>Temporadas: ${serie.seasons}</p>
        <p>Gênero: ${serie.genre}</p>
        <button class="delete-btn" data-id="${serie.id}">Excluir</button>
      `;
      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao renderizar as séries:', error);
  }
};

// Listener do formulário para capturar os dados e enviar ao servidor
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita o comportamento padrão de recarregar a página

  const name = document.getElementById('nome-serie').value;
  const seasons = document.getElementById('num-temporadas').value;
  const genre = document.getElementById('genero').value;
  const coverFile = document.getElementById('capa-serie').files[0];

  if (!name || !seasons || !genre || !coverFile) {
    alert('Por favor, preencha todos os campos do formulário!');
    return;
  }

  const coverURL = URL.createObjectURL(coverFile); // Gera uma URL local para exibição da imagem

  const newSerie = {
    name,
    seasons: parseInt(seasons),
    genre,
    cover: coverURL,
  };

  try {
    await createSerie(newSerie); // Envia os dados para o servidor fake
    form.reset(); // Limpa os campos do formulário
    renderSeries(); // Atualiza os cards com a nova série adicionada
  } catch (error) {
    console.error('Erro ao adicionar nova série:', error);
  }
});

// Renderiza as séries ao carregar a página
renderSeries();
