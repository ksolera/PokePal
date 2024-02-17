import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function About() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    if (pokemonId) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then((res) => res.json())
        .then((data) => {
          setPokemon(data);
          fetch(data.species.url)
            .then((res) => res.json())
            .then((speciesData) => {
              fetch(speciesData.evolution_chain.url)
                .then((res) => res.json())
                .then((evolutionData) => {
                  setEvolutionChain(evolutionData);
                });
            });
        });
    }
  }, [pokemonId]);

  const renderEvolutionChain = (chain) => {
    return (
      <div className="w-3/12 m-auto bg-purple-100 mt-4 shadow-2xl flex justify-center flex-col items-center">
        <div key={chain.species.name} className="flex justify-center items-center">
          <img
            className="w-40 h-40"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species.url.split('/').slice(-2, -1)}.png`}
            alt=""
          />
        </div>
        <div className="flex justify-center">
          {chain.evolves_to.map((evolution) => (
            <div key={evolution.species.name} className="flex justify-center items-center">
              <img
                className="w-45 h-45"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.species.url.split('/').slice(-2, -1)}.png`}
                alt=""
              />
              <label className="flex justify-center text-2xl text-black-900 capitalize">
                {evolution.species.name}
              </label>
              {evolution.evolves_to.map((nextEvolution) => (
                <div key={nextEvolution.species.name} className="flex justify-center items-center">
                  <img
                    className="w-45 h-45"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextEvolution.species.url.split('/').slice(-2, -1)}.png`}
                    alt=""
                  />
                  <label className="flex justify-center text-2xl text-black-900 capitalize">
                    {nextEvolution.species.name}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  
  

  return (
    <>
      {pokemon && pokemon.sprites && (
        <div className="w-3/12 m-auto bg-purple-100 mt-4 shadow-2xl flex justify-center flex-col items-center">
          <h3 className="text-2xl font-bold capitalize">{pokemon.name}</h3>
          <div className="flex justify-center">
            <img className="w-48" src={pokemon.sprites.front_default} alt="" />
            <img className="w-48" src={pokemon.sprites.back_default} alt="back_default" />
            <label className="text-2xl text-black-900 capitalize">#{pokemon.id}</label>
          </div>
          <div className="">
            <h2 className="font-bold">Stats</h2>
            <ul className="list-disc">
              <li>
                <b>HP: </b>
                {pokemon.stats[0].base_stat}
              </li>
              <li>
                <b>Type: </b>
                {pokemon.types[0].type.name}
              </li>
              <li>
                <b>Attack: </b>
                {pokemon.stats[1].base_stat}
              </li>
              <li>
                <b>Speed: </b>
                {pokemon.stats[5].base_stat}
              </li>
            </ul>
            <br></br>
          </div>
        </div>
      )}
      <div>
        <h2 className="text-1xl font-bold mt-2 flex justify-center">Evolution Chain</h2>
      </div>
      {evolutionChain && renderEvolutionChain(evolutionChain.chain)}
      <br />
      <div className="flex justify-center">
        <Link to={`/`}>
          <button className="mt-3 bg-blue-400 hover:bg-blue-500 text-black py-2 px-3 rounded border border-black text-2xl">
            Reset Here
          </button>
        </Link>
      </div>
    </>
  );
}

export default About;
