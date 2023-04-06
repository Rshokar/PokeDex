import React from 'react';

const wrapper: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    visibility: 'visible',
    transition: 'opacity 0.3s ease',
    zIndex: 9999
};

const style = {
    wrapper,
};

export default style;