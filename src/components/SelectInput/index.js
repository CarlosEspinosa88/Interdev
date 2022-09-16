import React, { memo, forwardRef, useState, useImperativeHandle } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const StyledLabelWrapper = styled.div`
  margin-bottom: 0.1rem;
  `;

const StyledLabel = styled.label`s
  font-size: 1rem;
  color: ${(props) => props.theme.color?.gray?.dark};
  font-family: ${(props) => props.theme.font?.family?.regular};
`;

const StyledError = styled.div`
  position: absolute;
  right: 0;
`;

const StyledSelectWrapper = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 100%;

  &:after {
    content: '🍕';
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5em;
    transform: rotate(25deg);
    transition: .25s all ease;
    pointer-events: none;
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
    ${StyledSelect}:hover + ${StyledError},
    ${StyledSelect}:focus + ${StyledError} {
      opacity: 0;
      padding: 0;
      transform: translate3d(100%, -50%, 0);
    }
  `)}
`;

const StyledSelect = styled.select`
  appearance: none;
  outline: 0;
  box-shadow: none;
  width: 100%;
  border-radius: 0.3rem;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.6rem 1rem;
  color: ${(props) => props.theme.color?.gray?.light};
  background-color: ${(props) => props.theme.color.withe};
  border: 0.1rem solid ${(props) => props.theme.color?.gray?.light};
  font-family: ${(props) => props.theme.font?.family?.regular};

  &:focus {
    outline: none;
    border: 0.1rem solid ${(props) => props.theme.color?.primary};
  }

  ${(props) => (props.hasError && css`
    border: 0.1rem solid ${props.theme.color?.red};
  `)}

  ${(props) => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    color: ${props.theme.color.gray.dark};
    background: ${props.theme.color.disabledGrayOpacity20};
  `}
`

const SelectInput = forwardRef(
  function SelectInputRef({
    id,
    name,
    disabled,
    options,
    Label,
    hasError,
    errorMessage,
    ...restSelectProps
  }, ref) {

    const [value, setValue] = useState({
      seniority: '',
      salary: '',
    })

    useImperativeHandle(ref, () => ({
      onChangeValueByRef(event) {
        setValue((prevState) => ({
          ...prevState,
          [event?.target?.name]: event?.target?.value
        }))
      },
      setValueByRef(key) {
        return value.[key]
      },
      initialValueByRef(key) {
        setValue((prevState) => ({
          ...prevState,
          [key]: ''
        }))
      },
    }))

    function Option({ label, value }) {
      return <option value={value}>{label}</option>
    }

    return (
      <>
        {Label && (
          <StyledLabelWrapper>
            <StyledLabel htmlFor={id}>
            {Label}
            </StyledLabel>
          </StyledLabelWrapper>
        )}
        <StyledSelectWrapper hasError={hasError}>
          <StyledSelect
            ref={ref} 
            id={id}
            name={name}
            value={value?.[name]}
            disabled={disabled}
            hasError={hasError}
            {...restSelectProps}
          >
            {options?.map((option) => (
              <Option {...option} key={option.value} />
            ))}
          </StyledSelect>
          {hasError && (
            <StyledError>
              {errorMessage}
            </StyledError>
          )}
        </StyledSelectWrapper>
      </>
    );
  }
)

SelectInput.displayName = 'SelectInput'

SelectInput.defaultProps = {
  id: 'select-id',
  name: 'select',
  labelSelect: 'Selecciona una Opción',
  disabled: false,
  options: [],
  onChange: () => null,
  hasError: false,
  errorMessage: '',
};

export default memo(SelectInput)
