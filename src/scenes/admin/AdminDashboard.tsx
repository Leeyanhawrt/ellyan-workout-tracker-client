import AdminNav from "./AdminNav";
import { Route, Routes } from "react-router-dom";
import UsersTable from "./UsersTable";
import AdminUserProfile from "./AdminUserProfile";
import "/src/assets/stylesheets/pages/_p_admin.scss";
import WorkoutsTable from "./WorkoutsTable";
import WorkoutProgram from "../dashboard/WorkoutProgram";
import ExerciseList from "../dashboard/ExerciseList";
import { ImpersonateUserProvider } from "../../contexts/ImpersonateUserContext";

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = ({}) => {
  return (
    <ImpersonateUserProvider>
      <div id="admin">
        <AdminNav />
        <div className="admin-content">
          <Routes>
            <Route path="manage_users" element={<UsersTable />} />
            <Route path="manage_users/:userId" element={<AdminUserProfile />} />
            <Route path="workout_programs" element={<WorkoutsTable />} />
            {/* <Route path="exercises" element={<ExerciseList />} /> */}
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
    </ImpersonateUserProvider>
  );
};

export default AdminDashboard;
