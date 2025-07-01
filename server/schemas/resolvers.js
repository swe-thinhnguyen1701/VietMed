const modifyData = require("../utils/modifyData");

const resolvers = {
    Query: {
        getMedicineByNDC: async (_, { ndc }) => {
            // STEP 1: look up the ndc in our database
            // if found return the data

            // if not found, then search in the RxNorm API
            console.log(`Searching for NDC: ${ndc}`);
            const rxNormResponse = await fetch(`https://rxnav.nlm.nih.gov/REST/ndcstatus.json?ndc=${ndc}`);
            const rxNormData = await rxNormResponse.json();
            if (rxNormData.ndcStatus.status === "UNKNOWN" || !rxNormData.ndcStatus.rxcui) {
                // throw error message with error code 404
                throw new Error(`NDC ${ndc} not found`);
            }

            // look up the rxcui in the FDA to fetch data
            const fdaResponse = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.rxcui:${rxNormData.ndcStatus.rxcui}`);
            const fdaData = await fdaResponse.json();
            if (!fdaData.results[0]) {
                // throw error message with error code 404
                throw new Error(`NDC ${ndc} not found`);
            }
            // modify the data and store it to the database
            const modifiedData = modifyData(fdaData.results[0]);
            modifiedData.ndc = ndc; // add the ndc to the modified data
            modifiedData.rxcui = rxNormData.ndcStatus.rxcui;
            // console.log(modifiedData);
            // store the modified data to the database
            // return modified data
            return modifiedData;
        },
    }
};

module.exports = resolvers;