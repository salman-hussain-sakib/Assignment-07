import './Toast.css';

function Toast({ message, type = 'success' }) {
  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
    </div>
  );
}

export default Toast;