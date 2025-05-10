const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/billing-statement", (req, res) => {
  let selectedNames = [];
  if (req.body.selectedNames) {
    try {
      selectedNames = JSON.parse(req.body.selectedNames);
    } catch (error) {
      console.error("Error parsing selectedNames:", error);
    }
  }

  const formData = req.body;

  // Calculate inside here
  const paymentPerMin = 65000 / 60;
  const totalBlockTimeMin = formData["block-time-min"];
  const landingFeePerCycle = formData["take-off-land-fee"];
  const noPrincipal = selectedNames;
  const addCycle = formData["add-cycle"];

  const amountBlockTime = totalBlockTimeMin * paymentPerMin;
  const amountLandingFee = landingFeePerCycle * 5000;
  const amountTerminalFee = (noPrincipal.length) * 500;

  let amountAddCycle;
  if (addCycle == 1) {
    amountAddCycle = 1000;
  } else if (addCycle > 1) {
    amountAddCycle = (addCycle - 1) * 2000 + 1000;
  } else {
    amountAddCycle = 0;
  }

  const sumBill = amountBlockTime + amountLandingFee + amountTerminalFee + amountAddCycle;
  console.log(formData);
  // Render page with both formData and sumBill
  res.render("bill", { data: formData, sumBill: sumBill });
});


app.listen(port, (req, res) => {
  console.log(`Port ${port} running`);
});

