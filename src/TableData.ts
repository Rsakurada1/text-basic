// src/components/TableData.ts
export type User = {
    id: number;
    name: string;
    age: number;
    city: string;
  };
  
  export const mockData: User[] = [
    { id: 1, name: "山田 太郎", age: 25, city: "東京" },
    { id: 2, name: "佐藤 花子", age: 30, city: "大阪" },
    { id: 3, name: "田中 一郎", age: 28, city: "福岡" },
    { id: 4, name: "鈴木 次郎", age: 40, city: "名古屋" },
  ];
  