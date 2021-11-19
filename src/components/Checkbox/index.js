import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Label = styled.label`
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  position: relative;
  height: 2em;
  display: flex;
  align-items: center;

  ${props => props.disabled && css`
    cursor: not-allowed;
    color: #c3c3c3;
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
  font-size: 1rem;
  color: red;
  margin-left: 6px;
  height: 2em;
  display: flex;
  align-items: center;
`;

const LabelText = styled.span``;

const Input = styled.input`
  margin: 0 1.4em 0 0;
  font-size: initial;
  opacity: 0;
  vertical-align: text-top;
  & + ${LabelText} {
    &:before,
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      height: 2em;
      width: 2em;
      content: '';
      display: block;
      
      ${props => props.disabled && css`
        background: #EAEAEA;
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
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          {...restCheckboxProps}
        />
        <LabelText>
          <OptionalText hideLabel={hideLabel}>{label}</OptionalText>
        </LabelText>
      </Label>
      <Error id={errorId} error={error}>
        {error}
      </Error>
    </CheckboxWrapper>
  );
}

// Checkbox.propTypes = {
//   appearance: PropTypes.oneOf(['primary', 'secondary']),
//   id: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   hideLabel: PropTypes.bool,
//   error: PropTypes.string,
// };

Checkbox.defaultProps = {
  hideLabel: false,
  error: null,
  disabled: false
};

export default Checkbox;
