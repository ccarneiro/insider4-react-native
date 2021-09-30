/**
 * Gerar uma lista de filmes com tamanho que eu desejar.
 * @param {number} size número de filmes máximo
 * @param {Object[]} movies array de filmes
 */
export function getListMovies(size, movies) {
  if (movies.length > size) {
    return movies.slice(0, size);
  }
  return movies;
}

/**
 * Gera um indice aleatório para banner
 * @param {Object[]} movies array de filmes
 * @returns número aleatório
 */
export function randomBanner(movies) {
  return Math.floor(Math.random() * movies.length);
}
