import { useQuery } from "@apollo/client";
import { GET_MEDICINE_BY_NDC } from "../graphql/queries";
import useSearchStore from "../state-management/search/store";
import { Box, Heading, Spinner } from "@chakra-ui/react";

const SearchResult = () => {
    const { searchQuery } = useSearchStore();
    const { data, loading, error } = useQuery(GET_MEDICINE_BY_NDC, {
        variables: { ndc: searchQuery },
        skip: !searchQuery // Skip the query if searchQuery is empty
    });

    if (loading) return <Spinner />;
    if (error) return <Heading as="h1">{error.cause?.extensions ? error.cause.extensions.code : error.message}</Heading>;
    if (!data || !data.getMedicineByNDC) {
        return
    }
    const medicine = data.getMedicineByNDC;
    return (
        <Box>
            <Heading as="h1">{medicine.brand_name}</Heading>
        </Box>
    );
}

export default SearchResult;