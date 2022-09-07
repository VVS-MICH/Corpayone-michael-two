import React from 'react'
import styled from 'styled-components/macro'

type SectionHeaderProps = {
  title: string
  children: React.ReactNode
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const SectionHeader: React.FC<SectionHeaderProps> = ({title, children}) => {
  return (
    <Container>
      <h2>{title}</h2>
      {children}
    </Container>
  )
}

export default SectionHeader
