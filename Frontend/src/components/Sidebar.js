import React from 'react';
import { FaInbox, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons/fa
import './Sidebar.css'; // Import your custom CSS file

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="user-info">
        <div className="user-name">John Doe</div>
      </div>
      <div className="inbox">
        <FaInbox className="inbox-icon" />
        Inbox
      </div>
      <div className="sign-out">
        <FaSignOutAlt className="sign-out-icon" />
        Sign Out
      </div>
    </div>
  );
}

export default Sidebar;
