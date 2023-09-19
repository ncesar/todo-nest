import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  position: relative;

  figure {
    margin: 0;
    height: 283px;
    &:before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        hsla(0, 0%, 0%, 0.4),
        12%,
        hsla(0, 0%, 0%, 0.15) 41.6%,
        hsla(0, 0%, 0%, 0.1) 50%,
        hsla(0, 0%, 0%, 0.01) 59.9%,
        hsla(0, 0%, 0%, 0) 100%
      );
      z-index: 1;
    }
    img {
      width: 425px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
  }
`;
