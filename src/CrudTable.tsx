import React, { useState } from "react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import { User, mockData } from "./TableData";

const columns: MRT_ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID", enableEditing: false },
  { accessorKey: "name", header: "名前" },
  { accessorKey: "age", header: "年齢" },
  { accessorKey: "city", header: "都市" },
];

const CrudTable: React.FC = () => {
  const [data, setData] = useState<User[]>(mockData);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  // 新しい空のレコードを追加し、編集モードにする
  const handleAddEmptyRow = () => {
    const newId = data.length + 1;
    const newRow = { id: newId, name: "", age: 0, city: "" };
    setData([...data, newRow]);
    setEditingRowId(newId); // 追加した行の編集モードを有効にする
  };

  // レコードを編集したときにデータを更新する
  const handleUpdateUser = async ({ values, row }: { values: User; row: MRT_Row<User> }) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === row.original.id ? { ...item, ...values } : item))
    );
    setEditingRowId(null); // 編集が終わったら編集モードを解除
  };

  // レコードを削除する
  const handleDeleteUser = (row: MRT_Row<User>) => {
    setData(data.filter((item) => item.id !== row.original.id));
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* 追加ボタン */}
      <Button variant="contained" color="primary" onClick={handleAddEmptyRow} sx={{ marginBottom: 2 }}>
        新しいレコードを追加
      </Button>

      {/* テーブル */}
      <MaterialReactTable
        columns={columns}
        data={data}
        enableEditing
        editDisplayMode="table"
        onEditingRowSave={handleUpdateUser}
        enableRowActions
        getRowId={(row) => row.id.toString()} // 各行の識別に `id` を使用
        muiTableBodyRowProps={({ row }) => ({
          sx: {
            backgroundColor: row.original.id === editingRowId ? "rgba(0, 0, 255, 0.1)" : "inherit", // 編集モードの行を強調表示
          },
          onClick: () => setEditingRowId(row.original.id), // クリックで編集モードを有効化
        })}
        renderRowActions={({ row }) => (
          <Button color="error" onClick={() => handleDeleteUser(row)}>
            削除
          </Button>
        )}
      />
    </Box>
  );
};

export default CrudTable;
