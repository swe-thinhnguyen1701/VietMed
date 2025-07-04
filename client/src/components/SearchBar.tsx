/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, InputGroup, InputRightElement, Button, Tooltip } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { LuSearch } from "react-icons/lu";

const SearchBar = () => {
    const handleSubmit = (values: { ndc: string }) => {
        if (!values.ndc) {
            return;
        }
        console.log("Submitted NDC:", values.ndc);
        
    };

    return (
        <Formik initialValues={{ ndc: "" }} onSubmit={handleSubmit}>
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <InputGroup>
                        <Field name="ndc">
                            {({ field }: { field: any }) => (
                                <Input {...field} placeholder="Enter NDC number..." />
                            )}
                        </Field>
                        <InputRightElement width="4.5rem">
                            <Tooltip label="Search" closeOnClick={false}>
                                <Button h="1.75rem" size="sm" type="submit" variant="ghost">
                                    <LuSearch />
                                </Button>
                            </Tooltip>
                        </InputRightElement>
                    </InputGroup>
                </Form>
            )}
        </Formik>
    );
};

export default SearchBar;
