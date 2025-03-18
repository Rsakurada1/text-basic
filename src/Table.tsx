// src/components/DataTable.tsx
import React from "react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";
import { columns } from "./TableColumns"
import { mockData } from "./TableData";

const DataTable: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <MaterialReactTable columns={columns} data={mockData} />
    </Box>
  );
};

export default DataTable;
