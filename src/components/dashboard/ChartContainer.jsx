import React from "react";
import { Card, CardContent } from "@mui/material";
import Chart from "./Chart";

const ChartContainer = ({ totalIncome, totalExpenses }) => (
  <Card>
    <CardContent>
      <h6 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "bold", color: '#446c9c' }}>
        Income vs Expenses
      </h6>
      <Chart totalIncome={totalIncome} totalExpenses={totalExpenses} />
    </CardContent>
  </Card>
);

export default ChartContainer;
