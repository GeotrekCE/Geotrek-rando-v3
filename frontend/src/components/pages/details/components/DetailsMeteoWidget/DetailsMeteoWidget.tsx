import useHasMounted from 'hooks/useHasMounted';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  margin: auto;
  padding-bottom: 150px; /* 16:9 */
  padding-top: 25px;
  height: 0;

  max-width: 85%;
  margin: auto;

  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

export const DetailsMeteoWidget: React.FC<{ code: string }> = ({ code }) => {
  const display = useHasMounted(typeof navigator !== 'undefined' && navigator.onLine);

  if (display === false) {
    return null;
  }

  return (
    <Wrapper>
      <iframe
        id="widget_autocomplete_preview"
        // width="150"
        height="150"
        frameBorder="0"
        src={`https://meteofrance.com/widget/prevision/${code}0`}
      ></iframe>
    </Wrapper>
  );
};
