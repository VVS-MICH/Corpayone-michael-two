import React, {memo} from 'react'
import styled from 'styled-components/macro'

const Container = styled.div`
  display: flex;
  border-top: 1px solid #f1f1f1;
  padding: 10px 5px;
  font-size: 12px;
`

const Title = styled.div`
  font-weight: bold;
  flex: 0 1 200px;
`

const Info = styled.div`
  flex: 1;
`

type InfoItemProps = {
  title: string
  info: React.ReactNode | string | null
}

const InfoItem: React.FC<InfoItemProps> = ({title, info}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Info>{info}</Info>
    </Container>
  )
}

export default memo(InfoItem)
