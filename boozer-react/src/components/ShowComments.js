import React from "react";
import { Comment } from "semantic-ui-react";

const ShowComments = props => {
  const elapsed = (start, end) => {
    const time = (end - start) / 1000 / 60;
    return time < 60
      ? time.toFixed() + " minute(s) ago"
      : time / 60 < 24
        ? (time / 60).toFixed() + " hour(s) ago"
        : time / 60 / 24 < 365
          ? (time / 60 / 24).toFixed() + " day(s) ago"
          : (time / 60 / 60 / 24 / 365).toFixed() + " year(s) ago";
  };
  // const created = new Date(props.created);
  // const updated = new Date(props.updated);

  return (
    <Comment.Group>
      <Comment>
        <Comment.Content>
          <Comment.Author>{props.user}</Comment.Author>
          <Comment.Metadata>
            <div>Created {elapsed(new Date(props.created), new Date())}</div>
            <div>
              last Updated {elapsed(new Date(props.updated), new Date())}
            </div>
          </Comment.Metadata>
          <Comment.Text>
            <p>{props.comment}</p>
          </Comment.Text>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  );
};

export default ShowComments;
