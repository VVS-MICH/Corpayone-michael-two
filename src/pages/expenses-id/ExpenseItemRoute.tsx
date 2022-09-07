import React, {useCallback, useEffect, useState} from 'react'
import SectionHeader from '../../components/SectionHeader'
import Button from '../../components/Button'
import {client, Expense, ExpenseStatus} from '../../util/roger-api-client'
import styled from 'styled-components/macro'
import {RouteComponentProps, useHistory} from 'react-router-dom'
import InfoItem from './InfoItem'
import Spinner from '../../components/Spinner'
import capitalize from 'lodash/capitalize'
import {useIsMounted} from '../../hooks/useIsMounted'
import ErrorPanel from '../../components/ErrorPanel'

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledButton = styled(Button)`
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StatusInfo = styled.span`
  margin-right: 10px;
`

const StatusInfoContainer = styled.span`
  display: flex;
`

interface MatchParams {
  id: string
}

interface ExpenseItemProps extends RouteComponentProps<MatchParams> {}

export const ExpenseItemRoute: React.FC<ExpenseItemProps> = ({match}) => {
  const history = useHistory()
  const isMounted = useIsMounted()
  const [error, setError] = useState<Error>()
  const [expense, setExpense] = useState<Expense>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const id = match.params.id

  useEffect(() => {
    const fetchData = async () => {
      setError(undefined)
      try {
        const newExpense = await client.getExpense(id)
        setExpense(newExpense)
      } catch (e) {
        setError(e)
      }
    }
    fetchData()
  }, [id, setExpense])

  const handleAnalyzed = useCallback(
    (expense: Expense) => {
      setExpense(expense)
    },
    [setExpense]
  )

  useEffect(() => {
    client.on('expenseAnalyzed', handleAnalyzed)

    return () => {
      client.off('expenseAnalyzed', handleAnalyzed)
    }
  }, [handleAnalyzed])

  const handlePay = useCallback(async () => {
    if (!expense) {
      return
    }

    setError(undefined)
    setIsLoading(true)
    try {
      const newExpense = await client.patchExpense(id, {
        ...expense,
        status: ExpenseStatus.PAID
      })
      setExpense(newExpense)
    } catch (e) {
      setError(e)
    } finally {
      isMounted && setIsLoading(false)
    }
  }, [id, setExpense, expense, setIsLoading, isMounted])

  const handleDelete = useCallback(async () => {
    if (!expense) {
      return
    }

    const result = window.confirm('Are you sure you want to delete expanse')
    if (!result) {
      return result
    }

    setError(undefined)
    setIsDeleting(true)
    try {
      await client.deleteExpense(id)
    } catch (e) {
      setError(e)
    } finally {
      isMounted && setIsDeleting(false)
      history.push('/expenses')
    }
  }, [expense, id, history, isMounted])

  const handleShowAll = useCallback(() => {
    history.push('/expenses')
  }, [history])

  return (
    <>
      <SectionHeader
        title={`Expenses from ${
          expense && expense.vendorName ? expense.vendorName : '...'
        }`}
      >
        {expense && expense.status === ExpenseStatus.UNPAID ? (
          <ButtonContainer>
            <StyledButton onClick={handlePay}>Pay</StyledButton>
            <StyledButton onClick={handleDelete} backgroundColor="#cd444a">
              Delete {isDeleting && <Spinner size="sm" />}
            </StyledButton>
          </ButtonContainer>
        ) : (
          <StyledButton onClick={handleShowAll}>Show all expenses</StyledButton>
        )}
      </SectionHeader>
      {error && <ErrorPanel text={error.message} />}
      {expense ? (
        <div>
          <InfoItem
            title={'Status'}
            info={
              <StatusInfoContainer>
                <StatusInfo>{capitalize(expense.status)}</StatusInfo>
                {(expense.status === ExpenseStatus.ANALYZING || isLoading) && (
                  <Spinner size="sm" />
                )}
              </StatusInfoContainer>
            }
          />
          <InfoItem title={'Vendor'} info={expense.vendorName} />
          <InfoItem title={'Amount'} info={expense.amount} />
          <InfoItem
            title={'Date'}
            info={
              expense.createdAt && new Date(expense.createdAt).toLocaleString()
            }
          />
          <InfoItem title={'Filename'} info={expense.filename} />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default ExpenseItemRoute
