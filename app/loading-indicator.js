import React from 'react';

export const LoadingIndicator = (props) => {
  let visibility = '';
  if (props.off) {
    visibility = 'hidden';
  }
  return (
    <span className="loading-indicator" style={{ visibility }}>
      <span className="loading-indicator-icon"></span>{' '}
      {props.children}
    </span>
  );
};

LoadingIndicator.defaultProps = {
  off: false,
};

LoadingIndicator.propTypes = {
  off: React.PropTypes.bool,
  children: React.PropTypes.any,
};
