import React from "react";
import Form from "@awsui/components-react/form";
import FormField from "@awsui/components-react/form-field";
import Input from "@awsui/components-react/input";
import Select from "@awsui/components-react/select";
import Container from "@awsui/components-react/container";
import Header from "@awsui/components-react/header";
import SpaceBetween from "@awsui/components-react/space-between";
import Button from "@awsui/components-react/button";
import { useState } from "react";
// import SideNavigation from "@awsui/components-react/side-navigation";

const Register = () => {
    const [inputValue, setInputValue] = useState();
    const [selectValue, setSelectValue] = useState();
    
    return (
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link">Cancel</Button>
              <Button variant="primary">Submit </Button>
            </SpaceBetween>
          }
          header={
            <Header variant="h1" description="Form description">
              Form header
            </Header>
          }
        >
          <Container header={<Header variant="h2">Form container </Header>}>
            <SpaceBetween direction="vertical" size="l">
              <FormField label="Input field" description="An additional description for this form field.">
                <Input value={inputValue} onChange={(event) => setInputValue(event.detail.value)} />
              </FormField>
              <FormField label="Select field" errorText={!selectValue && "Please select a value"}>
                <Select
                  options={[
                    {
                      label: "Option 1",
                      value: "option-1"
                    },
                    {
                      label: "Option 2",
                      value: "option-3"
                    },
                    {
                      label: "Option 3",
                      value: "option-3"
                    }
                  ]}
                  selectedOption={selectValue}
                  onChange={(event) => setSelectValue(event.detail.selectedOption)}
                  selectedAriaLabel="selected"
                />
              </FormField>
            </SpaceBetween>
          </Container>
        </Form>
    )
}

export default Register;