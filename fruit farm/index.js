// const hello = "yumesh ban is doing leapfrog 60 days challenge";
// console.log(hello);
// Blocking , synchronous way
const rs = require("fs");
const http = require(`http`);
const url = require(`url`);

//FILE

// const textin = rs.readFileSync("./txt/input.txt", "utf-8");

// console.log(textin);

// const textout = `this is what we know about the avocado: ${textin}.
// Created on ${Date.now()}`;

// rs.writeFileSync("./txt/output.txt", textout);
// console.log("File Written");

// Non-Blocking , asynchronous way
// rs.readFile(`./txt/start.txt`, `utf-8`, (err, data1) => {
//   rs.readFile(`./txt/${data1}.txt`, `utf-8`, (err, data2) => {
//     console.log(data2);
//     rs.readFile(`./txt/append.txt`, `utf-8`, (err, data3) => {
//       console.log(data3);

//       rs.writeFile(`./txt/final.txt`, `${data2}\n ${data3}`, `utf-8`, (err) => {
//         console.log(`Your file has been written`);
//       });
//     });
//   });
// });
// console.log(`this should appear first`);

//SERVER

const data = rs.readFileSync(`./dev-data/data.json`, `utf-8`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === `/` || pathName === `/yumesh`) {
    res.end("Hello my name is yumesh");
  } else if (pathName === `/leapfrog`) {
    res.end("This is leapfrog 60 days challenge");
  } else if (pathName === `/api`) {
    res.writeHead(200, { "content-type": `application/json` });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": `text/html`,
    });
    res.end(`<h1>No route to for this url</h1>`);
  }
});
server.listen(8000, `127.0.0.1`, () => {
  console.log(`server is running on port 8000`);
});
