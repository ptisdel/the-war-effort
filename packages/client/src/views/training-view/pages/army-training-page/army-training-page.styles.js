import styled, { css, keyframes } from 'styled-components';

export const Root = styled.div(() => ({

}));

export const TrainingPath = styled.div(() => ({
  backgroundColor: 'lightgray',
  cursor: 'pointer',
  marginBottom: '10px',
  position: 'relative',
}));

export const PathProgressBar = styled.div(({ startingPercent, timeRemaining }) => {
  const animationSpeed = timeRemaining;
  const animationKeyframes = keyframes`
    0% {
      width: ${startingPercent};
    }

    100% {
      width: 100%;
    }
  `;

  return css`
    animation: ${(startingPercent && timeRemaining) ? animationKeyframes : null} ${animationSpeed} linear forwards;
    background-color: gray;
    bottom: 0;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
  `;
});

export const PathContent = styled.div(() => ({
  position: 'relative',
}));

export const PathName = styled.div(() => ({
  fontWeight: 'bold',
}));

export const PathDescription = styled.div(() => ({

}));

export const PathTraineeCount = styled.div(() => ({

}));
