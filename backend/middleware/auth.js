const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  // audience: "http://localhost:5600",
  // issuerBaseURL: `https://armanist.us.auth0.com/`,
  audience: process.env.AUTH0_API_IDENTIFIER,
  issuerBaseURL: process.env.AUTH0_ISSUER,
});

module.exports = { checkJwt };
