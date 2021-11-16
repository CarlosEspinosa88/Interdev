import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { TYPE } from '../../constanst'

const loadingStyled = css`
  cursor: progress;
  opacity: 0.5;
`

const disabledStyled = props => css`
  color: ${props.theme.color.gray.dark};
  cursor: not-allowed;
  opacity: 0.5;
  background: ${props.theme.color.disabledGrayOpacity20};

  &:hover {
    box-shadow: none;
    background: ${props.theme.color.gray.light};
  }
`

const ButtonStyled = styled.button`
  border: 0;
  margin: 0;
  opacity: 1;
  line-height: 1;
  cursor: pointer;
  overflow: hidden;
  font-size: 1rem;
  user-select: none;
  position: relative;
  text-align: center;
  vertical-align: top;
  border-radius: 0.3rem;
  white-space: nowrap;
  text-decoration: none;
  transition: all 150ms ease-out;

  padding: 0.6rem 1rem;
  color: ${(props) => props.theme.color.secondary};
  background: ${(props) => props.theme.color.primary};
  box-shadow: ${(props) => props.theme.shadow?.lightGrayOpacity10};

  &:hover {
    box-shadow: none;
    background: ${(props) => props.theme.color.primaryGreenOpacity70};
  }

  ${(props) =>  props.disabled && disabledStyled}
  ${(props) =>  props.loading && loadingStyled}
`

function Button({ 
  type,
  children,
  disabled,
  loading,
  onClick,
  ...restButtonProps 
}) {  
  
  const content = loading ? 'Cargando' : children;

  return (
    <ButtonStyled
      type={type}
      loading={+loading}
      disabled={disabled}
      onClick={onClick}
      {...restButtonProps}
    >
      {content}
    </ButtonStyled>
  ) 
}

Button.defaultProps = {
  type: TYPE.BUTTON,
  disabled: false,
  loading: +false,
  onClick: () => null,
};

export default Button;
