import React from 'react'


const wrapper: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'white',
    boxShadow: "0 -1px 6px rgba(0,0,0,0.1)",
    zIndex: 0,
    display: 'flex',
    flexDirection: "row",
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: '30px',
    borderTopRightRadius: '30px',
    gap: '10px',
    marginBottom: '55px',
    paddingBottom: '10px',
    overflowY: 'scroll',
}


const style = { wrapper }

export default style