import React from "react";
import { Button, Rating, Segment } from "semantic-ui-react";
import { Slugify } from "./CocktailList";
import { Link, withRouter } from "react-router-dom";

const CocktailDetail = props => {
  if (props.proportions) {
    const ingredients = props.proportions.map(ingredient => {
      return (
        <tr key={ingredient.id}>
          <td>
            <h5 className="ui center aligned header">
              {ingredient.ingredient_name}
            </h5>
          </td>
          <td className="ui center aligned header">{ingredient.amount}</td>
        </tr>
      );
    });

    if (props.name !== undefined) {
      return (
        <div className="ui">
          <h3 className="ui dividing header">{props.name}</h3>
          <Rating rating={props.rating} maxRating={5} size="large" disabled />
          <h3 className="ui header justified">{props.description}</h3>
          <p>{props.instructions}</p>
          <p />
          <div className="ui clearing divider" />
          <h3 className="ui aligned center header">Ingredients</h3>
          <div className="ui clearing divider" />
          <table className="ui celled padded table">
            <tbody>{ingredients}</tbody>
          </table>
          <Segment.Group horizontal>
            <Segment textAlign="center">
              <Button basic>
                <Rating
                  icon="star"
                  defaultRating={5}
                  maxRating={5}
                  size="large"
                  cocktail_id={props.id}
                  clearable
                  onRate={(event, data) => props.handleRate(data)}
                />
              </Button>
            </Segment>
            <Segment textAlign="center">
              <Link to={`/cocktails/${Slugify(props.name)}/comment`}>
                <Button
                  basic
                  color="blue"
                  content="Comment"
                  icon="comments"
                  label={{
                    as: "a",
                    basic: true,
                    color: "blue",
                    pointing: "left",
                    content: props.comments ? props.comments.length : 0
                  }}
                />
              </Link>
            </Segment>
            <Segment textAlign="center">
              <Button
                negative
                content="Delete"
                type="button"
                onClick={() => props.handleDelete(props.id)}
              />
            </Segment>
          </Segment.Group>
        </div>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default withRouter(CocktailDetail);
