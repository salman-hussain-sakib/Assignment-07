import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTimeline } from '../context/TimelineContext';
import friendsData from '../data/friends.json';
import Toast from '../components/Toast';
import './Frienddetails.css';

function FriendDetails() {
  const { id } = useParams();
  const friend = friendsData.find(f => f.id === parseInt(id));
  const { addEntry } = useTimeline();
  const [toast, setToast] = useState(null);

  if (!friend) {
    return <div className="not-found">Friend not found</div>;
  }

  // Show toast notification
  const showToast = (message) => {
    setToast({ message, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle interaction buttons (Call, Text, Video)
  const handleInteraction = (type) => {
    addEntry(friend.name, type);
    showToast(`${type} logged with ${friend.name}! ✓`);
  };

  const statusColors = {
    'overdue': '#ef4444',
    'almost due': '#f59e0b',
    'on-track': '#10b981',
  };

  return (
    <div className="friend-details">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="details-container">
        {/* Left Column - Friend Info Card */}
        <div className="left-column">
          <div className="friend-card-detail">
            {/* Friend Picture */}
            <div className="detail-image">
              <img src={friend.picture} alt={friend.name} />
            </div>

            {/* Friend Name & Status */}
            <h1>{friend.name}</h1>
            <div
              className="status-badge-large"
              style={{ backgroundColor: statusColors[friend.status] }}
            >
              {friend.status}
            </div>

            {/* Tags */}
            <div className="detail-tags">
              {friend.tags.map((tag, idx) => (
                <span key={idx} className="detail-tag">{tag}</span>
              ))}
            </div>

            {/* Work Bio - "Former colleague, great mentor" */}
            {friend.work_bio && (
              <p className="work-bio">"{friend.work_bio}"</p>
            )}

            
            {friend.email && (
              <div className="email-address">
                {friend.email}
              </div>
            )}

            {/* Old Bio (if exists and no work_bio) */}
            {friend.bio && !friend.work_bio && (
              <p className="bio">{friend.bio}</p>
            )}

            {/* Action Buttons */}
            <div className="action-buttons">
              {/* SNOOZE BUTTON - PNG ICON */}
              <button className="action-btn snooze-btn" title="Snooze 2 Weeks">
                <img src="/assets/Snooze.png" alt="Snooze" className="action-icon" />
                <span>Snooze 2 Weeks</span>
              </button>

              {/* ARCHIVE BUTTON - PNG ICON */}
              <button className="action-btn archive-btn" title="Archive">
                <img src="/assets/Archive.png" alt="Archive" className="action-icon" />
                <span>Archive</span>
              </button>

              {/* DELETE BUTTON - PNG ICON */}
              <button className="action-btn delete-btn" title="Delete">
                <img src="/assets/Delete.png" alt="Delete" className="action-icon" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Stats and Interactions */}
        <div className="right-column">
          {/* Stats Cards */}
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Days Since Contact</h3>
              <p className="stat-value">{friend.days_since_contact}</p>
              <span className="stat-label">days</span>
            </div>
            <div className="stat-card">
              <h3>Goal</h3>
              <p className="stat-value">{friend.goal}</p>
              <span className="stat-label">days</span>
            </div>
            <div className="stat-card">
              <h3>Next Due Date</h3>
              <p className="stat-value">{new Date(friend.next_due_date).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Relationship Goal Card */}
          <div className="goal-card">
            <div className="goal-header">
              <h2>Relationship Goal</h2>
              <button className="edit-btn">Edit</button>
            </div>
            <p className="goal-text">
              Contact {friend.name} every <strong>{friend.goal} days</strong>
            </p>
            <div className="goal-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min((friend.days_since_contact / friend.goal) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="progress-text">
                {Math.round((friend.days_since_contact / friend.goal) * 100)}% overdue
              </p>
            </div>
          </div>

          {/* Quick Check-In Card */}
          <div className="checkin-card">
            <h2>Quick Check-In</h2>
            <div className="checkin-buttons">
              {/* CALL ICON - PNG */}
              <button
                className="checkin-btn call-btn"
                onClick={() => handleInteraction('Call')}
                title="Call"
              >
                <img src="/assets/call.png" alt="Call" className="checkin-icon" />
                <span>Call</span>
              </button>
              {/* TEXT ICON - PNG */}
              <button
                className="checkin-btn text-btn"
                onClick={() => handleInteraction('Text')}
                title="Text"
              >
                <img src="/assets/text.png" alt="Text" className="checkin-icon" />
                <span>Text</span>
              </button>
              {/* VIDEO ICON - PNG */}
              <button
                className="checkin-btn video-btn"
                onClick={() => handleInteraction('Video')}
                title="Video"
              >
                <img src="/assets/video.png" alt="Video" className="checkin-icon" />
                <span>Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendDetails;