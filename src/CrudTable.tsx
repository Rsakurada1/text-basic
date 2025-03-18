import React, { useState } from "react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { Box, Button, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "./TableData";

const LOCAL_STORAGE_KEY = "crud-table-data";

// `localStorage` からデータを取得する関数
const getInitialData = (): User[] => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

const CrudTable: React.FC = () => {
  const [data, setData] = useState<User[]>(getInitialData()); // 初期値を `localStorage` から取得

  // データを `localStorage` に保存
  const saveToLocalStorage = (updatedData: User[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
  };

  // 新しい空のレコードを追加
  const handleAddEmptyRow = () => {
    const newId = data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
    const newRow: User = { id: newId, name: "", age: 0, city: "" }; // 空のデータを追加
    const newData = [...data, newRow];
    setData(newData);
    saveToLocalStorage(newData); // ✅ 追加時にキャッシュ
  };

  // **行を編集して保存したときに `localStorage` に保存**
  const handleSaveRow = ({
    values,
    row,
    exitEditingMode,
  }: {
    values: User;
    row: MRT_Row<User>;
    exitEditingMode: () => void;
  }) => {
    const updatedData = data.map((item) =>
      item.id === row.original.id ? { ...item, ...values } : item
    );
    setData(updatedData);
    saveToLocalStorage(updatedData); // ✅ `localStorage` に保存
    exitEditingMode(); // ✅ 編集モードを終了
  };

  // レコードを削除
  const handleDeleteUser = (row: MRT_Row<User>) => {
    const updatedData = data.filter((item) => item.id !== row.original.id);
    setData(updatedData);
    saveToLocalStorage(updatedData);
  };

  const columns: MRT_ColumnDef<User>[] = [
    { accessorKey: "id", header: "ID", enableEditing: false },
    { accessorKey: "name", header: "名前" },
    { accessorKey: "age", header: "年齢" },
    { accessorKey: "city", header: "都市" },
  ];

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
        enableRowActions
        onEditingRowSave={handleSaveRow} // ✅ `onEditingRowSave` を適用
        renderRowActions={({ row }) => (
          <>
            {/* 保存ボタン */}
            <IconButton
              color="primary"
              onClick={() =>
                handleSaveRow({ values: row.original, row, exitEditingMode: () => {} })
              }
            >
              <SaveIcon />
            </IconButton>
            {/* 削除ボタン */}
            <IconButton color="error" onClick={() => handleDeleteUser(row)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      />
    </Box>
  );
};

export default CrudTable;
