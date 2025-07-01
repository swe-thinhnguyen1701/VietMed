const modifyData = require("./server/utils/modifyData")
const ndc = "50580-522-24"
const getData = async () => {
    try {
        const rxNormResponse = await fetch(`https://rxnav.nlm.nih.gov/REST/ndcstatus.json?ndc=${ndc}`);
        const rxNormData = await rxNormResponse.json();
        if (rxNormData.ndcStatus.status === "UNKNOWN" || !rxNormData.ndcStatus.rxcui) {
            console.log("NDC not found");
            return
        }
        const fdaResponse = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.rxcui:${rxNormData.ndcStatus.rxcui}`);
        const fdaData = await fdaResponse.json();
        console.log(rxNormData);
        console.log(fdaData.results[0]);
        const modifiedData = modifyData(fdaData.results[0]);
        modifiedData.ndc = ndc; // add the ndc to the modified data
        modifiedData.rxcui = rxNormData.ndcStatus.rxcui;
        console.log(modifiedData);
    } catch (error) {
        console.log(error);
    }
}

getData();