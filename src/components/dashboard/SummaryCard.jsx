import React from "react";
import { Card, CardContent } from "@mui/material";

const SummaryCard = ({ title, amount }) => (
  <Card>
    <CardContent>
      <h5 style={{ color: "#446c9c", marginBottom: "8px" }}>{title}</h5>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>₹{amount}</p>
    </CardContent>
  </Card>
);

export default SummaryCard;
