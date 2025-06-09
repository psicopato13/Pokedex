async function searchPokemon() {
  const input = document.getElementById('pokemonInput').value.toLowerCase();
  const card = document.getElementById('pokemonCard');

  if (!input) {
    card.innerHTML =`<p>Digite o nome ou número de um Pokémon!</p>`;
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    if (!response.ok) throw new Error('Pokémon não encontrado');

    const data = await response.json();
    const types = data.types.map(typeInfo => `<span class="type">${typeInfo.type.name}</span>`).join('');

  
    card.innerHTML = `
      <h2>${capitalize(data.name)} (#${data.id})</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <div class="pokemon-types">${types}</div>
    `;
  } catch (error) {
    card.innerHTML = `<p>Pokémon não encontrado!</p>`;
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}