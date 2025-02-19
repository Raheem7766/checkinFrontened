import axios from "axios";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const fetchUsers = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.error("No token found in localStorage");
  //       setError("No authentication token found. Please log in.");
  //       return;
  //     }

  //     const response = await axios.get("http://localhost:5001/api/v1/admin/users", {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Correct token format
  //       },
  //       withCredentials: true, // Include cookies if required
  //     });

  //     // Directly access response data
  //     if (response.data.success) {
  //       setUsers(response.data.users);
  //       setError(null); // Clear errors if successful
  //     } else {
  //       console.error("Failed to fetch users:", response.data.message);
  //       setError(response.data.message || "Failed to fetch users.");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching users:", err);
  //     setError(err.message || "An error occurred while fetching users.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Users List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
