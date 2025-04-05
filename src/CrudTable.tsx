import React, { useState, useMemo } from "react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "./TableData";
// 例:
// export interface User {
//   id: number;
//   name: string;
//   age: number;
//   city: string;
// }

const LOCAL_STORAGE_KEY = "crud-table-data";

const getInitialData = (): User[] => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

const CrudTable: React.FC = () => {
  const [data, setData] = useState<User[]>(getInitialData());
  // 編集中の行のID（何も編集中でなければ null）
  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  const saveToLocalStorage = (updatedData: User[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
  };

  // 新規追加時、追加後にその行を編集モードにする
  const handleAddEmptyRow = () => {
    const newId = data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
    const newRow: User = { id: newId, name: "", age: 0, city: "" };
    const newData = [...data, newRow];
    setData(newData);
    saveToLocalStorage(newData);
    // 新規追加直後は、そのレコードを編集モードにする
    setEditingRowId(newId);
  };

  // 編集保存時（MRT のビルトイン編集モードで各セルの入力値は values として渡される）
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
    saveToLocalStorage(updatedData);
    exitEditingMode(); // MRT の内部編集モードを解除
    setEditingRowId(null); // 外部の編集中フラグも解除
  };

  // 削除時の処理
  const handleDeleteUser = (row: MRT_Row<User>) => {
    const updatedData = data.filter((item) => item.id !== row.original.id);
    setData(updatedData);
    saveToLocalStorage(updatedData);
    if (editingRowId === row.original.id) {
      setEditingRowId(null);
    }
  };

  // 列定義。enableEditing を指定すれば MRT が自動でセルを入力フィールドに切り替えます。
  const columns: MRT_ColumnDef<User>[] = useMemo(
    () => [
      { accessorKey: "id", header: "ID", enableEditing: false },
      { accessorKey: "name", header: "名前" },
      { accessorKey: "age", header: "年齢" },
      { accessorKey: "city", header: "都市" },
    ],
    []
  );

  return (
    <Box sx={{ padding: 2 }}>
      {/* 追加ボタン：編集中の場合は disabled */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEmptyRow}
        sx={{ marginBottom: 2 }}
        disabled={editingRowId !== null}
      >
        新しいレコードを追加
      </Button>

      <MaterialReactTable
        columns={columns}
        data={data}
        // enableEditing を関数で制御。編集中の行のみ MRT が編集モードにする。
        enableEditing={(row: MRT_Row<User>) =>
          row.original.id === editingRowId
        }
        editDisplayMode="table"
        onEditingRowSave={handleSaveRow}
        enableRowActions
        // セルのダブルクリックで自動編集モードに入らないように
        muiTableBodyCellProps={{
          onDoubleClick: (event) => event.stopPropagation(),
        }}
        renderRowActions={({ row, table }: { row: MRT_Row<User>; table: MRT_TableInstance<User> }) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            {/* 編集ボタンは、編集中でない行の場合にのみ表示し、編集中なら非活性 */}
            {editingRowId !== row.original.id && (
              <Tooltip title={editingRowId !== null ? "他の行が編集中です" : "編集"}>
                <span>
                  <IconButton
                    color="primary"
                    onClick={() => setEditingRowId(row.original.id)}
                    disabled={editingRowId !== null}
                  >
                    <EditIcon />
                  </IconButton>
                </span>
              </Tooltip>
            )}
            {/* 保存ボタン：対象行が編集中の場合にのみ表示 */}
            {editingRowId === row.original.id && (
              <Tooltip title="保存">
                <IconButton
                  color="primary"
                  onClick={() =>
                    handleSaveRow({
                      values: row.original, // MRT のビルトイン編集なら最新の値が values に自動反映
                      row,
                      exitEditingMode: () => table.setEditingRow(null),
                    })
                  }
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            )}
            {/* 削除ボタン */}
            <Tooltip title="削除">
              <IconButton
                color="error"
                onClick={() => handleDeleteUser(row)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </Box>
  );
};

export default CrudTable;
