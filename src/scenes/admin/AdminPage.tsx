import AdminNav from "./AdminNav";
import { Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import UserDetailForm from "./UserDetailForm";
import "/src/assets/stylesheets/pages/_p_admin.scss";
import WorkoutProgramList from "./WorkoutProgramList";
import WorkoutProgram from "../dashboard/WorkoutProgram";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = ({}) => {
  return (
    <div id="admin">
      <AdminNav />
      <div className="admin-content">
        <Routes>
          <Route path="manage_users" element={<UsersList />} />
          <Route path="manage_users/:userId" element={<UserDetailForm />} />
          <Route path="workout_programs" element={<WorkoutProgramList />} />
          <Route
            path="workout_programs/:id"
            element={<WorkoutProgram edittable />}
          />
          <Route
            path="impersonate_user/:id"
            element={<WorkoutProgram impersonate />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
