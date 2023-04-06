import React from "react";


const container: React.CSSProperties = {}

const floatingButton: React.CSSProperties = {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
}

const floatingQueryForm: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 99999
};

export default {
    container,
    floatingButton,
    floatingQueryForm
}