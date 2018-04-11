import React from "react";
import { CocktailList, Slugify } from "./CocktailList";
import CocktailDetail from "./CocktailDetail";
import AddCocktail from "./AddCocktail";
import SideMenu from "./SideMenu";
import Api from "../services/Api";
import AddComment from "./AddComment";
import ShowComments from "./ShowComments";
import { Divider } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";

class CocktailsContainer extends React.Component {
  state = {
    currentUser: { id: 1 },
    cocktails: [],
    selectedCocktail: { proportions: [], comments: [] },
    proportions: [],
    query: "",
    newCocktail: {
      name: "",
      description: "",
      instructions: "",
      source: "",
      rating: "",
      proportions: [{ ingredient_name: "", amount: "" }]
    },
    newComment: ""
  };

  componentDidMount = () => {
    Api.cocktails
      .getCocktails()
      .then(cocktails => this.setState({ cocktails }));
    Api.proportions
      .getProportions()
      .then(proportions => this.setState({ proportions }));
  };

  handleClick = id => {
    if (id !== this.state.selectedCocktail.id) {
      Api.cocktailDetail
        .getCocktailDetails(id)
        .then(selectedCocktail => this.setState({ selectedCocktail }))
        .then(selectedCocktail =>
          this.setState(prevState => {
            if (selectedCocktail) {
              const comment = selectedCocktail.comments.find(el => {
                return el.user_id === this.state.currentUser.id;
              });
              return { newComment: comment };
            }
          })
        );
    }
  };

  handleAddClick = event => {
    event.preventDefault();
    const proportions = { ingredient_name: "", amount: "" };
    this.setState(prevState => ({
      newCocktail: {
        ...prevState.newCocktail,
        proportions: [...prevState.newCocktail.proportions, proportions]
      }
    }));
  };

