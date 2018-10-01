import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { GoHeart, GoArrowRight, GoTrashcan } from 'react-icons/go'

import './styles.css'

class App extends Component {
  state = {
    currentCat: null,
    favoriteCats: []
  }

  getCat = () => {
    const url = 'https://catis.life/cat'
    this.setState({ currentCat: null })

    fetch(url)
      .then(rsp => rsp.json())
      .then(data => this.setState({ currentCat: data.cat }))
  }

  favoriteCat = cat => {
    this.setState(state => ({
      favoriteCats: this.state.favoriteCats.concat(cat)
    }))
  }

  removeFavorite = currentCatIndex => {
    this.setState(state => ({
      favoriteCats: state.favoriteCats.filter((_, i) => i !== currentCatIndex)
    }))
  }

  catInFavorites = cat => this.state.favoriteCats.includes(cat)

  componentDidMount = () => this.getCat()

  render() {
    const { currentCat, favoriteCats } = this.state
    return (
      <main>
        <section className="cat-wrapper">
          <h1>Choose your favorite cats</h1>
          <section className="cat-container">
            <figure>
              {currentCat ? (
                <img className="cat-image" src={currentCat} alt="DOPE cat" />
              ) : null}
            </figure>
            <ul className="cat-actions">
              <li>
                <button
                  className="heart-icon"
                  disabled={this.catInFavorites(currentCat)}
                  onClick={() => this.favoriteCat(currentCat)}
                >
                  <GoHeart size="30" color="#f44336" />
                </button>
              </li>
              <li>
                <button onClick={this.getCat}>
                  <GoArrowRight size="30" />
                </button>
              </li>
            </ul>
          </section>
          <ul className="favorite-cats">
            {favoriteCats.map((cat, index) => (
              <li>
                <img class="favorite-cat" src={cat} alt="favorited cat" />
                <button onClick={() => this.removeFavorite(index)}>
                  <GoTrashcan size="20" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
