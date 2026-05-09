import axiosInstance from '../config/axiosConfig'

const POKEMON_PER_PAGE = 20

/**
 * Obtiene la lista de Pokémon con paginación
 * @param {number} page - Número de página (comienza desde 1)
 * @returns {Promise} Promesa con los datos de Pokémon y total de páginas
 */
export const fetchPokemonList = async (page = 1) => {
  try {
    const offset = (page - 1) * POKEMON_PER_PAGE
    const response = await axiosInstance.get('/pokemon', {
      params: {
        limit: POKEMON_PER_PAGE,
        offset: offset,
      },
    })

    const totalPages = Math.ceil(response.data.count / POKEMON_PER_PAGE)

    return {
      results: response.data.results,
      totalPages: totalPages,
      totalCount: response.data.count,
    }
  } catch (error) {
    throw new Error('No se pudieron cargar los Pokémon: ' + error.message)
  }
}

/**
 * Obtiene el ID del Pokémon basado en el índice y página actual
 * @param {number} index - Índice en la lista actual
 * @param {number} currentPage - Página actual
 * @returns {number} ID del Pokémon
 */
export const calculatePokemonId = (index, currentPage) => {
  return (currentPage - 1) * POKEMON_PER_PAGE + index + 1
}

/**
 * Obtiene la URL de la imagen del Pokémon
 * @param {number} id - ID del Pokémon
 * @returns {string} URL de la imagen
 */
export const getPokemonImageUrl = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export const POKEMON_PER_PAGE_EXPORT = POKEMON_PER_PAGE
