const EventEmitters = require("events");
const http = require("http");

const myEmitter = new EventEmitters();

class Sales extends EventEmitters {
  constructor() {
    super();
  }
}

myEmitter.on(`newSale`, () => {
  console.log("There was a new sale ");
});

myEmitter.on("newSale", () => {
  console.log("Customer name:Yumesh");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items in stock`);
});

myEmitter.emit("newSale", 9);

///////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request Received");
  res.end("Request Received");
});

server.on("request", (req, res) => {
  console.log("Another Request Received");
});

server.on("closed", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests");
});
