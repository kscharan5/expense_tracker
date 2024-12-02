import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  TableSortLabel,
  Box,
} from "@mui/material";

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState(null); // null indicates no sorting applied

  const handleSort = (key) => {
    setSortConfig((prevState) => ({
      key,
      direction: prevState?.key === key && prevState?.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleReset = () => {
    setSortConfig(null); // Reset sorting configuration
  };

  const sortedTransactions = sortConfig
    ? [...transactions].sort((a, b) => {
        const { key, direction } = sortConfig;
        const sortOrder = direction === "asc" ? 1 : -1;

        if (a[key] < b[key]) return -1 * sortOrder;
        if (a[key] > b[key]) return 1 * sortOrder;
        return 0;
      })
    : transactions; // Original order when sortConfig is null

  return (
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 380,
          overflowY: "auto",
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: 3,
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
                </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig?.key === "amount"}
                  direction={sortConfig?.key === "amount" ? sortConfig.direction : "asc"}
                  onClick={() => handleSort("amount")}
                >
                  Amount
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig?.key === "type"}
                  direction={sortConfig?.key === "type" ? sortConfig.direction : "asc"}
                  onClick={() => handleSort("type")}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                  "&:hover": { backgroundColor: "grey.100" },
                }}
              >
                <TableCell>{transaction.description}</TableCell>
                <TableCell>₹{transaction.amount}</TableCell>
                <TableCell
                  sx={{
                    color: transaction.type === "Income" ? "green" : "red",
                  }}
                >
                  {transaction.type}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => onEdit(transaction)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => onDelete(transaction.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default TransactionTable;
