import React from 'react'

const wrapper: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '90%'
}

const bar: React.CSSProperties = {
    width: '70%',
}

const statWrapper: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}

const style = { wrapper, bar, statWrapper }

export default style