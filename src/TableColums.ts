// src/components/TableColumns.ts
import { MRT_ColumnDef } from "material-react-table";
import { User } from "./TableData";

export const columns: MRT_ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 50, // カラム幅
  },
  {
    accessorKey: "name",
    header: "名前",
    size: 150,
  },
  {
    accessorKey: "age",
    header: "年齢",
    size: 100,
  },
  {
    accessorKey: "city",
    header: "都市",
    size: 120,
  },
];
