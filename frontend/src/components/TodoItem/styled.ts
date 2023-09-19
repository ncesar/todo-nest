import styled from "styled-components";

export const TodoItemWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  svg {
    height: 20px;
  }
  button {
    border: 1px solid #ded3d3;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 5px;
  }
`;

export const TodoSingleItem = styled.li`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  align-items: center;
  background: linear-gradient(to right, hsl(210deg 12.28% 81.93%), #fff);
  border: 1px solid #eee;
`;
