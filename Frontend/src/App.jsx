import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import AddUserForm from './components/AddUserForm';
import UserCard from './components/UserCard';

const API_URL = 'http://localhost:3000/users';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [status, setStatus] = useState({ message: '', isError: false });

  const showStatus = (message, isError = false) => {
    setStatus({ message, isError });
    setTimeout(() => {
      setStatus({ message: '', isError: false });
    }, 3000);
  };

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch users');
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      showStatus('Error loading users. Is the backend running?', true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async (newUser) => {
    setIsAdding(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) throw new Error('Failed to add user');

      showStatus('User added successfully!');
      fetchUsers();
      return true;
    } catch (error) {
      console.error('Error adding user:', error);
      showStatus('Error adding user. Try again.', true);
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete user');
      
      showStatus('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      showStatus('Error deleting user. Try again.', true);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>User Directory</h1>
        <p>Manage your team members with style (React Edition)</p>
      </header>

      <AddUserForm onAddUser={handleAddUser} isLoading={isAdding} />

      {status.message && (
        <div style={{textAlign: 'center', marginBottom: '1rem'}}>
          <div className={`status-message ${status.isError ? 'error' : 'success'}`}>
            {status.message}
          </div>
        </div>
      )}

      <div className="glass-panel">
        <div className="section-header">
          <h2>Current Users</h2>
          <button 
            className="btn-icon" 
            onClick={fetchUsers}
            aria-label="Refresh users list"
            disabled={isLoading}
          >
            <RefreshCw size={20} className={isLoading ? 'spinning' : ''} />
          </button>
        </div>

        <div className="users-list-container">
          {isLoading && users.length === 0 ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Fetching users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="loading-state">
              <p>No users found. Add one above!</p>
            </div>
          ) : (
            <div className="users-grid">
              {users.map((user, index) => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  index={index} 
                  onDelete={handleDeleteUser} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
