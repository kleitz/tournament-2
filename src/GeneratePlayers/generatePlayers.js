import React, { Component } from 'react';
import Footer from '../Footer/footer';

import { Tile, NestTile, AddTile, PlayerTile } from '../Common/Tile.styles.jsx';
import { Button } from '../Common/Button.styles.jsx'
import { Input } from '../Common/Input.styles.jsx'
import { AlignCenterWrapper } from '../Common/AlignCenterWrapper.styles.jsx'

class GeneratePlayers extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
      counter: 0,
      input: "",
    }
    this.removePlayer = this.removePlayer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.shufflePlayers = this.shufflePlayers.bind(this);
  }

  removePlayer(index) {
    const { players } = this.state;
    let shortenPlayers = players.filter(player => Number(player.key) !== index );
    this.setState( {
      players:  shortenPlayers,
    } )
  }

  handleSubmit(e) {
    e.preventDefault();
    const { players, counter, input } = this.state;
    this.setState( {
      players: [...players, {
        key: counter,
        name: this.capitalize(input),
      }],
      counter: this.state.counter + 1,
      input: "",
    })
  }

  handleChange(e) {
    this.setState({
      input: e.target.value,
    })
  }

  capitalize(string) {
    const separators = ['-', ' '];
    let capitalizedString = string.toLowerCase();
    separators.forEach((separator) => {
        capitalizedString = capitalizedString.split(separator)
        .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
        .join(separator);
      }
    )
    return capitalizedString;
  }

  shufflePlayers() {
    const shuffledPlayers = this.state.players;
    for (var i = shuffledPlayers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffledPlayers[i];
      shuffledPlayers[i] = shuffledPlayers[j];
      shuffledPlayers[j] = temp;
    }

    this.setState({
      players: shuffledPlayers,
    })
  }

  render() {
    const players = this.state.players.map((player) =>
    <li
      key={ player.key }>
      < Player name={ player.name }
      index={ player.key }
      removePlayer={ this.removePlayer }/>
    </li>
    );

    return(
      <div>
        < PlayerForm handleChange={ this.handleChange } handleSubmit={ this.handleSubmit } input={ this.state.input } />
        <ul>{ players }</ul>
        < Footer shufflePlayers={ this.shufflePlayers }/>
      </div>
    );
  }
}

function PlayerForm({ addPlayer, handleChange, handleSubmit, input }) {
  return (
    <div>
      < InputPlayer handleChange={ handleChange } handleSubmit={ handleSubmit } input={ input } />
    </div>
  )
}

function InputPlayer({ handleChange, handleSubmit, input }){
  // Used onBlur to only trigger a new state when clicking on the button,
  // but if I also want to erase the value in input on that click, I need to give a value to input
  // And that means I need to constantly give a value, which means I need to use onChange and not onBlur. Work around?

  return (
    <div>
      <form>
        <AlignCenterWrapper>
          <Input onChange={ handleChange } value={ input } placeholder={ "Player's name" }></Input>
          <AddTile>
            <Button onClick={ handleSubmit } type="submit">Add</Button>
          </AddTile>
        </AlignCenterWrapper>
      </form>
    </div>
  )
}

function Player({index, removePlayer, name}) {
  return (
    <PlayerTile>
      <div> {name} </div>
      < RemovePlayerBtn index= { index } removePlayer={removePlayer} />
    </PlayerTile>
  )
}

function RemovePlayerBtn({removePlayer, index}) {
  return <button onClick={() => removePlayer(index)}>X</button>
}



export default GeneratePlayers;
