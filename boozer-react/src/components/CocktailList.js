import React from "react";
import { Link } from "react-router-dom";

export const CocktailList = props => {
  return (
    <div>
      <Link to={`/cocktails/${Slugify(props.name)}`}>{props.name}</Link>
    </div>
  );
};

export const Slugify = name => {
  // console.log("inside slugify", name);
  if (name) {
    return name.replace(/[^a-zA-Z0-9 ]/g, "");
  }
  // console.log("outside if", name);
  return name;
};

export default {
  CocktailList: { CocktailList },
  Slugify: { Slugify }
};
