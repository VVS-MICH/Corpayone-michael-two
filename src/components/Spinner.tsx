import React from 'react'
import styled from 'styled-components/macro'

import {ReactComponent as SpinnerIcon} from './spinner.svg'

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
`

const SpinnerText = styled.span`
  margin-left: 10px;
`

type SpinnerProps = {
  text?: string
  size?: 'sm' | 'md'
}

const Spinner: React.FC<SpinnerProps> = ({text, size = 'md'}) => {
  return (
    <SpinnerContainer>
      <StyledSpinnerIcon $size={size} />
      {text && <SpinnerText>{text}</SpinnerText>}
    </SpinnerContainer>
  )
}

const StyledSpinnerIcon = styled(SpinnerIcon)<{$size: 'sm' | 'md'}>`
  height: ${(props) => (props.$size === 'sm' ? '1rem' : '2rem')};
  margin-right: 8px;
  width: ${(props) => (props.$size === 'sm' ? '1rem' : '2rem')};
`

export default Spinner
