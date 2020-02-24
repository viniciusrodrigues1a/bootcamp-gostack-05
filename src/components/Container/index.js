import styled, { keyframes, css } from 'styled-components';

const nono = keyframes`
  0%, 100% {
    transform: translateX(0);
  } 25% {
    transform: translateX(-7%);
  } 75% {
    transform: translateX(7%);
  }
`;

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
  animation: ${props =>
    props.error &&
    css`
      ${nono} 0.26s linear infinite
    `};
  border: ${props => (props.error ? '2px solid #f00' : 'none')};

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export default Container;
