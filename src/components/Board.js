import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
// import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
      errorMessage: null,
    };
  };

  componentDidMount() {
    axios.get(`${this.props.url}${this.props.boardName}/cards`)
      .then((response) => {
        const cardsFromApi = response.data.map(cardWrapper => {
    
            return {
              id: cardWrapper.card.id,
              text: cardWrapper.card.text,
              emoji: cardWrapper.card.emoji
            };
        });

        this.setState({ cards: cardsFromApi });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message
        })
      })
  };
  
  onDeleteCard = (cardId) => {

    axios.delete(`https://inspiration-board.herokuapp.com/cards/${cardId}`)
    .then((response) => {
      const currentCardList = this.state.cards.filter((card) => card.id !== cardId);

      this.setState({ cards: currentCardList });

      console.log('card was deleted with id', cardId);  
    })
    .catch((error) => {
      this.setState({
        errorMessage: error.message
      })
    });

    console.log(this.state.cards.length);
  };

  addNewCard = (newCard) => {
    axios.post(`${this.props.url}${this.props.boardName}/cards`, newCard)
      .then((response) => {
        const updateCardList = this.state.cards;
        updateCardList.push(newCard);

        this.setState({
          cards: updateCardList,
        })
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message
        })
      });
  };

  render() {
    const allCards = this.state.cards.map((card, i) => {
      return (
        <section className='card' key={i}>
          <Card
            {...card}
            deleteCardCallback={this.onDeleteCard}
           />
        </section>
      );
    });

    let errorMessages = '';
    if (this.state.errorMessages) {
      errorMessages = this.state.errorMessage.map((message) => {
        return (
          <li >
            {message}
          </li>
        )
      }) 
    };

    return (
      <main>
        
        <section className="validation-errors-display">
          <ul className="validation-errors-display__list">
            {errorMessages}
          </ul>
        </section>

        <div className="board">
          {allCards}
        </div>

        <NewCardForm onFormSubmitCallback={this.addNewCard}/>

      </main>
    );

  }

}

Board.propTypes = {
  url: PropTypes.string,
  boardName: PropTypes.string,
};

export default Board;
