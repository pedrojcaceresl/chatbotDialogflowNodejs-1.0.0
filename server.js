const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

// for parsing json
app.use(
  bodyParser.json({
    limit: "20mb",
  })
);
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "20mb",
  })
);

const accountSid = "ACc1f6d1e31f0f1370d8b7f2dd722ab091";
const authToken = "77e793790529c4f25ead3c4fe60cabaf";
const client = require("twilio")(accountSid, authToken);


app.use("/messenger", require("./Facebook/facebookBot"));

app.get("/", (req, res) => {
  return res.send("Chatbot Funcionando 🤖🤖🤖");
});

app.post("/whatsapp", (req, res) => {
  const message = req.body;
  // Do whatever you want with the message

  
client.messages
	.create({
		body: message,
		from: "whatsapp:+14155238886",
		to: "whatsapp:+595985586401",
	})
	.then((message) => console.log(message.sid))
	.done();


  res.send({
    ok: true,
    message: "Received message"
  })
})

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
