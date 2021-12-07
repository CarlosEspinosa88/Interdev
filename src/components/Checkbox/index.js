import { memo } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Label = styled.label`
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  height: 2em;
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.font?.family?.regular};
  padding: 20px;
  width: 150px;
  background: #dfdfdf3b;
  border-radius: 10px;

  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    color: ${props.theme.color.gray.dark};
    
  `}
`;

const OptionalText = styled.span`
  ${(props) =>
    props.hideLabel &&
    css`
      border: 0px !important;
      clip: rect(0 0 0 0) !important;
      -webkit-clip-path: inset(100%) !important;
      clip-path: inset(100%) !important;
      height: 1px !important;
      overflow: hidden !important;
      padding: 0px !important;
      position: absolute !important;
      white-space: nowrap !important;
      width: 1px !important;
    `}
`;

const Error = styled.span`
  font-weight: normal;
  font-size: .8rem;
  color: red;
  margin-left: 6px;
  height: 1em;
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.font?.family?.regular};
  display: block;
  position: absolute;
  top: 68%;
  left: 184px;
`;
    // position: relative;
    // left: 50px;
    // bottom: 25px;

const LabelText = styled.span``;

const Input = styled.input`
  width: 30px;
  margin: 0 0.4em 0 0;
  font-size: initial;
  opacity: 0;
  vertical-align: text-top;
  
  & + ${LabelText} {
    &:before,
    &:after {
      position: absolute;
      top: 20px;
      left: 15px;
      height: 2em;
      width: 2em;
      content: '';
      display: block;
      
      ${props => props.disabled && css`
        background: ${props.theme.color.disabledGrayOpacity20};
      `}
    }
    &:before {
      border-radius: 100%;
    }
    &:after {
      border-radius: 100%;
    }
  }
  
  & + ${LabelText}:before {
    box-shadow: #B4B4B4 0 0 0 1px inset;

    ${props => props.disabled && css`
      box-shadow: #EAEAEA 0 0 0 1px inset;
    `}
  }
  
  &:focus + ${LabelText}:before {
    box-shadow: #B4B4B4 0 0 0 1px inset;
  }
  
  &:checked + ${LabelText}:before {
    box-shadow: #B4B4B4 0 0 0 1px inset;
  }
  
  &:checked:focus + ${LabelText}:before {
    box-shadow: #B4B4B4 0 0 0 1px inset,
    rgb(206 206 206 / 51%) 0 0 5px 2px;
  }
  
  & + ${LabelText}:after {
    transition: all 150ms ease-out;
    transform: scale3d(0, 0, 1);
    height: 20px;
    margin: 6px;
    width: 20px;
    opacity: 0;
  }
  
  &:checked + ${LabelText}:after {
    transform: scale3d(1, 1, 1);
    background: #28e288;
    opacity: 1;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

function Checkbox({
  id,
  name,
  label,
  error,
  disabled,
  hideLabel,
  ...restCheckboxProps 
}) {
  const errorId = `${id}-error`;

  return (
    <CheckboxWrapper>
      <Label disabled={disabled}>
        <Input
          id={id}
          type="checkbox"
          name={name}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          {...restCheckboxProps}
        />
        <LabelText>
          <OptionalText hideLabel={hideLabel}>{label}</OptionalText>
        </LabelText>
      </Label>
    </CheckboxWrapper>
  );
}

Checkbox.defaultProps = {
  hideLabel: false,
  error: null,
  hasError: false,
  disabled: false
};

export default memo(Checkbox);
