import { useState, useEffect } from 'react';
import { useTimeline } from '../context/TimelineContext';
import './Stats.css';

function Stats() {
  const { entries } = useTimeline();
  const [stats, setStats] = useState({
    totalInteractions: 0,
    textCount: 0,
    callCount: 0,
    videoCount: 0,
  });
  const [hoveredSegment, setHoveredSegment] = useState(null);

  useEffect(() => {
    let activeEntries = entries;
    
    if (entries.length === 0) {
      activeEntries = [
        { type: 'Text' }, { type: 'Call' }, { type: 'Text' },
        { type: 'Video' }, { type: 'Call' }, { type: 'Text' },
        { type: 'Call' }, { type: 'Text' }, { type: 'Video' },
      ];
    }

    const textCount = activeEntries.filter(e => e.type === 'Text').length;
    const callCount = activeEntries.filter(e => e.type === 'Call').length;
    const videoCount = activeEntries.filter(e => e.type === 'Video').length;
    const totalInteractions = activeEntries.length;

    setStats({
      totalInteractions,
      textCount,
      callCount,
      videoCount,
    });
  }, [entries]);

  const getPercentage = (count) => {
    if (stats.totalInteractions === 0) return 0;
    return (count / stats.totalInteractions) * 100;
  };

  const textPercent = getPercentage(stats.textCount);
  const callPercent = getPercentage(stats.callCount);
  const videoPercent = getPercentage(stats.videoCount);

  // Calculate circle dash values for donut chart
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  
  const textDash = (textPercent / 100) * circumference;
  const callDash = (callPercent / 100) * circumference;
  const videoDash = (videoPercent / 100) * circumference;

  const getHoverPercent = () => {
    if (hoveredSegment === 'text') return Math.round(textPercent);
    if (hoveredSegment === 'call') return Math.round(callPercent);
    if (hoveredSegment === 'video') return Math.round(videoPercent);
    return null;
  };

  return (
    <div className="stats-page">
      <div className="stats-container">
        <h1 className="stats-title">Friendship Analytics</h1>

        <div className="analytics-card">
          <h2 className="section-title">By Interaction Type</h2>
          
          <div className="donut-container">
            <svg width="220" height="220" viewBox="0 0 220 220">
              {/* Background circle */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="40"
              />
              
              {/* Text segment */}
              {textPercent > 0 && (
                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="40"
                  strokeDasharray={`${textDash} ${circumference}`}
                  strokeDashoffset="0"
                  transform="rotate(-90 110 110)"
                  strokeLinecap="round"
                  className="donut-segment"
                  onMouseEnter={() => setHoveredSegment('text')}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{ cursor: 'pointer' }}
                />
              )}
              
              {/* Call segment */}
              {callPercent > 0 && (
                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="40"
                  strokeDasharray={`${callDash} ${circumference}`}
                  strokeDashoffset={`-${textDash}`}
                  transform="rotate(-90 110 110)"
                  strokeLinecap="round"
                  className="donut-segment"
                  onMouseEnter={() => setHoveredSegment('call')}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{ cursor: 'pointer' }}
                />
              )}
              
              {/* Video segment */}
              {videoPercent > 0 && (
                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="40"
                  strokeDasharray={`${videoDash} ${circumference}`}
                  strokeDashoffset={`-${textDash + callDash}`}
                  transform="rotate(-90 110 110)"
                  strokeLinecap="round"
                  className="donut-segment"
                  onMouseEnter={() => setHoveredSegment('video')}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{ cursor: 'pointer' }}
                />
              )}
              
              {/* Inner text - changes on hover */}
              <text x="110" y="105" textAnchor="middle" className="donut-total">
                {hoveredSegment ? getHoverPercent() : stats.totalInteractions}
              </text>
              <text x="110" y="125" textAnchor="middle" className="donut-label">
                {hoveredSegment ? '%' : 'Total'}
              </text>
            </svg>
          </div>

          {/* Legend with hover effect */}
          <div className="legend">
            <div 
              className={`legend-item ${hoveredSegment === 'text' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredSegment('text')}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div className="legend-color text-color"></div>
              <span className="legend-name">Text</span>
              <span className="legend-percent">{Math.round(textPercent)}%</span>
            </div>
            <div 
              className={`legend-item ${hoveredSegment === 'call' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredSegment('call')}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div className="legend-color call-color"></div>
              <span className="legend-name">Call</span>
              <span className="legend-percent">{Math.round(callPercent)}%</span>
            </div>
            <div 
              className={`legend-item ${hoveredSegment === 'video' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredSegment('video')}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div className="legend-color video-color"></div>
              <span className="legend-name">Video</span>
              <span className="legend-percent">{Math.round(videoPercent)}%</span>
            </div>
          </div>
        </div>

        {entries.length === 0 && (
          <div className="demo-note">Demo data shown. Log interactions to see real data.</div>
        )}
      </div>
    </div>
  );
}

export default Stats;