import { memo, forwardRef, useState, useImperativeHandle } from 'react'
import styled from '@emotion/styled'

const StyledLabelWrapper = styled.div`
  margin-bottom: 0.1em;
`;

const StyledLabel = styled.label`
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

const StyledInputWrapper = styled.div`
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
      border: 0.1rem solid ${props.theme.color?.red};
    `)}
  }

  ${StyledError} {
    position: absolute;
    top: 3.4rem;
    right: -0.5rem;
    margin-left: 0.5rem;
    transform: translate3d(100%, -50%, 0);
    transition: all 200ms ease-out;
    font-family: ${(props) => props.theme.font?.family?.regular};
    font-size: 0.8rem;
    line-height: 1rem;
    opacity: 0;
    pointer-events: none;
  }

  ${(props) => (props.hasError && `
    ${StyledError} {
      opacity: 1;
      color: ${props.theme.color?.red};
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

const Input = forwardRef(
  function InputRef({
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
  }, ref) {

    const [inputValue, setInputValue] = useState({
      name: '',
      lastName: '',
      date: ''
    })

    useImperativeHandle(ref, () => ({
      onChangeValueByRef(event) {
        setInputValue((prevState) => ({
          ...prevState,
          [event?.target?.name]: event?.target?.value
        }))
      },
      setValueByRef(key) {
        return inputValue.[key]
      },
      initialValueByRef(key) {
        setInputValue((prevState) => ({
          ...prevState,
          [key]: ''
        }))
      },
    }))

    return (
      <>
        {label && (
          <StyledLabelWrapper>
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
          </StyledLabelWrapper>
        )}
        <StyledInputWrapper hasError={hasError} type={type}>
          <StyledInput
            id={id}
            ref={ref}
            name={name}
            type={type}
            value={inputValue?.[name]}
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
)

Input.displayName = 'Input'

Input.defaultProps = {
  id: '',
  type: 'text',
  name: '',
  label: '',
  limit: 20,
  onChange: () => null,
  placeholder: '',
  disabled: false,
  required: false,
  hasError: false,
  errorMessage: '',
};

export default memo(Input)