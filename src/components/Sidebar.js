import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/lessons">Lessons</a></li>
          <li><a href="/vocabulary">Vocabulary</a></li>
          <li><a href="/exercises">Exercises</a></li>
          <li><a href="/progress">Progress</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar; 