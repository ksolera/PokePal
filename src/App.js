import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import About from './About'
import Home from './Home'
import './App.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import logo from './images/Logo.png';

function App() {

  const [pokemonsData, setPokemonsData] = useState([]);
  const [inputSearch, setInputSearch] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(generateRandomPokemon());

  function generateRandomPokemon() {
    return Math.floor(Math.random() * 300) + 1;
  }

  function randomizePokemon(){
    setRandomPokemon(generateRandomPokemon());
  }
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151")
      .then((res) => res.json())
      .then((data) => {
        const results = data.results.map((pokemonDetails, index) => {
          //console.log(res.results.pokemonData)
          return { ...pokemonDetails, index: index + 1 };
        });
        setPokemonsData({ ...data, results })
      });

  }, []);

  useEffect(() => {
    if (!inputSearch) {
      setFilteredPokemon([]);
      return;
    }

    setFilteredPokemon(() =>
      pokemonsData.results?.filter((pokemon) => pokemon.name.includes(inputSearch))
    );
  }, [pokemonsData.results, inputSearch]);

  

  return (
    <BrowserRouter>
      <div>
        <div className="p-14" id="top-section">
          <div className="flex flex-col items-center ">
            <Link to="/">
              <header className="flex space-x-5 text-4xl text-yellow-700">
                <a href="https://fontmeme.com/pokemon-font/"><img src="https://fontmeme.com/permalink/240210/57b88dceb381a39cea4aaef1097f2f94.png" alt="pokemon-font" border="0" /></a>
                <img src={logo} width={135} height={75}/>
              </header>
              
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <div className="container mx-auto">
              <label htmlFor="search" className="text-2xl text-white" >Search for Pokemon: </label>
              <input
                onChange={(e) => setInputSearch(e.target.value)}
                placeholder="Enter Name of Pokemon"
                type="text"
                className="mt-10 p-2 border-black border-2"
              />
              <div>
                <text className="mt-3 text-2xl text-white">Or</text>
              </div>
              <div>
                <Link to={`/about/${randomPokemon}`}>
                  <button className="mt-3 bg-blue-400 hover:bg-blue-500 text-black py-2 px-3 rounded border border-black text-2xl" onClick={randomizePokemon}>Pick for me</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div id="bottom-section">
          <hr
            style={{
              background: 'black',
              color: 'black',
              borderColor: 'black',
              height: '6px',
            }}
          />
          <div>
          <Routes>
          <Route path="/about/:pokemonId" element={<About />} />
          {filteredPokemon && (
            <Route path="/" element={<Home pokemonProp={filteredPokemon} />} />
          )}
        </Routes>
          </div>
        
        </div>
        <br></br>
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'center',
              background: 'darkgrey',
              color: 'darkgrey',
              borderColor: 'black'
            }}>
          <footer className="text-1xl text-white p-3"> 
          <a href="/">Home</a>
          <a href="">About </a>
          <a href="">FAQ</a>
          <a href="">Contact Us</a>
          <a href="">Terms of Service</a>
          <a href="">Privacy Policy</a>  
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
