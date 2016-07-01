import React from 'react';

export const LoadingIndicator = (props) => {
  let visibility = '';
  if (props.off) {
    visibility = 'hidden';
  }
  let className = 'loading-indicator';
  if (props.className) {
    className = `${props.className} ${className}`;
  }
  return (
    <span className={className}style={{ visibility }}>
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
  className: React.PropTypes.string,
};
