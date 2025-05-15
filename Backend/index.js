const express = require("express");
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: [process.env.FRONTEND_URL, "localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/user", require("./src/routes/user.route"));
app.use("/account", require("./src/routes/account.route"));
app.use("/saving-goals", require("./src/routes/saving_goals.route"));
app.use("/categories", require("./src/routes/categories.route"));
app.use("/transactions", require("./src/routes/transaction.route"));
app.use("/budgets", require("./src/routes/budget.route"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
