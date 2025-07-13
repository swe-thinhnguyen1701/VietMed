import useSearchStore from "../state-management/search/store";
import { Formik } from 'formik';
import { Button, Input, InputGroup, InputRightElement, Tooltip } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

const SearchBar = () => {
    const onSubmit = (values: { search: string }, { resetForm }: { resetForm: () => void }) => {
        const searchStore = useSearchStore.getState();
        searchStore.setSearchQuery(values.search);
        resetForm();
    };

    return (
        <Formik
            initialValues={{ search: '' }}
            onSubmit={onSubmit}
        >
            {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Input
                            name="search"
                            value={values.search}
                            onChange={handleChange}
                            placeholder="Search..."
                            size="md"
                        />
                        <InputRightElement>
                            <Tooltip label="Search">
                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    variant="ghost"
                                    size="sm"
                                    border="none"
                                >
                                    <LuSearch />
                                </Button>
                            </Tooltip>
                        </InputRightElement>
                    </InputGroup>
                </form>
            )}

        </Formik>
    )
}

export default SearchBar;