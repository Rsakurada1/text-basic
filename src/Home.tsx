// // src/pages/Home.tsx
// import React, { useEffect, useState } from "react";
// // import DataTable from "./TableData";
// // import { fetchUsers } from "../api/fetchData";
// // import { User } from "../components/TableData";
// const Home: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers()
//       .then((data: React.SetStateAction<User[]>) => {
//         setUsers(data);
//         setLoading(false);
//       })
//       .catch((error: any) => {
//         console.error("エラー:", error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>ユーザー一覧</h2>
//       {loading ? <p>データを読み込み中...</p> : <DataTable />}
//     </div>
//   );
// };

// export default Home;
