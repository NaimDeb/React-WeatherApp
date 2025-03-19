import React from 'react'
// Marche pas ?
import './Searchbar.css'

function Searchbar() {
  return (
    <div>
      <p>Rechercher une ville</p>
      <form action="#" method="get">

        <input type="text" className='searchBar'/>
        <button type="submit">Rechercher</button>

      </form>
    </div>
  )
}

export default Searchbar