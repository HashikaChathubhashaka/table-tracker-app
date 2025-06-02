import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface User {
  _id: string;
  email: string;
  name: string;
  role?: string;
}

const AdminSettings: React.FC = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/user/all', {
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchUsers();
  }, [token]);

  // Delete user
  const handleDelete = async (email: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch('http://localhost:3000/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers(users.filter((user) => user.email !== email));
    } catch (err) {
      alert('Error deleting user');
      console.error(err);
    }
  };

const [newUser, setNewUser] = useState({
  email: '',
  password: '',
  name: '',
  role: 'Normal',
});
const [adding, setAdding] = useState(false);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setNewUser({ ...newUser, [e.target.name]: e.target.value });
};

const handleAddUser = async (e: React.FormEvent) => {
  e.preventDefault();
  setAdding(true);
  try {
    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUser),
    });
    if (!res.ok) throw new Error('Failed to add user');
    const createdUser = await res.json();
    setUsers([...users, createdUser]);
    setNewUser({ email: '', password: '', name: '', role: 'Normal' });
  } catch (err) {
    alert('Error adding user');
    console.error(err);
  } finally {
    setAdding(false);
  }
};


  if (loading) return <div>Loading users...</div>;

  return (
    <div>

      <button>
        <a href="/home" style={{ textDecoration: 'none', color: 'inherit' }}>Back to Home</a>
      </button>

          <h2>Add new User</h2>
    <form onSubmit={handleAddUser} style={{ marginBottom: '1rem' }}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newUser.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={newUser.password}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Display Name"
        value={newUser.name}
        onChange={handleInputChange}
        required
      />
      <select
        name="role"
        value={newUser.role}
        onChange={handleInputChange}
        required
      >
        <option value="Normal">Normal</option>
        {/* <option value="Admin">Admin</option> */}
      </select>
      <button type="submit" disabled={adding}>
        {adding ? 'Adding...' : 'Add User'}
      </button>
    </form>


      <h2>Current users list</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role || '-'}</td>
              <td>
                {user.role != "Admin" ? (
                  <button onClick={() => handleDelete(user.email)}>
                    Delete
                  </button>
                ) : (
                    <button disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    Delete
                    </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSettings;