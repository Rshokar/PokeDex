import React from 'react';
import style from './style'

interface Props {
  children: React.ReactNode
}

const Overlay: React.FC<Props> = ({ children }: Props) => {
  const { wrapper } = style
  return (
    <div style={wrapper} >
      {children}
    </div>
  );
};

export default Overlay;
