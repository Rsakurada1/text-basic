import React, { useState } from "react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { User, mockData } from "./TableData";

const columns: MRT_ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID", enableEditing: false },
  { accessorKey: "name", header: "名前" },
  { accessorKey: "age", header: "年齢" },
  { accessorKey: "city", header: "都市" },
];

const CrudTable: React.FC = () => {
  const [data, setData] = useState<User[]>(mockData);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState<User>({ id: 0, name: "", age: 0, city: "" });

  // レコードを追加
  const handleAddUser = () => {
    setData([...data, { ...newUser, id: data.length + 1 }]);
    setNewUser({ id: 0, name: "", age: 0, city: "" });
    setOpen(false);
  };

  // レコードを更新
  const handleUpdateUser = async ({ values, row }: { values: User; row: MRT_Row<User> }) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === row.original.id ? { ...item, ...values } : item))
    );
  };

  // レコードを削除
  const handleDeleteUser = (row: MRT_Row<User>) => {
    setData(data.filter((item) => item.id !== row.original.id));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ marginBottom: 2 }}>
        新しいレコードを追加
      </Button>

      <MaterialReactTable
        columns={columns}
        data={data}
        enableEditing // ✅ enableEditing ではなく enableRowEditing を使う
        editDisplayMode="modal" // ✅ editingMode ではなく editDisplayMode を使う
        onEditingRowSave={handleUpdateUser}
        enableRowActions
        renderRowActions={({ row }) => (
          <Button color="error" onClick={() => handleDeleteUser(row)}>
            削除
          </Button>
        )}
      />

      {/* 新規レコード追加用のダイアログ */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>新しいレコードを追加</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="名前"
            fullWidth
            value={newUser.name}
            onChange={(e: { target: { value: any; }; }) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="年齢"
            type="number"
            fullWidth
            value={newUser.age}
            onChange={(e: { target: { value: any; }; }) => setNewUser({ ...newUser, age: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="都市"
            fullWidth
            value={newUser.city}
            onChange={(e: { target: { value: any; }; }) => setNewUser({ ...newUser, city: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>キャンセル</Button>
          <Button onClick={handleAddUser} color="primary">
            追加
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CrudTable;
