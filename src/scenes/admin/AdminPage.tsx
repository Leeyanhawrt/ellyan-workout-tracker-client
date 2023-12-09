import AdminNav from "./AdminNav";
import { Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import UserDetail from "./UserDetail";
import "/src/assets/stylesheets/pages/_p_admin.scss";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = ({}) => {
  return (
    <div id="admin">
      <AdminNav />
      <Routes>
        <Route path="manage_users" element={<UsersList />} />
        <Route path="manage_users/:userId" element={<UserDetail />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
