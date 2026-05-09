import { getPokemonImageUrl } from '../services/pokemonService'

export default function PokemonCard({ pokemon, pokemonId }) {
  return (
    <div className="pokemon-card">
      <div className="pokemon-image">
        <img
          src={getPokemonImageUrl(pokemonId)}
          alt={pokemon.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/96x96?text=?'
          }}
        />
      </div>

      <h3 className="pokemon-name">{pokemon.name.toUpperCase()}</h3>

      <div className="pokemon-info">
        <div className="info-row">
          <span className="label">ID:</span>
          <span className="value">#{pokemonId}</span>
        </div>
      </div>
    </div>
  )
}
