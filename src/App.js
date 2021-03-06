// eslint-disable-next-line
import React, { Component } from 'react'
import { fetchAllBreeds, fetchDescription, fetchImageSrc } from './api'
import './App.css'
import DogCard from './components/DogCard'
import { rawDataToAppData } from './dataConversion'
import {
  updateStateWithDescription,
  updateStateWithImageSrc,
} from './stateUpdaters'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breeds: [],
    }
  }
  componentDidMount() {
    fetchAllBreeds()
      .then(rawDataToAppData)
      .then(breeds => {
        this.setState({ breeds })
        return breeds
      })
      .then(breeds => {
        breeds
          .map(fetchImageSrc)
          .map(
            updateStateWithImageSrc((updater, callback) =>
              this.setState(updater, callback),
            ),
          )

        breeds
          .map(fetchDescription)
          .map(
            updateStateWithDescription((updater, callback) =>
              this.setState(updater, callback),
            ),
          )
      })
  }
  render() {
    return this.state.breeds.length === 0
      ? 'Loading...'
      : this.state.breeds.map(DogCard)
  }
}

export default App
