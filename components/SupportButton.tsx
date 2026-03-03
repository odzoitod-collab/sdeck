import React from 'react';

interface Props {
  className?: string;
  variant?: 'header' | 'floating' | 'inline';
}

/** Компонент отключён по запросу — блок техподдержки убран. */
const SupportButton: React.FC<Props> = () => {
  return null;
};

export default SupportButton;