
import { useEffect,useState } from 'react';
import Recipe from "./Recipe"; 
import './App.css';

function App() {

  const APP_KEY = "f4b05000306e2d988bf924ed41c82e71";
  const APP_ID = "9004fd4e";

  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState(""); 
  const [query,setQuery] = useState('chicken');

  useEffect(()=>{
    getRecipes();
  }, [query]);

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json(); 
    setRecipes(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value); 
  };

  const getSearch = e =>{
    e.preventDefault(); 
    setQuery(search);


  }

  return (
    <div className="App">
      <h1 className="title">Recipe Finder</h1>
      <form onSubmit={getSearch}className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}></input>
        <button className="search-button" type="submit"> Search</button>
      </form>
      <div className="recipes">
      {recipes.map((recipe,index)=>(
        <Recipe key={index} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
}

export default App;
