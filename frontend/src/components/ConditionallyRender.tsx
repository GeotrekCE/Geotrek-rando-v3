import React, { useEffect, useState } from 'react';

export interface ConditionallyRenderProps {
  client?: boolean;
  server?: boolean;
}

const ConditionallyRender: React.FC<ConditionallyRenderProps> = props => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted && props.client === true) {
    return null;
  }

  if (isMounted && props.server === true) {
    return null;
  }

  return props.children as React.ReactElement;
};

export default ConditionallyRender;
