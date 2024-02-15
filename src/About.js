import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

function About(props) {
    let { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        if (pokemonId) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
                .then((res) => res.json())
                .then((data) => {
                    setPokemon(data);
                    //console.log(data);
                });
        }
    }, [pokemonId]);

    return (
        <>
            {pokemon && pokemon.sprites && (
                <div className="w-3/12 m-auto bg-purple-100 mt-4 shadow-2xl flex justify-center flex-col items-center">
                    <h3 className="text-2xl text-green-900 uppercase">{pokemon.name}</h3>
                    <div className="flex justify-center">
                        <img className="w-48" src={pokemon.sprites["front_shiny"]} alt="" />
                    </div>
                    <div>
                        <h2>Stats</h2>
                        <ul>
                            <li>HP: {pokemon.stats[0].base_stat}</li>
                            <li>Type: {pokemon.types[0].type.name}</li>
                            <li>Attack: {pokemon.stats[1].base_stat}</li>
                            <li>Speed: {pokemon.stats[5].base_stat}</li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}


export default About