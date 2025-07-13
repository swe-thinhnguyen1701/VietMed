const resolvers = {
    // Medicine: {
    //     __resolveType(obj) {
    //         if (
    //             obj.openfda?.product_type?.[0] === "HUMAN PRESCRIPTION DRUG" // optional fallback
    //         ) {
    //             return "PrescriptionMedicine";
    //         }
    //         return "OTCMedicine";
    //     }
    // },
    Query: {
        // getMedicineByNDCTest: async (_, { ndc }) => {
        //     // STEP 1: look up the ndc in our database
        //     // if found return the data

        //     // if not found, then search in the RxNorm API
        //     console.log(`Searching for NDC: ${ndc}`);
        //     const rxNormResponse = await fetch(`https://rxnav.nlm.nih.gov/REST/ndcstatus.json?ndc=${ndc}`);
        //     const rxNormData = await rxNormResponse.json();
        //     if (rxNormData.ndcStatus.status === "UNKNOWN"
        //         || !rxNormData.ndcStatus.rxcui
        //         || ndc.length !== 13) {
        //         // throw error message with error code 404
        //         throw new Error(`NDC ${ndc} not found`);
        //     }

        //     // look up the rxcui in the FDA to fetch data
        //     const fdaResponse = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.rxcui:${rxNormData.ndcStatus.rxcui}`);
        //     const fdaData = await fdaResponse.json();
        //     if (!fdaData.results[0]) {
        //         // throw error message with error code 404
        //         throw new Error(`NDC ${ndc} not found`);
        //     }
        //     // store the modified data to the database
        //     // return modified data
        //     const medicine = fdaData.results[0];
        //     return fdaData.results[0];
        // },
        getMedicineByNDC: async (_, { ndc }) => {
            const rxNormResponse = await fetch(`https://rxnav.nlm.nih.gov/REST/ndcstatus.json?ndc=${ndc}`);
            console.log(`Searching for NDC: ${ndc}`);
            if (!rxNormResponse.ok) {
                // throw error message with error code 404
                throw new Error(`NDC ${ndc} not found`);
            }
            const rxNormData = await rxNormResponse.json();
            // if (rxNormData.ndcStatus.status === "UNKNOWN"
            //     || !rxNormData.ndcStatus.rxcui
            //     || ndc.length !== 13) {
            //     // throw error message with error code 404
            //     throw new Error(`NDC ${ndc} not found`);
            // }

            // look up the rxcui in the FDA to fetch data
            const fdaResponse = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.rxcui:${rxNormData.ndcStatus.rxcui}`);
            const fdaData = await fdaResponse.json();
            if (!fdaData.results[0]) {
                // throw error message with error code 404
                throw new Error(`NDC ${ndc} not found`);
            }

            console.log(`Found NDC: ${ndc}`);

            return fdaData.results[0].openfda;
        }
    }
};

module.exports = resolvers;