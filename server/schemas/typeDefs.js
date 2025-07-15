const typeDefs = `
    type openFDA {
        brand_name: [String]
        package_ndc: [String]
        product_type: [String]
    }

    type PrescriptionMedicine {
        active_ingredient: [String]
        purpose: [String]
        indications_and_usage: [String]
        dosage_and_administration: [String]
        dosage_forms_and_strengths: [String]
        contraindications: [String]
        warnings_and_cautions: [String]
        adverse_reactions: [String]
        drug_interactions: [String]
        use_in_specific_populations: [String]
        pregnancy: [String]
        pediatric_use: [String]
        geriatric_use: [String]
        overdosage: [String]
        description: [String]
        clinical_pharmacology: [String]
        mechanism_of_action: [String]
        pharmacodynamics: [String]
        pharmacokinetics: [String]
        nonclinical_toxicology: [String]
        carcinogenesis_and_mutagenesis_and_impairment_of_fertility: [String]
        animal_pharmacology_and_or_toxicology: [String]
        clinical_studies: [String]
        storage_and_handling: [String]
        information_for_patients: [String]
        openfda: openFDA
    }

    type OTCMedicine {
        active_ingredient: [String]
        purpose: [String]
        indications_and_usage: [String]
        warnings: [String]
        do_not_use: [String]
        ask_doctor: [String]
        ask_doctor_or_pharmacist: [String]
        stop_use: [String]
        pregnancy_or_breast_feeding: [String]
        keep_out_of_reach_of_children: [String]
        dosage_and_administration: [String]
        storage_and_handling: [String]
        inactive_ingredients: [String]
        openfda: openFDA
    }

    union Medicine = OTCMedicine | PrescriptionMedicine


    type MedicineResponse {
        brand_name: [String]
    }

    type Query {
        getMedicineByNDC(ndc: String!): Medicine
    }
`;

module.exports = typeDefs;