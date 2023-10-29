import React, { useState } from 'react';
import DashboardLayout from '@/components/misc/dashboardLayout';
import StyledPanel from '@/styled-components/StyledPanel';

const Field = ({ label, type, value, onChange }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={styles.input}
    />
  </div>
);

const ProfileSettings = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    // Add code here to save the user's profile settings to your backend
  };

  return (
    <DashboardLayout>
      <StyledPanel>
        <h2>User Settings</h2>
        <Field
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Field
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Field
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="button" onClick={handleSave} style={styles.saveButton}>
          Save
        </button>
      </StyledPanel>
    </DashboardLayout>
  );
};

const styles = {
  field: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    width: '50%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  saveButton: {
    backgroundColor: '#002056',
    color: '#fff',
    padding: '10px',  
    border: 'none',
    width: '100px',  
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',  
  },

};

export default ProfileSettings;
