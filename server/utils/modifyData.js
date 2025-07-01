const modifyData = (fdaData) => {
    const medicine = {};
    medicine.brandName = fdaData.openfda.brand_name[0];
    medicine.directions = fdaData.dosage_and_administration[0];
    medicine.warnings = fdaData.warnings[0];
    medicine.sideEffects = fdaData.adverse_reactions ? fdaData.adverse_reactions : null;
    medicine.drugInteractions = fdaData.drug_interactions ? fdaData.drug_interactions : null;
    medicine.activeIngredients = fdaData.active_ingredient[0];

    return medicine
}

module.exports = modifyData ;