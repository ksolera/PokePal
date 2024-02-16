import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

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
                    <h3 className="text-2xl font-bold capitalize">{pokemon.name}</h3>
                    <div className="flex justify-center">
                        <img className='w-48' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt="" />
                        <img className='w-48' src={pokemon.sprites.back_default} alt="Shiny Version" />
                        <label className="text-2xl text-black-900 capitalize">#{pokemon.id}</label>
                    </div>
                    <div className="">
                        <h2 className='font-bold'>Stats</h2>
                        <ul className="list-disc">
                            <li><b>HP: </b>{pokemon.stats[0].base_stat}</li>
                            <li><b>Type: </b>{pokemon.types[0].type.name}</li>
                            <li><b>Attack: </b>{pokemon.stats[1].base_stat}</li>
                            <li><b>Speed: </b>{pokemon.stats[5].base_stat}</li>
                        </ul>
                    </div>
                </div>
            )}
            <br></br>
            <div className='flex justify-center'>
                <Link to={`/`}>
                  <button className="mt-3 bg-blue-400 hover:bg-blue-500 text-black py-2 px-3 rounded border border-black text-2xl">Reset Here</button>
                </Link>
              </div>
            
        </>
    );
}


export default About