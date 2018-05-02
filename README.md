# apps-orchestration

Built with GraphQL and Apollo Server for simplifying the request from the client applications.

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.  Please see http://graphql.org for more information.

Apollo Server is the underlying framework for making the schema and resolvers.  For more information please see http://www.apollographql.com


## Why Orchestrate
Reducing the amount of request from the client to the services will make the client more responsive.  The network is the bottleneck for all the request.  With every request, we incur the cost of DNS lookup, SSL Handshake, Authentication which makes up 80% of the request.  The server can quickly respond once the connection is stablished.  Combining the request from the client side and let the UI Engine to understand and carry all the request necessary saves a lot of time and resources.  


## Installation
```
# clone the application from git
git clone git@github.com:StockpileInc/apps-orchestration.git

# get inside the application folder
cd apps-orchestration

# install dependencies, please make sure that nodejs and npm are current
npm install
```

## Running
```
npm start
```

## Code Structure


