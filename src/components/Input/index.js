import { memo } from 'react'
import styled from '@emotion/styled'

const StyledLabelWrapper = styled.div`
  margin-bottom: 0.1em;
`;

export const StyledLabel = styled.label`
  font-size: 1rem;
  color: ${(props) => props.theme.color?.gray?.dark};
  font-family: ${(props) => props.theme.font?.family?.regular};
`;

const StyledInput = styled.input`
  appearance: none;
  box-sizing: border-box;
  display: block;
  outline: none;
  width: 100%;
  margin: 0;
  ::placeholder {
    color: rgb(0 0 0 / 25%);
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
    border: 0.01rem solid rgb(180 180 180 / 40%);
    color: ${(props) => props.theme.color.gray.dark};
    background: ${(props) => props.theme.color.disabledGrayOpacity20};
 
    ::placeholder {
      color: rgb(0 0 0 / 15%);
    }
  }
`;

const StyledError = styled.div`
  position: absolute;
  right: 0;
`;

export const StyledInputWrapper = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 100%;

  ${StyledInput} {
    font-size: 1rem;
    line-height: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 0.3rem;
    color: ${(props) => props.theme.color?.gray?.dark};
    font-family: ${(props) => props.theme.font?.family?.regular};
    border: 0.1rem solid ${(props) => props.theme.color?.gray?.light};
    transition: all 150ms ease-out;
    &:focus {
      border: 0.1rem solid ${(props) => props.theme.color?.primary};
    }
    ${(props) => (props.hasError && `
      border: 0.1rem solid red;
    `)}
  }

  ${StyledError} {
    position: absolute;
    top: 50%;
    right: 0.1rem;
    margin-left: 0.5rem;
    transform: translate3d(100%, -50%, 0);
    transition: all 200ms ease-out;
    font-family: ${(props) => props.theme.font?.family?.regular};
    font-size: 1rem;
    line-height: 1rem;
    opacity: 0;
    pointer-events: none;
  }

  ${(props) => (props.hasError && `
    ${StyledError} {
      opacity: 1;
      color: red;
      background: none;
      padding: 0.45rem 0.7rem;
      transform: translate3d(0%, -50%, 0);
    }
    ${StyledInput}:hover + ${StyledError},
    ${StyledInput}:focus + ${StyledError} {
      opacity: 0;
      padding: 0;
      transform: translate3d(100%, -50%, 0);
    }
  `)}
`;

function Input({
  id,
  type,
  name,
  value,
  label,
  limit,
  onChange,
  required,
  disabled,
  hasError,
  placeholder,
  errorMessage,
  ...restInputProps
}) {
  return (
    <>
      {label && (
        <StyledLabelWrapper>
          <StyledLabel htmlFor={id}>{label}</StyledLabel>
        </StyledLabelWrapper>
      )}
      <StyledInputWrapper hasError={hasError}>
        <StyledInput
          id={id}
          name={name}
          type={type}
          value={value}
          maxLength={limit}
          onChange={onChange}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          {...restInputProps}
        />
        {hasError && (
          <StyledError>
            {errorMessage}
          </StyledError>
        )}
      </StyledInputWrapper>
    </>
  )
}

Input.defaultProps = {
  id: '',
  type: 'text',
  name: '',
  label: '',
  limit: 80,
  onChange: () => null,
  placeholder: '',
  disabled: false,
  required: false,
  hasError: false,
  errorMessages: '',
};

export default memo(Input)