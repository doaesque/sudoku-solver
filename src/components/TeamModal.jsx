import React from 'react';
import '../App.css';

const TeamModal = ({ onClose }) => {
  const teamMembers = [
    { name: "Salmah", nim: "10124175", icon: "🐼" },
    { name: "Haliza", nim: "10124178", icon: "🦊" },
    { name: "Serena", nim: "10124463", icon: "🐱" },
    { name: "Hanna",  nim: "10124464", icon: "🐰" },
    { name: "Salsa",  nim: "10124465", icon: "🐨" },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ color: 'var(--panel-dark-pink)', margin: 0, marginBottom: '20px' }}>
          Meet The Team 💖
        </h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="avatar-placeholder">{member.icon}</div>
              <span className="member-name">{member.name}</span>
              <span className="member-nim">{member.nim}</span>
            </div>
          ))}
        </div>
        <button className="btn-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TeamModal;
