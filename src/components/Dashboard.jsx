import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import SummaryCard from "./dashboard/SummaryCard";
import TransactionTable from "./transactions/TransactionTable";
import EditTransactionForm from "./transactions/EditTransactionForm";
import ChartContainer from "./dashboard/ChartContainer";
import AddExpenses from "./transactions/AddExpenses";
import NavbarAfter from "./dashboard/NavbarAfter";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [editTransaction, setEditTransaction] = useState(null);

  // Get the logged-in user ID from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  const fetchTransactions = () => {
    fetch("http://localhost:3001/transactions")
      .then((response) => response.json())
      .then((data) => {
        // Filter transactions by ownerId (current user)
        const userTransactions = data.filter(
          (transaction) => transaction.ownerId === userId
        );
        setTransactions(userTransactions);
        calculateSummary(userTransactions);
      });
  };

  const calculateSummary = (data) => {
    const income = data
      .filter((transaction) => transaction.type === "income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expenses = data
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    setTotalIncome(income);
    setTotalExpenses(expenses);
  };

  const handleAddTransaction = (newTransaction) => {
    // Assign the ownerId (current user) to the new transaction
    const transactionWithOwner = { ...newTransaction, ownerId: userId };

    fetch("http://localhost:3001/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionWithOwner),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTransactions = [...transactions, data];
        setTransactions(updatedTransactions);
        calculateSummary(updatedTransactions);
      });
  };

  const handleDeleteTransaction = (id) => {
    fetch(`http://localhost:3001/transactions/${id}`, { method: "DELETE" })
      .then(() => {
        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== id
        );
        setTransactions(updatedTransactions);
        calculateSummary(updatedTransactions);
      });
  };

  const handleSaveUpdate = () => {
    fetch(`http://localhost:3001/transactions/${editTransaction.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTransactions = transactions.map((transaction) =>
          transaction.id === editTransaction.id ? data : transaction
        );
        setTransactions(updatedTransactions);
        calculateSummary(updatedTransactions);
        setEditTransaction(null);
      });
  };

  return (
    <>
      <NavbarAfter />
      <Box
        sx={{
          p: 3,
          mt: 10,
          backgroundColor: "#c4d4ec",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
          borderRadius: 2,
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Summary Cards Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ flex: 1, mx: 1 }}>
            <SummaryCard
              title="Total Income"
              amount={totalIncome}
              sx={{
                backgroundColor: "#B8B8FF",
                color: "black",
              }}
            />
          </Box>
          <Box sx={{ flex: 1, mx: 1 }}>
            <SummaryCard
              title="Total Expenses"
              amount={totalExpenses}
              sx={{
                backgroundColor: "#141122",
                color: "white",
              }}
            />
          </Box>
          <Box sx={{ flex: 1, mx: 1 }}>
            <SummaryCard
              title="Balance"
              amount={totalIncome - totalExpenses}
              sx={{
                backgroundColor: "#B8B8FF",
                color: "Black",
              }}
            />
          </Box>
        </Box>

        {/* Chart and Transaction Table Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ flex: 1, mr: 1 }}>
            <Paper>
              <ChartContainer
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
              />
            </Paper>
          </Box>
          <Box sx={{ flex: 1, ml: 1 }}>
            <Paper>
              <TransactionTable
                transactions={transactions}
                onEdit={setEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </Paper>
          </Box>
        </Box>

        {/* Add Transaction Section */}
        <Box sx={{ mt: 3 }}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: "#F8F7FF",
              backdropFilter: "blur(8px)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <AddExpenses onAddTransaction={handleAddTransaction} />
          </Paper>
        </Box>

        {/* Edit Transaction Form */}
        {editTransaction && (
          <Box sx={{ mt: 3 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#F8F7FF",
                backdropFilter: "blur(10px)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <EditTransactionForm
                transaction={editTransaction}
                setTransaction={setEditTransaction}
                onSave={handleSaveUpdate}
                onCancel={() => setEditTransaction(null)}
              />
            </Paper>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Dashboard;
