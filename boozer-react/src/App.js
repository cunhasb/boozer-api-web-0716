import React, { Component } from "react";
import "./App.css";
import CocktailsContainer from "./components/CocktailsContainer";
import NavBar from "./components/NavBar";

class App extends Component {
  state = {
    user: {
      id: "1",
      name: "Fabiano",
      email: "cunhasb@aol.com",
      password: "123"
    }
  };
  render() {
    return (
      <div className="ui theme ">
        <NavBar user={this.state.user} />
        <CocktailsContainer user={this.state.user} />
      </div>
    );
  }
}

export default App;
