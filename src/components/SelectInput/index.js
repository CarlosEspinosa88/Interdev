import React, { useState } from 'react';
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const StyledLabelWrapper = styled.div`
  margin-bottom: 0.1gem;
  `;

const StyledLabel = styled.label`
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
    top: 50%;
    right: 1.5rem;
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

  ${(props) => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    color: ${props.theme.color.gray.dark};
    background: ${props.theme.color.disabledGrayOpacity20};
  `}
`

function SelectInput({
  id,
  name,
  disabled,
  options,
  labelSelect,
  hasError,
  errorMessages,
  ...otherSelectProps
}) {

  function Option({ label, value }) {
    return <option value={value}>{label}</option>;
  }

  return (
    <>
      {labelSelect && (
        <StyledLabelWrapper>
          <StyledLabel htmlFor={id}>
          {labelSelect}
          </StyledLabel>
        </StyledLabelWrapper>
      )}
      <StyledSelectWrapper hasError={hasError}>
        <StyledSelect
          id={id}
          name={name}
          disabled={disabled}
          {...otherSelectProps}
        >
          {options?.map((option) => (
            <Option {...option} key={option.value} />
          ))}
        </StyledSelect>
        {hasError && (
          <StyledError>
            {errorMessages}
          </StyledError>
        )}
      </StyledSelectWrapper>
    </>
  );
}

SelectInput.defaultProps = {
  id: 'Select',
  name: 'Name',
  labelSelect: 'Selecciona una Opción',
  disabled: false,
  options: [],
  onChange: () => null,
  hasError: false,
  errorMessages: '',
};

export default SelectInput
