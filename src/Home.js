import React from "react";
import { Link } from "react-router-dom";

export default function Home({ pokemonProp: results }) {
    console.log(results);
    return (
        <div className="mt-10 p-4 flex flex-wrap">
            {results &&
                results.map((val) => (
                    <div className="ml- mr-6 text-2xl text-black-400 " key={val.index}>
                        <button className="bg-blue-500 hover:bg-blue-400 text-black py-2 px-3 rounded border">
                        <Link to={`/about/${val.index}`}>{val.name}</Link>
                        </button>
                    </div>
                ))}
        </div>
    );
}