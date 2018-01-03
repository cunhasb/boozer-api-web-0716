import React from "react";
import CocktailProportions from "./CocktailProportions";
import { Form, TextArea } from "../../node_modules/semantic-ui-react";

const CocktailForm = props => {
  const proportionComponents = props.proportions.map((proportion, index) => {
    return (
      <CocktailProportions
        key={index}
        id={index}
        {...proportion}
        handleChange={props.handleChange}
        handleAddClick={props.handleAddClick}
        handleRemoveIngredient={props.handleRemoveIngredient}
      />
    );
  });
  return (
    <Form>
      <h2 className="ui header">Create a Cocktail</h2>
      <Form.Field>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={props.name}
          placeholder="Cocktail Name"
          onChange={props.handleChange}
        />
      </Form.Field>

      <Form.Field>
        <label>Description</label>
        <TextArea
          autoHeight
          rows={1}
          name="description"
          value={props.description}
          placeholder="Description"
          onChange={props.handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Instructions</label>
        <TextArea
          autoHeight
          rows={1}
          name="instructions"
          placeholder="Instructions"
          onChange={props.handleChange}
          value={props.instructions}
        />
      </Form.Field>
      <Form.Field>
        <label>Source</label>
        <input
          type="text"
          name="source"
          placeholder="Source"
          onChange={props.handleChange}
          value={props.source}
        />
      </Form.Field>
      <Form.Field>{proportionComponents}</Form.Field>
      <button
        className="ui icon button positive"
        type="submit"
        onClick={props.handleSubmit}
      >
        Submit
      </button>
    </Form>
  );
};

export default CocktailForm;
