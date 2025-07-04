const modifyData = (fdaData) => {
    const medicine = {};
    medicine.warnings = fdaData.warnings || [];
    medicine.warningsAndCautions = fdaData.warnings_and_cautions || [];
    medicine.description = fdaData.description || "";
    
    medicine.adverse_reactions = fdaData.adverse_reactions || [];

    return medicine
}

module.exports = modifyData ;