  handleChange = event => {
    event.persist();
    console.log("change", event.target);
    console.log("value", event.target.value);
    console.log("ckey", event.target.name);
    const cId = event.target.id;
    const cKey = event.target.name;
    const cValue = event.target.value;
    if (cKey === "ingredient_name" || cKey === "amount") {
      this.setState(prevState => ({
        newCocktail: {
          ...prevState.newCocktail,
          proportions: prevState.newCocktail.proportions.map(
            (proportion, index) => {
              if (index == cId) {
                if (cKey === "ingredient_name") {
                  return {
                    ingredient_name: cValue,
                    amount: proportion.amount
                  };
                } else {
                  return {
                    ingredient_name: proportion.ingredient_name,
                    amount: cValue
                  };
                }
              } else {
                return proportion;
              }
            }
          )
        }
      }));
    } else if (cKey === "query") {
      this.setState({ query: cValue });
    } else if (cKey === "newComment") {
      this.setState({ newComment: cValue });
    } else {
      this.setState(prevState => ({
        newCocktail: {
          ...prevState.newCocktail,
          [cKey]: cValue
        }
      }));
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    Api.addCocktail.addCocktail(this.state.newCocktail).then(cocktails => {
      this.setState(prevState => ({
        cocktails: [...prevState.cocktails, cocktails]
      }));
      this.props.history.push(`/cocktails/${cocktails.name}`);
    });
  };
  handleRemoveIngredient = event => {
    event.persist();
    event.preventDefault();
    this.setState(prevState => {
      const proportions = prevState.newCocktail.proportions;
      proportions.splice(event.target.id, 1);
      return {
        newCocktail: {
          ...prevState,
          proportions: proportions
        }
      };
    });
  };

  handleDelete = id => {
    Api.deleteCocktail
      .deleteCocktail(id)
      .then(cocktails =>
        this.setState({
          cocktails: cocktails,
          newCocktail: {
            name: "",
            description: "",
            instructions: "",
            source: "",
            rating: "",
            proportions: [{ ingredient_name: "", amount: "" }]
          }
        })
      )
      .then(cocktails => this.props.history.push("/cocktails"));
  };

  handleRate = data => {
    Api.rating
      .addRating({
        cocktail_id: data.cocktail_id,
        rating: data.rating,
        user_id: 1
      })
      .then(selectedCocktail => {
        this.setState({ selectedCocktail });
      });
  };

  handleAddComment = (cocktail_id, content) => {
    console.log("addcomment - here", cocktail_id, content);
    Api.comment
      .addComment({
        cocktail_id: cocktail_id,
        comment: content,
        user_id: 1
      })
      .then(selectedCocktail => {
        this.props.history.push(`/cocktails/${selectedCocktail.name}`);
        this.setState({ selectedCocktail });
      });
  };

  applyFilter = (collection, query) => {
    if (query) {
      // debugger;
      const proportions = this.state.proportions
        .map(proportion => {
          if (
            proportion.ingredient.toLowerCase().includes(query.toLowerCase())
          ) {
            return proportion.cocktail_id;
          }
        })
        .filter(Boolean);
      const result = collection.filter(el => {
        console.log(
          "inside result",
          el.props.id,
          el.props.name,
          el.props.name.toLowerCase().includes(query) ||
            proportions.includes(el.props.id)
        );
        // debugger;
        return (
          el.props.name.toLowerCase().includes(query) ||
          proportions.includes(el.props.id)
        );
      });
      console.log("result", result);
      return result;
    } else {
      return collection;
    }
  };
  render() {
    const cocktailList = this.applyFilter(
      this.state.cocktails.map(cocktail => {
        return (
          <CocktailList
            key={cocktail.id}
            {...cocktail}
            handleClick={this.handleClick}
          />
        );
      }),
      this.state.query
    );

    return (
      <div className="ui three column grid">
        <SideMenu
          cocktailList={cocktailList}
          handleChange={this.handleChange}
          query={this.state.query}
          searchBy={
            this.state.proportions == ""
              ? "Search by name..."
              : "Search by name or ingredient..."
          }
          className="ui grid container left floated"
        />
        <div className="ten wide column ">
          <Switch>
            <Route
              path="/cocktails/:slug/comment"
              render={({ match }) => {
                const cocktail = this.state.cocktails.find(el => {
                  return el.name === match.params.slug;
                });
                cocktail ? this.handleClick(cocktail.id) : <div>Loading</div>;
                return (
                  <div>
                    <CocktailDetail
                      {...this.state.selectedCocktail}
                      handleDelete={this.handleDelete}
                      handleRate={this.handleRate}
                    />

                    <AddComment
                      {...this.state.selectedCocktail}
                      comment={this.state.newComment}
                      handleAddComment={this.handleAddComment}
                      handleChange={this.handleChange}
                      currentUser={this.state.currentUser.id}
                    />
                  </div>
                );
              }}
            />
            <Route
              path="/cocktails/new"
              render={() => {
                return (
                  <AddCocktail
                    {...this.state.newCocktail}
                    handleChange={this.handleChange}
                    handleAddClick={this.handleAddClick}
                    handleRemoveIngredient={this.handleRemoveIngredient}
                    handleSubmit={this.handleSubmit}
                  />
                );
              }}
            />
            <Route
              path="/cocktails/:slug"
              render={({ match }) => {
                const cocktail = this.state.cocktails.find(el => {
                  return Slugify(el.name) === match.params.slug;
                });
                cocktail ? this.handleClick(cocktail.id) : <div>Loading</div>;
                return (
                  <div>
                    <CocktailDetail
                      {...this.state.selectedCocktail}
                      handleDelete={this.handleDelete}
                      handleRate={this.handleRate}
                    />
                    <Divider clearing />
                    {this.state.selectedCocktail.comments
                      ? this.state.selectedCocktail.comments.map(comment => {
                          return (
                            <ShowComments
                              {...comment}
                              currentUser={this.state.currentUser.id}
                            />
                          );
                        })
                      : null}
                  </div>
                );
              }}
            />

            <Route
              path="/cocktails/"
              render={({ location }) => {
                // Location hash had to be used, because there is some
                // cocktail names that have the # symbol, which is not
                // recognized by the route :slug, but it is by the location hash.
                const cocktail = this.state.cocktails.find(el => {
                  return Slugify(el.name) === location.hash;
                });
                if (cocktail) {
                  this.handleClick(cocktail.id);
                  return (
                    <CocktailDetail
                      {...this.state.selectedCocktail}
                      handleDelete={this.handleDelete}
                      handleRate={this.handleRate}
                    />
                  );
                } else {
                  return null;
                }
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(CocktailsContainer);
