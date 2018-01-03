import React from "react";
import CocktailForm from "./CocktailForm";

class AddCocktail extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return <CocktailForm {...this.props} />;
  }
}

export default AddCocktail;
