import { useState } from 'react';
import { useTimeline } from '../context/TimelineContext';
import './Timeline.css';

function Timeline() {
  const { entries } = useTimeline();
  const [filterType, setFilterType] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredEntries = filterType === 'all'
    ? entries
    : entries.filter(entry => entry.type === filterType);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Call':
        return <img src="/assets/call.png" alt="Call" className="entry-type-icon" />;
      case 'Text':
        return <img src="/assets/text.png" alt="Text" className="entry-type-icon" />;
      case 'Video':
        return <img src="/assets/video.png" alt="Video" className="entry-type-icon" />;
      case 'Meetup':
        return <img src="/assets/meet.png" alt="Meetup" className="entry-type-icon" />;
      default:
        return null;
    }
  };

  const getFilterLabel = () => {
    if (filterType === 'all') return 'All Interactions';
    if (filterType === 'Call') return 'Calls';
    if (filterType === 'Text') return 'Texts';
    if (filterType === 'Video') return 'Videos';
    return 'Filter timeline';
  };

  return (
    <div className="timeline">
      <div className="timeline-container">
        {/* Header */}
        <div className="timeline-header">
          <h1>Timeline</h1>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-dropdown">
            <button 
              className="filter-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {getFilterLabel()}
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {isDropdownOpen && (
              <div className="filter-options">
                <div 
                  className={`filter-option ${filterType === 'all' ? 'active' : ''}`}
                  onClick={() => { setFilterType('all'); setIsDropdownOpen(false); }}
                >
                  All Interactions
                </div>
                <div 
                  className={`filter-option ${filterType === 'Call' ? 'active' : ''}`}
                  onClick={() => { setFilterType('Call'); setIsDropdownOpen(false); }}
                >
                  Callss
                </div>
                <div 
                  className={`filter-option ${filterType === 'Text' ? 'active' : ''}`}
                  onClick={() => { setFilterType('Text'); setIsDropdownOpen(false); }}
                >
                  Texts
                </div>
                <div 
                  className={`filter-option ${filterType === 'Video' ? 'active' : ''}`}
                  onClick={() => { setFilterType('Video'); setIsDropdownOpen(false); }}
                >
                  Videos
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timeline Entries */}
        <div className="timeline-entries">
          {filteredEntries.length === 0 ? (
            <div className="empty-state">
              <p>No entries yet</p>
              <p>Start logging your interactions with friends!</p>
            </div>
          ) : (
            <div className="entries-list">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="timeline-entry">
                  {getTypeIcon(entry.type)}
                  <div className="entry-content">
                    <div className="entry-title">
                      <strong>{entry.type}</strong> with {entry.friendName}
                    </div>
                    <div className="entry-date">
                      {formatDate(entry.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Timeline;