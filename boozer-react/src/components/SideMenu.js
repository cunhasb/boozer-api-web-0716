import React from "react";

const SideMenu = props => {
  return (
    <div className="ui massive vertical menu ">
      <div className="horizontally fitted item">
        <div className="ui icon input ">
          <input
            type="text"
            name="query"
            placeholder={props.searchBy}
            onChange={props.handleChange}
            value={props.query}
          />
          <i className="search icon" />
        </div>
      </div>
      <div className="active item">
        <div className=" bottom attached segment pushable">
          <div
            className="ui secondary vertical pointing menu pusher"
            style={{
              overflowY: "auto",
              whiteSpace: "nowrap",
              height: "700px",
              width: "100%"
            }}
          >
            {props.cocktailList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
