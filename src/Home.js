import React from "react";
import { Link } from "react-router-dom";

export default function Home({ pokemonProp: results }) {
    console.log(results)
    return (
        <div className="mt-10 p-4 flex flex-wrap">
            {results &&
                results.map((val) => (
                    <div className="ml-4 mr-4 text-2xl text-black-400" key={val.index}>
                        <button className="bg-blue-400 hover:bg-blue-500 text-black rounded border border-black m-2 button-wrapper">                       
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${val.index}.png`} width={75} height={70} alt="" />
                        <Link className="py-4 mr-4 text-bold" to={`/about/${val.index}`}>{val.name}</Link>
                        </button>
                    </div>
                ))}
        </div>
    );
}