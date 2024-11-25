const API_URL = 'http://localhost:3000/series';

// Requisição GET: Buscar todas as séries
export const fetchSeries = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao buscar séries');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Requisição POST: Criar uma nova série
export const createSerie = async (data) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar série');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Requisição DELETE: Excluir uma série por ID
export const deleteSerie = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erro ao excluir série');
  } catch (error) {
    console.error(error);
  }
};
