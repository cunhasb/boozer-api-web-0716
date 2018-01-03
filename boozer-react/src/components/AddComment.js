import React from "react";
import { Button, Comment, Form, Segment } from "semantic-ui-react";

const AddComment = props => {
  console.log("addcomment", props);

  return (
    <Comment.Group>
      <Form reply>
        <Form.TextArea
          value={props.comment}
          onChange={props.handleChange}
          name="newComment"
        />
        <Button
          labelPosition="left"
          icon="edit"
          primary
          content="Comment"
          onClick={() => props.handleAddComment(props.id, props.comment)}
        />
      </Form>
    </Comment.Group>
  );
};

export default AddComment;
