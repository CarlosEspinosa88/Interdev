import { useState, useRef, useCallback } from 'react'
import styled from '@emotion/styled'
import Checkbox from '../../components/Checkbox'
import { FRAMEWORKS, ERROR_MESSAGES } from '../../constanst/index'

const MainContainer = styled.div`
  padding: 0 0 0.5rem 0;
`

const StyledCheckboxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > div {
    margin: 0 0 1rem 0;
  }
`

const StyledContainerLabelCheckbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5em;
`;

const StyledLabelCheckbox = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.color?.gray?.dark};
  font-family: ${(props) => props.theme.font?.family?.regular};
`;

const StyledErrorLabelCheckbox = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.color?.red};
  font-family: ${(props) => props.theme.font?.family?.regular};
`;

function CheckboxGroup({
  typeError,
  setHasError,
  setTypeError,
  hasError,
  valueAllCheckbox,
  setValueAllCheckbox,
  stateChecked,
  setStateChecked
}) {

  const handleOnChangeValueCheckbox = useCallback(
    function onChangeCheckbox(event) {
      !valueAllCheckbox.includes(event.target.name)
        ? setValueAllCheckbox([...valueAllCheckbox, event.target.name])
        : setValueAllCheckbox(valueAllCheckbox.filter(item => item !== event.target.name));

    }, [valueAllCheckbox, setValueAllCheckbox]
  )

  const handleStateCheckbox = useCallback(
    function stateCheckbox(event, index) {
      if (event.target.value === 'true') {
        setStateChecked((prevState) => {
          prevState.splice(index, 1, false);
  
          return prevState
        })
      } else {
        setStateChecked((prevState) => {
          prevState.splice(index, 1, true);
  
          return prevState
        })
      }
    }, [setStateChecked]
  )

  const handleOnBlurInputCheckbox = useCallback(
    function onBlurCheckbox(event) {

      if (valueAllCheckbox.length > 0) {
        setHasError((prevState) => ({
          ...prevState,
          study: false
        }))
        setTypeError((prevState) => ({
          ...prevState,
          study: ''
        }))
      } else {
        setHasError((prevState) => ({
          ...prevState,
          study: true
        }))
        setTypeError((prevState) => ({
          ...prevState,
          study: ERROR_MESSAGES.CHECBOXES
        }))

      }
    }, [setHasError, setTypeError, valueAllCheckbox ]
  )

  return (
    <MainContainer>
      <StyledContainerLabelCheckbox>
        <StyledLabelCheckbox>
          Tus skill favoritos
        </StyledLabelCheckbox>
        {hasError && (
          <StyledErrorLabelCheckbox>
            {typeError}
          </StyledErrorLabelCheckbox>
        )}
      </StyledContainerLabelCheckbox>
      <StyledCheckboxesContainer>
          {FRAMEWORKS?.map((item, index) => (
            <div key={item.id}>
              <Checkbox
                id={index}
                name={item.value}
                label={item.label}
                value={stateChecked[index]}
                checked={stateChecked[index]}
                onChange={(event) => {
                  handleOnChangeValueCheckbox(event)
                  handleStateCheckbox(event, index)
                }
              }
                onBlur={handleOnBlurInputCheckbox}
              />
            </div>
          ))}
      </StyledCheckboxesContainer>
    </MainContainer>
  )
}

CheckboxGroup.defaultProps = {
  typeError: false,
  setHasError: () => null,
  setTypeError: () => null,
  valueAllCheckbox: [],
  setValueAllCheckbox: () => null,
};

export default CheckboxGroup;