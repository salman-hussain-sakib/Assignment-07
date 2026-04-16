import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import friendsData from '../data/friends.json';
import './Home.css';

function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = {
    totalFriends: friends.length,
    onTrackCount: friends.filter(f => f.status === 'on-track').length,
    needAttentionCount: friends.filter(f => f.status === 'overdue' || f.status === 'almost due').length,
    interactionsThisMonth: 12,
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home-container">
        <section className="banner">
          <div className="banner-content">
            <h1>Friends to keep close in your life</h1>
            <p>Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>
            <button className="add-friend-btn">
              <span className="plus-icon">+</span> Add a Friend
            </button>
          </div>
        </section>

        <section className="summary-section">
          <div className="summary-grid">
            <div className="summary-card">
              <h3 className="summary-value">{stats.totalFriends}</h3>
              <p className="summary-label">Total Friends</p>
            </div>
            <div className="summary-card">
              <h3 className="summary-value">{stats.onTrackCount}</h3>
              <p className="summary-label">On Track</p>
            </div>
            <div className="summary-card">
              <h3 className="summary-value">{stats.needAttentionCount}</h3>
              <p className="summary-label">Need Attention</p>
            </div>
            <div className="summary-card">
              <h3 className="summary-value">{stats.interactionsThisMonth}</h3>
              <p className="summary-label">Interactions This Month</p>
            </div>
          </div>
        </section>

        <section className="friends-section">
          <h2 className="friends-heading">Your Friends</h2>
          <div className="friends-grid">
            {friends.map(friend => {
              const statusClass = 
                friend.status === 'overdue' ? 'status-overdue' :
                friend.status === 'almost due' ? 'status-almost-due' : 'status-on-track';
              
              const statusText = 
                friend.status === 'overdue' ? 'Overdue' :
                friend.status === 'almost due' ? 'Almost Due' : 'On-Track';

              return (
                <Link to={`/friend/${friend.id}`} key={friend.id} className="friend-card-link">
                  <div className="friend-card">
                    <div className="friend-image">
                      <img src={friend.picture} alt={friend.name} />
                    </div>
                    <h3 className="friend-name">{friend.name}</h3>
                    <p className="friend-days">{friend.days_since_contact}d ago</p>
                    
                    <div className="friend-tags">
                      {friend.tags.slice(0, 2).map((tag, i) => (
                        <span 
                          key={i} 
                          className="friend-tag"
                          style={{
                            backgroundColor: '#CBFADB',
                            color: '#244D3F',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            marginRight: '6px'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className={`friend-status ${statusClass}`}>
                      {statusText}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;