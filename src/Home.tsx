// src/pages/Home.tsx
import React from "react";
import CrudTable from "./CrudT1able";

const Home: React.FC = () => {
  return (
    <div>
      <h2>ユーザー管理</h2>
      <CrudTable />
    </div>
  );
};

export default Home;
