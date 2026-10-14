(() => {
  "use strict";

  const API_BASE = "https://pokeapi.co/api/v2/pokemon/";
  const STORAGE_KEY = "neto-pokedex-demo-favorites-v1";
  const TYPE_COLORS = {
    normal: "#b7b2a7", fire: "#ff906d", water: "#78b8ff", electric: "#f7d85a",
    grass: "#83d49b", ice: "#9ce5e7", fighting: "#ed8e9a", poison: "#cf9aff",
    ground: "#d7b17f", flying: "#b9b4ff", psychic: "#ff9ad2", bug: "#b8d66e",
    rock: "#cabf8a", ghost: "#a49adf", dragon: "#8d9cff", dark: "#a49aa8",
    steel: "#9fc6d7", fairy: "#f4aeda"
  };
  const $ = (selector) => document.querySelector(selector);
  const form = $("#searchForm");
  const input = $("#searchInput");
  const searchButton = $("#searchButton");
  const feedback = $("#feedback");
  const card = $("#pokemonCard");
  const image = $("#pokemonImage");
  const fallback = $("#imageFallback");
  const nameNode = $("#pokemonName");
  const numberNode = $("#pokemonNumber");
  const numberGhost = $("#pokemonNumberGhost");
  const speciesNode = $("#pokemonSpecies");
  const typesNode = $("#pokemonTypes");
  const statsNode = $("#pokemonStats");
  const favoriteButton = $("#favoriteButton");
  const favoritesList = $("#favoritesList");
  const favoriteCount = $("#favoriteCount");
  const previousButton = $("#previousButton");
  const nextButton = $("#nextButton");

  let currentPokemon = null;
  let requestNumber = 0;

  function getFavorites() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(saved) ? saved.filter((item) => item && Number.isInteger(Number(item.id))) : [];
    } catch (error) {
      return [];
    }
  }

  function saveFavorites(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function titleCase(value) {
    return String(value || "").replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function setFeedback(message, kind = "") {
    feedback.textContent = message;
    feedback.className = `feedback${kind ? ` ${kind}` : ""}`;
  }

  function currentIsFavorite() {
    return !!currentPokemon && getFavorites().some((item) => Number(item.id) === currentPokemon.id);
  }

  function updateFavoriteButton() {
    const saved = currentIsFavorite();
    favoriteButton.classList.toggle("is-favorite", saved);
    favoriteButton.setAttribute("aria-pressed", String(saved));
    favoriteButton.innerHTML = saved
      ? '★ <span>Remover dos favoritos</span>'
      : '☆ <span>Adicionar aos favoritos</span>';
  }

  function renderFavorites() {
    const favorites = getFavorites();
    favoriteCount.textContent = `${favorites.length} ${favorites.length === 1 ? "SALVO" : "SALVOS"}`;
    favoritesList.replaceChildren();

    if (favorites.length === 0) {
      const empty = document.createElement("span");
      empty.className = "empty-favorites";
      empty.textContent = "Sua coleção está vazia. Use ☆ para guardar um Pokémon.";
      favoritesList.appendChild(empty);
      return;
    }

    favorites.forEach((pokemon) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "favorite-chip";
      button.title = `Pesquisar ${titleCase(pokemon.name)}`;
      const thumb = document.createElement("img");
      thumb.loading = "lazy";
      thumb.alt = "";
      thumb.src = pokemon.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
      const label = document.createElement("span");
      label.textContent = `#${String(pokemon.id).padStart(3, "0")} ${titleCase(pokemon.name)}`;
      button.append(thumb, label);
      button.addEventListener("click", () => loadPokemon(String(pokemon.id)));
      favoritesList.appendChild(button);
    });
  }

  function renderStats(pokemon) {
    const wantedStats = [
      { api: "hp", label: "HP" },
      { api: "attack", label: "ATK" },
      { api: "defense", label: "DEF" }
    ];
    statsNode.replaceChildren();
    wantedStats.forEach(({ api, label }) => {
      const stat = pokemon.stats.find((item) => item.stat.name === api);
      const value = stat ? stat.base_stat : 0;
      const row = document.createElement("div");
      row.className = "stat-row";
      const name = document.createElement("span");
      name.textContent = label;
      const track = document.createElement("div");
      track.className = "stat-track";
      const bar = document.createElement("i");
      bar.style.width = `${Math.min(100, (value / 180) * 100)}%`;
      track.appendChild(bar);
      const number = document.createElement("b");
      number.textContent = String(value);
      row.append(name, track, number);
      statsNode.appendChild(row);
    });
  }

  function renderPokemon(pokemon) {
    currentPokemon = pokemon;
    const idText = String(pokemon.id).padStart(4, "0");
    const displayName = titleCase(pokemon.name);
    const primaryType = pokemon.types[0]?.type?.name || "normal";
    const typeColor = TYPE_COLORS[primaryType] || "#a78bfa";

    card.style.setProperty("--type-color", typeColor);
    nameNode.textContent = displayName;
    numberNode.textContent = `POKÉMON Nº ${idText}`;
    numberGhost.textContent = String(pokemon.id).padStart(3, "0");
    speciesNode.textContent = pokemon.types.map((item) => item.type.name.toUpperCase()).join(" / ") + " TYPE";
    $("#pokemonFlavor").textContent = `Altura ${(pokemon.height / 10).toFixed(1)} m · Peso ${(pokemon.weight / 10).toFixed(1)} kg`;
    input.value = pokemon.name;

    typesNode.replaceChildren();
    pokemon.types.forEach((item) => {
      const type = item.type.name;
      const badge = document.createElement("span");
      badge.className = "type-badge";
      badge.textContent = titleCase(type);
      badge.style.setProperty("--badge-color", TYPE_COLORS[type] || "#a78bfa");
      typesNode.appendChild(badge);
    });

    const artwork = pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default || "";
    if (artwork) {
      image.src = artwork;
      image.alt = `Ilustração de ${displayName}`;
      image.hidden = false;
      fallback.hidden = true;
      image.onerror = () => {
        image.hidden = true;
        fallback.hidden = false;
        fallback.textContent = "?";
      };
    } else {
      image.hidden = true;
      fallback.hidden = false;
      fallback.textContent = "?";
    }

    renderStats(pokemon);
    updateFavoriteButton();
    previousButton.disabled = pokemon.id <= 1;
    nextButton.disabled = false;
    setFeedback(`${displayName} carregado com sucesso.`, "success");
    document.title = `${displayName} — Pokédex Demo`;
  }

  async function loadPokemon(query) {
    const cleanQuery = String(query || "").trim().toLowerCase();
    if (!cleanQuery) {
      setFeedback("Digite o nome ou o ID de um Pokémon.", "error");
      input.focus();
      return;
    }

    const thisRequest = ++requestNumber;
    searchButton.disabled = true;
    previousButton.disabled = true;
    nextButton.disabled = true;
    setFeedback("Consultando a PokéAPI…");

    try {
      const response = await fetch(`${API_BASE}${encodeURIComponent(cleanQuery)}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error("not-found");
        throw new Error("api-error");
      }
      const pokemon = await response.json();
      if (thisRequest !== requestNumber) return;
      renderPokemon(pokemon);
    } catch (error) {
      if (thisRequest !== requestNumber) return;
      if (error.message === "not-found") {
        setFeedback("Não encontramos esse Pokémon. Confira o nome ou ID e tente novamente.", "error");
      } else {
        setFeedback("Não foi possível acessar a PokéAPI. Confira sua conexão e tente novamente.", "error");
      }
    } finally {
      if (thisRequest === requestNumber) {
        searchButton.disabled = false;
        if (currentPokemon) {
          previousButton.disabled = currentPokemon.id <= 1;
          nextButton.disabled = false;
        }
      }
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    loadPokemon(input.value);
  });

  favoriteButton.addEventListener("click", () => {
    if (!currentPokemon) return;
    const favorites = getFavorites();
    const alreadySaved = favorites.some((item) => Number(item.id) === currentPokemon.id);
    const updated = alreadySaved
      ? favorites.filter((item) => Number(item.id) !== currentPokemon.id)
      : [...favorites, {
          id: currentPokemon.id,
          name: currentPokemon.name,
          image: currentPokemon.sprites?.other?.["official-artwork"]?.front_default || currentPokemon.sprites?.front_default || ""
        }];
    saveFavorites(updated);
    updateFavoriteButton();
    renderFavorites();
    setFeedback(alreadySaved ? "Pokémon removido dos favoritos." : "Pokémon salvo nos favoritos deste navegador.", "success");
  });

  previousButton.addEventListener("click", () => {
    if (currentPokemon && currentPokemon.id > 1) loadPokemon(String(currentPokemon.id - 1));
  });
  nextButton.addEventListener("click", () => {
    if (currentPokemon) loadPokemon(String(currentPokemon.id + 1));
  });

  renderFavorites();
  loadPokemon("pikachu");
})();
