import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { breakPoints } from '../../styles/breakPoints'

const BodyContainer = styled.div`
  display: grid;
  height: 100vh;
  place-items: center;
  background: ${(props) => props.theme.color.gray.clear};
`

const MainContainer = styled.div`
  padding: 1rem;
  height: 100vh;
  width: 100%;
  border-radius: 0px;
  background: ${(props) => props.theme.color.white};
  overflow: hidden;
  overflow-y: scroll;
  border: 0.2rem solid ${(props) => props.theme.color.primary};
  
  @media (min-width: ${breakPoints.mobile}) {
    height: 90vh;
    width: 410px;
    border-radius: 10px;
  }

  @media (min-width: ${breakPoints.tablet}) {
    height: 90vh;
    width: 600px;
    border-radius: 10px;
  }
`

export default function Layout({children}) {
  return (
    <BodyContainer>
      <MainContainer>
        {children}
      </MainContainer>
    </BodyContainer>
  )
}