import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import useAuthStore from '../store/authStore';

function Sidebar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/">
              <HomeIcon className="menu-icon" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/lessons">
              <SchoolIcon className="menu-icon" />
              Lessons
            </Link>
          </li>
          <li>
            <Link to="/vocabulary">
              <MenuBookIcon className="menu-icon" />
              Vocabulary
            </Link>
          </li>
          {isAuthenticated && (
          <li>
              <Link to="/create-exam">
              <AssignmentIcon className="menu-icon" />
              Create Exam Practice
              </Link>
          </li>
          )}
          <li>
            <Link to="/progress">
              <TrendingUpIcon className="menu-icon" />
              Progress
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="#" onClick={(e) => e.preventDefault()}>
                <DownloadIcon className="menu-icon" />
                Export personal data
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <Link to="/knowtime-study-set">
                <AddIcon className="menu-icon" />
                Create a study set powered by Knowtime
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar; 