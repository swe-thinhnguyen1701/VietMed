import { gql } from "@apollo/client";

export const GET_MEDICINE_BY_NDC = gql`
    query GetMedicineByNDC($ndc: String!) {
        getMedicineByNDC(ndc: $ndc) {
            brand_name
        }
    }
`