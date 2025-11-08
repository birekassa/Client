import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import Tasks from '../pages/employee/Tasks';
import Profile from '../pages/citizen/Profile';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
