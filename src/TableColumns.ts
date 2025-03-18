// src/components/TableColumns.ts
import { MRT_ColumnDef } from "material-react-table";
import { User } from "./TableData";

export const columns: MRT_ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableEditing: false, // IDは編集不可
  },
  {
    accessorKey: "name",
    header: "名前",
  },
  {
    accessorKey: "age",
    header: "年齢",
  },
  {
    accessorKey: "city",
    header: "都市",
  },
];
