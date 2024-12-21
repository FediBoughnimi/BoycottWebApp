const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Eureka } = require('eureka-js-client');
const cors = require('cors');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
const memoryStore = new session.MemoryStore();
const kcConfig = {
  clientId: "boycottApp",
  serverUrl: "http://localhost:8080",
  realm: "myrealm"   };

const keycloak = new Keycloak({ store: memoryStore }, kcConfig);
const protectedRoutes = keycloak.protect(); 

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/submission')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Import routes
const submissionRoutes = require("./routes/submissionRoutes");

// Use routes
app.use("/api/submissions", submissionRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Eureka configuration
const client = new Eureka({
  instance: {
    app: "node-service",
    hostName: "localhost",
    ipAddr: "127.0.0.1",
    statusPageUrl: `http://localhost:${port}`,
    port: {
      $: port,
      "@enabled": "true",
    },
    vipAddress: "node-service",
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
  },
  eureka: {
    host: "localhost",
    port: 8761,
    servicePath: "/eureka/apps/",
  },
});

// Start Eureka registration
client.start((error) => {
  if (error) {
    console.log("Error registering with Eureka:", error);
  } else {
    console.log("Node service registered with Eureka on port 8761");
  }
});
