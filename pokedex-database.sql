-- Schema mínimo da tabela usada por favoritos.php e pokemon.php
-- Execute apenas se a tabela favoritos ainda não existir.
CREATE TABLE IF NOT EXISTS favoritos (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    pokemon_id INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_favoritos_pokemon_id (pokemon_id)
);
