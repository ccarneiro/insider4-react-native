/**
 * Gerar uma lista de filmes com tamanho que eu desejar.
 * @param {number} size numero de filmes máximo
 * @param {Object[]} movies array de filmes
 */
export function getListMovies(size, movies) {
  if (movies.length > size) {
    return movies.slice(0, size);
  }
  return movies;
}
