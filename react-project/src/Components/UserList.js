// src/components/UserList.js
import React from 'react';

const UserList = ({ users }) => {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
