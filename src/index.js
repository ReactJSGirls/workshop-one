import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { GoHeart, GoArrowRight, GoTrashcan } from 'react-icons/go'

import './styles.css'

class App extends Component {
  state = {
    currentDog: null,
    favoriteDogs: []
  }

  getDog = () => {
    const url = 'https://dog.ceo/api/breed/akita/images/random'
    this.setState({ currentDog: null })

    fetch(url)
      .then(rsp => rsp.json())
      .then(data => this.setState({ currentDog: data.message }))
  }

  favoriteDog = dog => {
    this.setState(state => ({
      favoriteDogs: this.state.favoriteDogs.concat(dog)
    }))
  }

  removeFavorite = currentDogIndex => {
    this.setState(state => ({
      favoriteDogs: state.favoriteDogs.filter((_, i) => i !== currentDogIndex)
    }))
  }

  dogInFavorites = dog => this.state.favoriteDogs.includes(dog)

  componentDidMount = () => this.getDog()

  render() {
    const { currentDog, favoriteDogs } = this.state
    return (
      <main>
        <section className="dog-wrapper">
          <h1>Choose your favorite dogs</h1>
          <section className="dog-container">
            <figure>
              {currentDog ? (
                <img className="dog-image" src={currentDog} alt="DOPE DOG" />
              ) : null}
            </figure>
            <ul className="dog-actions">
              <li>
                <button
                  className="heart-icon"
                  disabled={this.dogInFavorites(currentDog)}
                  onClick={() => this.favoriteDog(currentDog)}
                >
                  <GoHeart size="30" color="#f44336" />
                </button>
              </li>
              <li>
                <button onClick={this.getDog}>
                  <GoArrowRight size="30" />
                </button>
              </li>
            </ul>
          </section>
          <ul className="favorite-dogs">
            {favoriteDogs.map((dog, index) => (
              <li>
                <img class="favorite-dog" src={dog} alt="favorited dog" />
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
