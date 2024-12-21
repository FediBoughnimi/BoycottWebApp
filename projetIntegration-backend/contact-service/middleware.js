const Keycloak = require('keycloak-connect');
const session = require('express-session');

const memoryStore = new session.MemoryStore();
const kcConfig = {
  clientId: "boycottApp",
  bearerOnly: true,
  serverUrl: "http://localhost:8080",
  realm: "myrealm",
  realmPublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtG4MuLoLh/ocweYo3xPTsm95yvbLUkVkgNZQve/O/YRiKTNjDqwF0wESFEzCeyKi7fBgGr7OsmrdJV3xkvMXtch+KKrZg40xblAEoEpaHB5wkOWI+5X5YuUq5u2tUES4A00rOOgNoDZ1FKm90ogw9vnohnVLRlmAnRfnna5eY99gBJeOzQYRMqF0X9aeD2oOuavYMd4pPCD70Klnnv49+U4KOmTBHexY1/w8qgqEFUbE07Sjn98yEx5aemzmljqUmk/iGHHMj0ZkvyqEljijRqPxqmv/uZKh3TTq8OCDGtILJOJScFJzeZKYSltI41nPr/M+IdSXZ7sz0r+Al3uFgwIDAQAB",
};

const keycloak = new Keycloak({ store: memoryStore }, kcConfig);
module.exports = { keycloak };
