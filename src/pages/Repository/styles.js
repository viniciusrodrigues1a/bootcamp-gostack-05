import styled from 'styled-components';
import rotate from '../../animations/rotate';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  div {
    display: flex;
    flex-direction: column;

    svg {
      margin: 0.5em auto;
      animation: ${rotate} 2s linear infinite;
    }
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    font-size: 14px;
    margin-top: 5px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      span {
        font-size: 16px;
        font-weight: bold;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #7159c144;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  select {
    padding: 8px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    border: none;
    background: ${props =>
      // eslint-disable-next-line no-nested-ternary
      props.stateFilter === 'open'
        ? '#0f0'
        : props.stateFilter === 'closed'
        ? '#f00'
        : '#7159c1'};
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  span {
    color: #555;
  }

  button {
    border: none;
    border-radius: 4px;
    background: #7159c1;
    color: #fff;
    font-weight: 550;
    padding: 6px 14px;
    text-align: center;

    &[disabled] {
      background: #7159c1aa;
      cursor: not-allowed;
    }
  }
`;
