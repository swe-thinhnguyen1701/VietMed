const typeDefs = `
    type Medicine {
        brandName: String
        rxcui: String
        directions: String
        warnings: String
        sideEffects: String
        drugInteractions: String
        activeIngredients: String
    }

    type Query {
        getMedicineByNDC(ndc: String!): Medicine
    }
`;

module.exports = typeDefs;