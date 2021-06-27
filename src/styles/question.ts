import styled, { css } from 'styled-components';

export const QuestionContainer = styled.div`
  background: ${props => props.theme.colors.backgroundBox};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;
  ${props => props.theme.title === 'dark' ? css`
    border: 1px solid #a8a8b3;
  ` : ''}

  & + & {
    margin-top: 8px;
  }

  &.highlighted {
    background: #f8f8f8;
    border: 1px solid ${props => props.theme.colors.primary};

    p {
      ${props => props.theme.title === 'dark' ? css`
        color: #29292E;
      ` : ''}
    }

    footer .user-info span {
      color: #737380;
    }
  }

  &.answered {
    background: #dbdcdd;
    p {
      ${props => props.theme.title === 'dark' ? css`
        color: #29292E;
      ` : ''}
    }

    footer .user-info span {
      color: #737380;
    }
  }

  p {
    color: ${props => props.theme.colors.text};
    margin-bottom: 10px;
  }


  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .user-info {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      span {
        margin-left: 8px;
        color: ${props => props.theme.title === 'dark' ? '#FFF' : '#737380'};
        font-size: 14px;
      }
    }

    > div {
      display: flex;
      gap: 16px
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: #737380;
        gap: 8px;

        &.liked {
          color: #835afd;

          svg path {
            stroke: #835afd;
          }
        }

        &:hover {
          filter: brightness(0.8)
        }
      }
    }
  }
`;
