import React from 'react'
import Dish from './components/Dish';
import Header from './components/Header';
import Menu from './components/Menu';


function App() {
  return (
    <div>
      <h1>My first react app</h1>
      <p>Rendering the dish name and price</p>
      <Header/>
      <Dish name = "Aynet" price={200} />
      <Dish name = "Shiro wot" price={150} />
      <Dish name = "Doro wot" price={500} />
      <Dish name = "injera" price={60} />
      <Menu/>
    </div>
    
  )
}

export default App;