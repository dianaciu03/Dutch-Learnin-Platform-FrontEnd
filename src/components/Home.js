import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          <h1>Welcome to SlimStudie Platform</h1>
          <p>Start your journey to learn Dutch!</p>
        </main>
      </div>
    </div>
  );
}

export default Home; 