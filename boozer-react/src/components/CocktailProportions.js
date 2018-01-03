import React from "react";
import { Form } from "../../node_modules/semantic-ui-react";

const CocktailProportions = props => {
  return (
    <Form.Group widths="equal">
      <Form.Input
        id={props.id}
        name="ingredient_name"
        value={props.ingredient_name}
        label="Ingredient"
        placeholder="Ingredient Name"
        onChange={props.handleChange}
      />
      <Form.Input
        id={props.id}
        name="amount"
        value={props.amount}
        label="Amount"
        placeholder="Amount"
        onChange={props.handleChange}
      />
      <label>
        <div style={{ opacity: 0.0 }}>.</div>
        <div className="ui buttons single line">
          <button
            className="circular ui icon button positive"
            onClick={props.handleAddClick}
          >
            <i className="add circle icon" />
          </button>
          <div className="or" />
          <button
            className="circular ui icon button negative"
            onClick={props.handleRemoveIngredient}
            id={props.id}
          >
            <i className="remove icon" />
          </button>
        </div>
      </label>
    </Form.Group>
  );
};

export default CocktailProportions;
