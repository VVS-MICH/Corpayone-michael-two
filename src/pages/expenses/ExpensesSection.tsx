import React, {memo, useCallback} from 'react'
import Button from '../../components/Button'
import styled from 'styled-components/macro'
import Spinner from '../../components/Spinner'
import {Expense} from '../../util/roger-api-client'
import {useHistory} from 'react-router-dom'

const Title = styled.h5`
  font-size: 16px;
  font-weight: bold;
`

const SectionItem = styled.div`
  display: flex;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  background-color: white;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 12px;
`

const FileNameContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const FileNameInfo = styled.div`
  color: #8f959b;
`

const VendorNameInfo = styled.div`
  font-weight: bold;
`

// TODO add media query here
const AmountContainer = styled.div`
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AmountInfo = styled.div`
  color: #7cb87b;
`

const DateInfo = styled.div`
  color: #8f959b;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

type ExpensesSectionProps = {
  title: string
  items?: Partial<Expense>[]
  showLoading?: boolean
  hideViewExpenseButton?: boolean
}

const ExpensesSection: React.FC<ExpensesSectionProps> = ({
  title,
  items,
  showLoading,
  hideViewExpenseButton,
}) => {
  const history = useHistory()
  const handleViewExpense = useCallback(
    (id: string) => {
      history.push(`/expenses/${id}`)
    },
    [history]
  )

  if (!items) {
    return null
  }

  return (
    <>
      <Title>{title}</Title>
      {items.map((item: Partial<Expense>) => {
        if (!item.id) {
          return null
        }
        return (
          <SectionItem key={item.id}>
            <FileNameContainer>
              <VendorNameInfo>{item.vendorName}</VendorNameInfo>
              <FileNameInfo>{item.filename}</FileNameInfo>
            </FileNameContainer>
            <AmountContainer>
              {showLoading ? (
                <Spinner text={title} />
              ) : (
                <>
                  <AmountInfo>${item.amount}</AmountInfo>
                  <DateInfo>
                    {item.createdAt &&
                      new Date(item.createdAt).toLocaleString()}
                  </DateInfo>
                </>
              )}
            </AmountContainer>
            <ButtonContainer>
              {!hideViewExpenseButton && (
                <Button onClick={() => item.id && handleViewExpense(item.id)}>
                  View expense
                </Button>
              )}
            </ButtonContainer>
          </SectionItem>
        )
      })}
    </>
  )
}

export default memo(ExpensesSection)
