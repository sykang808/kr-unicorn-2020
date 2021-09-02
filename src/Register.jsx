// import React from 'react';
import React, { useState, useEffect } from 'react';
import "@awsui/global-styles/index.css";
import {
    Button,
    Form,
    SpaceBetween,
    Header,
    Container,
    FormField,
    Box,
    Input,
    Textarea,
    Select,
    Multiselect
} from "@awsui/components-react/";

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import {Connect, withAuthenticator} from 'aws-amplify-react';
import awsconfig from './aws-exports.js';
import {listContents} from './graphql/queries.js' 
import {createContent, createComment} from './graphql/mutations.js' 

Amplify.configure(awsconfig);

console.log("========page start!========");

async function callCreateComment(newComment) {
    const result = await API.graphql(graphqlOperation( createComment, {"input":newComment}));
    console.log("========mutation========");
    console.log(`Created content with id ${result.data.createContent.id}`);
};

const newComment = {"id":"id00002","feedback": "fff", "contentID": "id00001", "owner": "kseongmo"};
callCreateComment(newComment);

function Register({content}) {

  const [contentName, setContentName] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [selectedOptionsAWSSvc, setSelectedOptionsAWSSvc] = useState( []);
  const [selectedOptionContent, setSelectedOptionContent] = useState( []);
  const [selectedOptionCategory, setSelectedOptionCategory] = useState( {label: "Choose the demo category", value: "" });
  const [isvalidating, setIsvalidating] = useState(false);
  
  useEffect(() => setContentName(content.contentName), [content.contentName]);

  async function onSubmit() {
    if (!contentName || contentName === "") {
      return;
    }
    setIsvalidating(true);
    
    let formData = {
        contentName,
        description,
        imageURL,
        selectedOptionsAWSSvc,
        selectedOptionContent
    };
    // console.log(this.state);
    // return ;
    alert(JSON.stringify(formData));
    // alert(this.state);
//     const newContet = { "contentType": "kseongmo", 
// 			"description": "kseongmo desc", 
// 			"categorty": "demo", 
// 			"name": "kseongmo", 
// 			"status": "done" };
    const result = await API.graphql(graphqlOperation( createComment, newComment));
	console.log("======== mutation on click ========");
    console.log(`Created content with id ${result.data.createContent.id}`);
    
  }


  return (
    <div>
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link">Cancel</Button>
              <Button variant="primary" onClick={onSubmit}>Submit</Button>
            </SpaceBetween>
          }
          header={<Header variant="h1">Register a content</Header>}
        >
        
            <SpaceBetween direction="vertical" size="l">
                <Container header={<Header variant="h2">Basic information</Header>} >
                    <SpaceBetween direction="vertical" size="xl">
                        <FormField label={
                            <span id="content-name-label">
                                Content Name
                                <Box variant="span" margin={{ left: 'xs' }} />
                            </span>
                            }
                        stretch={true}
                        >
                        
                        
                            <Connect
                                query={graphqlOperation(listContents)}
                            >
                                {({ data, loading }) => {
                                    console.log("======query=======");
                                    console.log(data);
                                    return;
                                }}
                            </Connect>
                        
                            
                            
                            <Input 
                                value={contentName}
                                placeholder="Enter Content Name"
                                onChange={event => setContentName(event.detail.value) }
                            />
                        </FormField>
                        <FormField label={
                            <span id="description-label">
                                Description
                                <Box variant="span" margin={{ left: 'xs' }} />
                            </span>
                            }
                        stretch={true}
                        >
                            <Textarea
                              placeholder="Please explain about the content"
                              onChange={({ detail }) => setDescription(detail.value)}
                              value={description}
                            />
                        </FormField>
                        <FormField label={
                            <span id="image-label">
                                Image (URL)
                                <Box variant="span" margin={{ left: 'xs' }} />
                            </span>
                            }
                        stretch={true}
                        >
                            <Input
                                value={imageURL}
                                placeholder="Please attach an image that describes the content well"
                                onChange={event => setImageURL(event.detail.value) }
                            />
                        </FormField>
                        <FormField label={
                            <span id="related-aws-services-label">
                                Related AWS Services
                                <Box variant="span" margin={{ left: 'xs' }} />
                            </span>
                            }
                        stretch={true}
                        >
                            <Multiselect
                                selectedOptions={selectedOptionsAWSSvc}
                                onChange={({ detail }) =>
                                    setSelectedOptionsAWSSvc(detail.selectedOptions)
                                }
                                deselectAriaLabel={e => "Remove " + e.label}
                                options={[
                                    {
                                      label: "Option 1",
                                      value: "1",
                                      description: "This is a description"
                                    },
                                    {
                                      label: "Option 2",
                                      value: "2",
                                      iconName: "unlocked",
                                      labelTag: "This is a label tag"
                                    },
                                    {
                                      label: "Option 3 (disabled)",
                                      value: "3",
                                      iconName: "share",
                                      tags: ["Tags go here", "Tag1", "Tag2"],
                                      disabled: true
                                    },
                                    {
                                      label: "Option 4",
                                      value: "4",
                                      filteringTags: [
                                        "filtering",
                                        "tags",
                                        "these are filtering tags"
                                      ]
                                    },
                                    {
                                      label: "Disabled Group",
                                      options: [
                                        { label: "Option 5", value: "5" },
                                        { label: "Option 6", value: "6" }
                                      ],
                                      value: "disabled-group",
                                      disabled: true
                                    }
                                ]}
                                placeholder="Choose options"
                                selectedAriaLabel="Selected"
                            />
                            <Button>button test</Button>
                        </FormField>
                        <FormField label={
                            <span id="content-type-label">
                                Content Type
                                <Box variant="span" margin={{ left: 'xs' }} />
                            </span>
                            }
                        stretch={true}
                        >
                            <Select
                                selectedOption={selectedOptionContent}
                                onChange={({ detail }) =>
                                    setSelectedOptionContent(detail.selectedOption)
                                }
                                options={[
                                          { label: "Document resources", 
                                              options: [
                                                { label: "Presentation", value: "11" },
                                                { label: "White paper", value: "12" }
                                              ],
                                            value: "1",
                                            disabled: false
                                          },
                                          { label: "Code resources",  
                                              options: [
                                                { label: "Reference code", value: "21" },
                                                { label: "Hands-on workshop", value: "22" },
                                                { label: "Utility toolkit", value: "23" }
                                              ],
                                            value: "2",
                                            disabled: true
                                          },
                                          { label: "Demo",
                                              options: [
                                                { label: "Demo video (File) ", value: "51" },
                                                { label: "Demo video (URL)", value: "52" },
                                                { label: "Demo site", value: "53" }
                                              ],
                                            value: "5",
                                            disabled: false
                                          }
                                    ]}
                                placeholder="Choose the content type"
                                selectedAriaLabel="Selected"
                            />
                        </FormField>
                    </SpaceBetween>
                    
                </Container>
                <Container header={<Header variant="h2">Category</Header>}>
                    <FormField label={
                        <span id="categories-label">
                            Categories
                            <Box variant="span" margin={{ left: 'xs' }} />
                        </span>
                        }
                    stretch={true}
                    >
                        <Select
                            selectedOption={selectedOptionCategory}
                            onChange={({ detail }) =>
                                setSelectedOptionCategory(detail.selectedOption)
                            }
                            options={[
                                      { label: "Document resources", 
                                          options: [
                                            { label: "Presentation", value: "11" },
                                            { label: "White paper", value: "12" }
                                          ],
                                        value: "1",
                                        disabled: false
                                      },
                                      { label: "Code resources",  
                                          options: [
                                            { label: "Reference code", value: "21" },
                                            { label: "Hands-on workshop", value: "22" },
                                            { label: "Utility toolkit", value: "23" }
                                          ],
                                        value: "2",
                                        disabled: true
                                      },
                                      { label: "Demo",
                                          options: [
                                            { label: "Demo video (File) ", value: "51" },
                                            { label: "Demo video (URL)", value: "52" },
                                            { label: "Demo site", value: "53" }
                                          ],
                                        value: "5",
                                        disabled: false
                                      }
                                ]}
                             selectedAriaLabel="Selected"
                        />
                    </FormField> 
                </Container>
                <Container>
                    Project team container
                </Container>
                <Container>
                    Resources container
                </Container>
            </SpaceBetween>
        </Form>
    </div>

  );
}

export default Register;

