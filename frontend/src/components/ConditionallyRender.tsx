import useHasMounted from 'hooks/useHasMounted';

type ConditionallyRenderProps = {
  client?: boolean;
  server?: boolean;
};

const ConditionallyRender: React.FC<React.PropsWithChildren<ConditionallyRenderProps>> = props => {
  const isMounted = useHasMounted();

  if (!isMounted && props.client === true) {
    return null;
  }

  if (isMounted && props.server === true) {
    return null;
  }

  return <>{props.children}</>;
};

export default ConditionallyRender;
