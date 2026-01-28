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

const cron = require("node-cron");
const accountRepository = require("./src/repository/account.repository");
const budgetRepository = require("./src/repository/budget.repository");
const transactionRepository = require("./src/repository/transaction.repository");

cron.schedule("5 0 1 * *", async () => {
  console.log("Running monthly rollover job");
  try {
    const users = await accountRepository.getDistinctUserIds();
    const now = new Date();
    const prevMonth = now.getMonth() === 0 ? 12 : now.getMonth();
    const prevYear =
      now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

    for (const user of users) {
      const totalBudget = await budgetRepository.getBudgetTotalByMonth(
        user.user_id,
        prevMonth,
        prevYear,
      );
      const totalExpense = await transactionRepository.getExpenseTotalByMonth(
        user.user_id,
        prevMonth,
        prevYear,
      );
      const rollover = totalBudget - totalExpense;
      if (rollover > 0) {
        await accountRepository.incrementTotalSavingsByUserId(
          user.user_id,
          rollover,
        );
      }
    }
  } catch (err) {
    console.error("Error in monthly rollover job:", err);
  }
});
