import { useState, useEffect } from 'react'
import PokemonCard from './components/PokemonCard'
import Pagination from './components/Pagination'
import { fetchPokemonList, calculatePokemonId, POKEMON_PER_PAGE_EXPORT } from './services/pokemonService'
import './App.css'

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // Cargar Pokémon cuando cambia la página
  useEffect(() => {
    const loadPokemonList = async () => {
      try {
        setLoading(true)
        const data = await fetchPokemonList(currentPage)
        setPokemonList(data.results)
        setTotalPages(data.totalPages)
        setError(null)
      } catch (err) {
        setError('Error al cargar los datos de los Pokémon')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPokemonList()
  }, [currentPage])

  // Manejadores de paginación
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="app-container">
      <h1 className="title">Pokémon API</h1>

      {loading && <p className="loading">Cargando datos de los Pokémon...</p>}

      {error && <p className="error">{error}</p>}

      {pokemonList.length > 0 && (
        <>
          <div className="pokemon-grid">
            {pokemonList.map((pokemon, index) => {
              const pokemonId = calculatePokemonId(index, currentPage)
              return (
                <PokemonCard
                  key={pokemon.name}
                  pokemon={pokemon}
                  pokemonId={pokemonId}
                />
              )
            })}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            loading={loading}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onPageClick={handlePageClick}
          />
        </>
      )}
    </div>
  )
}

export default App
