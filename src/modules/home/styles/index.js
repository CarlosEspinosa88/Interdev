import { css } from '@emotion/react'
import styled from '@emotion/styled'


export const StyledFormContainer = styled.div`
  > * + * {
    margin: 2rem 0 0 0;
  }
`

export const StyledCheckboxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > div {
    margin: 0 0 1rem 0;
  }
`

export const StyledSelectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  
  > * + * {
    margin: 0 0 0 1rem;
  }
`

export const StyledGithubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  
  > * + * {
    margin: 0 0 0 1rem;
  }
`

export const StyledAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  background: ${(props) => props.theme.color.gray.light};
  box-shadow: 1px 6px 14px 0px ${(props) => props.theme.color.grayLightOpacity70};

  > span {
    border-radius: 100px;
  }
`

export const StyledFirstColumnAvatar = styled.div`
  width: 80px;
`

export const StyledSecondColumnAvatar = styled.div`
  flex: 1;
`

export const StyledFirstColumnContainer = styled.div`
  width: 60%
`

export const StyledSecondColumContainer = styled.div`
  width: 40%
`

export const StyledLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const StyledInnerButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  > * + * {
    margin: 0 0 0 .5rem;
  }
`

export const StyledFaviconContainer = styled.div`
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 50px;
  background: ${(props) => props.theme.color.white};
`

export const StyledContainerThanks = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledCentered = styled.div`
  text-align: center
`
