import React from "react";
import Form from "@awsui/components-react/form";
import Header from "@awsui/components-react/header";
import SpaceBetween from "@awsui/components-react/space-between";
import Button from "@awsui/components-react/button";
import Box from "@awsui/components-react/box";
import TextFilter from "@awsui/components-react/text-filter";
import Pagination from "@awsui/components-react/pagination";
import CollectionPreferences from "@awsui/components-react/collection-preferences";
// import SideNavigation from "@awsui/components-react/side-navigation";
import Table from "@awsui/components-react/table"
import Update from "./Update";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

const Home = () => {
    const [
        selectedItems,
        setSelectedItems
      ] = React.useState([{ name: "Item 2" }]);

    const [modalOpen, setModalOpen] = React.useState(false);
    
    
    return (
        <>
        <Update onVisible={modalOpen} setVisible={setModalOpen}/>
        <Form
            actions={
            <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link">Delete</Button>
                <Button variant="normal" onClick={() => setModalOpen(true)}>Update</Button>
                <Button variant="primary">Create</Button>
            </SpaceBetween>
            }
            header={
            <Header variant="h1" description="Create your demo idea">
                This is the main page
            </Header>
            }
            >
            <Table
            trackBy="name"
            ariaLabels={{
                selectionGroupLabel: "Items selection",
                allItemsSelectionLabel: ({ selectedItems }) =>
                `${selectedItems.length} ${
                    selectedItems.length === 1 ? "item" : "items"
                } selected`,
                itemSelectionLabel: ({ selectedItems }, item) => {
                const isItemSelected = selectedItems.filter(
                    i => i.name === item.name
                ).length;
                return `${item.name} is ${
                    isItemSelected ? "" : "not"
                } selected`;
                }
            }}
            columnDefinitions={[
                {
                id: "variable",
                header: "Variable name",
                cell: e => e.name,
                sortingField: "name"
                },
                {
                id: "value",
                header: "Text value",
                cell: e => e.alt,
                sortingField: "alt"
                },
                { id: "type", header: "Type", cell: e => e.type },
                {
                id: "description",
                header: "Description",
                cell: e => e.description
                },
                {
                id: "action",
                header: "Action",
                cell: e => e.description
                }
            ]}
            onSelectionChange={({ detail }) =>
                setSelectedItems(detail.selectedItems)
            }
            selectedItems={selectedItems}
            items={[
                {
                name: "Item 1",
                alt: "First",
                description: "This is the first item",
                type: "1A",
                size: "Small",
                action: "sdfas",
                },
                {
                name: "Item 2",
                alt: "Second",
                description: "This is the second item",
                type: "1B",
                size: "Large"
                },
                {
                name: "Item 3",
                alt: "Third",
                description: "-",
                type: "1A",
                size: "Large"
                },
                {
                name: "Item 4",
                alt: "Fourth",
                description: "This is the fourth item",
                type: "2A",
                size: "Small"
                },
                {
                name: "Item 5",
                alt: "-",
                description:
                    "This is the fifth item with a longer description",
                type: "2A",
                size: "Large"
                },
                {
                name: "Item 6",
                alt: "Sixth",
                description: "This is the sixth item",
                type: "1A",
                size: "Small"
                }
            ]}
            loadingText="Loading resources"
            selectionType="multi"
            visibleColumns={[
                "variable",
                "value",
                "type",
                "description",
                "action"
            ]}
            empty={
                <Box textAlign="center" color="inherit">
                <b>No resources</b>
                <Box
                    padding={{ bottom: "s" }}
                    variant="p"
                    color="inherit"
                >
                    No resources to display.
                </Box>
                <Button>Create resource</Button>
                </Box>
            }
            filter={
                <TextFilter filteringPlaceholder="Find resources" />
            }
            header={
                <Header
                counter={
                    selectedItems.length
                    ? "(" + selectedItems.length + "/10)"
                    : "(10)"
                }
                >
                Table with common features
                </Header>
            }
            pagination={
                <Pagination
                currentPageIndex={1}
                pagesCount={2}
                ariaLabels={{
                    nextPageLabel: "Next page",
                    previousPageLabel: "Previous page",
                    pageLabel: pageNumber =>
                    `Page ${pageNumber} of all pages`
                }}
                />
            }
            preferences={
                <CollectionPreferences
                title="Preferences"
                confirmLabel="Confirm"
                cancelLabel="Cancel"
                preferences={{
                    pageSize: 10,
                    visibleContent: [
                    "variable",
                    "value",
                    "type",
                    "description"
                    ]
                }}
                pageSizePreference={{
                    title: "Select page size",
                    options: [
                    { value: 10, label: "10 resources" },
                    { value: 20, label: "20 resources" }
                    ]
                }}
                visibleContentPreference={{
                    title: "Select visible content",
                    options: [
                    {
                        label: "Main distribution properties",
                        options: [
                        {
                            id: "variable",
                            label: "Variable name",
                            editable: false
                        },
                        { id: "value", label: "Text value" },
                        { id: "type", label: "Type" },
                        {
                            id: "description",
                            label: "Description"
                        }
                        ]
                    }
                    ]
                }}
                />
            }
            />
        </Form>
        </>
    )
}

export default Home;