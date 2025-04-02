import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="/">
              <HomeIcon className="menu-icon" />
              Home
            </a>
          </li>
          <li>
            <a href="/lessons">
              <SchoolIcon className="menu-icon" />
              Lessons
            </a>
          </li>
          <li>
            <a href="/vocabulary">
              <MenuBookIcon className="menu-icon" />
              Vocabulary
            </a>
          </li>
          <li>
            <a href="/exercises">
              <AssignmentIcon className="menu-icon" />
              Exercises
            </a>
          </li>
          <li>
            <a href="/progress">
              <TrendingUpIcon className="menu-icon" />
              Progress
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar; 