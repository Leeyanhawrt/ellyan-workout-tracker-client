import AdminNav from "./AdminNav";
import { Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = ({}) => {
  return (
    <div id="admin">
      <AdminNav />
      <Routes>
        <Route path="manage_users" element={<UsersList />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
