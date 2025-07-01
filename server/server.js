const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { resolvers, typeDefs } = require("./schemas");
// const path = require("path");

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

const startApolloServer = async () => {
    try {
        await server.start();

        app.use("/graphql", expressMiddleware(server, {
            context: async ({ req }) => ({ req }),
        }));

        if (process.env.NODE_ENV === "production") {
            app.use(express.static(path.join(__dirname, "../client/dist")));

            app.get("*", (_req, res) => {
                res.sendFile(path.join(__dirname, "../client/dist/index.html"))
            })
        }
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}/graphql`);
        });
    } catch (error) {
        console.error("Error starting Apollo Server:", error);
    }
}

startApolloServer();