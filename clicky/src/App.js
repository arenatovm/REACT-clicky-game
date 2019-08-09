import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    clickedFriendIds: [],
    score: 0,
    highscore: 0
  };


shuffleScoreCard = id => {
  let clickedFriendIds = this.state.clickedFriendIds;

  if(clickedFriendIds.includes(id)){
    this.setState({ clickedFriendIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
    return;
  }else{
    clickedFriendIds.push(id)

    if(clickedFriendIds.length === 8){
      this.setState({score: 8, status: "You Won! Great Job, Smartie! Click to play again!", clickedFriendIds: []});
      console.log('You Win');
      return;
    }

    this.setState({ friends, clickedFriendIds, score: clickedFriendIds.length, status: " " });

    for (let i = friends.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [friends[i], friends[j]] = [friends[j], friends[i]];
    }
  }
}
// Map over this.state.friends and render a FriendCard component for each friend object
render() {
  return (
    <Wrapper>
      
      <Title score={this.state.score} highscore={this.state.highscore}>Clicky Game</Title>
      {this.state.friends.map(friend => (
        <FriendCard
        shuffleScoreCard={this.shuffleScoreCard}
          id={friend.id}
          key={friend.id}
          name={friend.name}
          image={friend.image}
          occupation={friend.occupation}
          location={friend.location}
        />
      ))}
    </Wrapper>
  );
}
}

export default App;
