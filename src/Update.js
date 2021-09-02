import * as React from "react";
import Modal from "@awsui/components-react/modal";
import Box from "@awsui/components-react/box";
import SpaceBetween from "@awsui/components-react/space-between";
import Button from "@awsui/components-react/button";

const Update = (props) => {

//   function OnInvisible() {
//       setVisible(false);
//       console.log(visible);
//   }

  return (
    <Modal
      onDismiss={() => props.setVisible(false)}
      visible={props.onVisible}
      closeAriaLabel="Close modal"
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link">Cancel</Button>
            <Button variant="primary">Ok</Button>
          </SpaceBetween>
        </Box>
      }
      header="Modal title"
    >
      Your description should go here
    </Modal>
  );
}

export default Update;