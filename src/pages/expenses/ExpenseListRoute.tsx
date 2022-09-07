import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import SectionHeader from '../../components/SectionHeader'
import Button from '../../components/Button'
import ExpensesSection from './ExpensesSection'
import {client, Expense} from '../../util/roger-api-client'
import groupBy from 'lodash/groupBy'
import transform from 'lodash/transform'
import styled from 'styled-components/macro'
import uuid from 'uuid'
import {useIsMounted} from '../../hooks/useIsMounted'
import Spinner from '../../components/Spinner'
import ErrorPanel from '../../components/ErrorPanel'
import {useForceRef} from '../../hooks/useForceRef'

const UploadInput = styled.input`
  display: none;
`

export const ExpenseListRoute: React.FC<{}> = () => {
  const isMounted = useIsMounted()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const uploadInputRef = useRef<HTMLInputElement>(null)
  const [getItemsRef, setItems] = useForceRef<Expense[]>([])
  const [getUploadingFilesRef, setUploadingFiles] = useForceRef<{
    [id: string]: File | undefined
  }>({})

  const handleAnalyzed = useCallback(
    (expense: Expense) => {
      const oldItemIdx = getItemsRef().current.findIndex(
        item => item.id === expense.id
      )
      if (oldItemIdx === -1) {
        return
      }

      const newItems = [...getItemsRef().current]
      newItems.splice(oldItemIdx, 1, expense)

      setItems(newItems)
    },
    [getItemsRef, setItems]
  )

  useEffect(() => {
    const fetchData = async () => {
      let expenses
      setError(undefined)
      setIsLoading(true)
      try {
        expenses = await client.listExpenses()
        setItems(expenses)
      } catch (e) {
        setError(e)
      } finally {
        isMounted && setIsLoading(false)
      }
    }
    fetchData()
  }, [isMounted, setIsLoading, setError, setItems])

  useEffect(() => {
    client.on('expenseAnalyzed', handleAnalyzed)

    return () => {
      client.off('expenseAnalyzed', handleAnalyzed)
    }
  }, [handleAnalyzed])

  const handleUploadExpenses = useCallback(() => {
    if (!uploadInputRef.current) {
      return
    }

    uploadInputRef.current.click()
  }, [])

  const handleUploadInternal = useCallback(
    async (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (!evt.target.files) {
        return
      }

      const newFile = evt.target.files[0]
      const fileId = uuid()

      setUploadingFiles({
        ...getUploadingFilesRef().current,
        [fileId]: newFile
      })

      setError(undefined)
      let expense
      try {
        expense = await client.uploadExpense(newFile)
        setItems([...getItemsRef().current, expense])
      } catch (e) {
        setError(e)
      } finally {
        setUploadingFiles({
          ...getUploadingFilesRef().current,
          [fileId]: undefined
        })
      }
    },
    [getItemsRef, getUploadingFilesRef, setUploadingFiles, setItems, setError]
  )

  const groupedItems = useMemo(() => {
    return groupBy(getItemsRef().current, (item: Expense) => item.status)
  }, [getItemsRef])

  const uploadingItems = useMemo(() => {
    return transform(
      getUploadingFilesRef().current,
      (acc: Partial<Expense>[], item: File | undefined, id: string) => {
        if (!item) {
          return acc
        }

        acc.push({
          id,
          filename: item.name
        })
        return acc
      },
      []
    )
  }, [getUploadingFilesRef])

  return (
    <>
      <SectionHeader title="Expenses">
        <UploadInput
          ref={uploadInputRef}
          onChange={handleUploadInternal}
          type="file"
          id="file"
        />
        <Button onClick={handleUploadExpenses}>Upload expenses</Button>
      </SectionHeader>
      {error && <ErrorPanel text={error.message} />}
      {!isLoading ? (
        <>
          <ExpensesSection
            title="Uploading"
            showLoading
            hideViewExpenseButton
            items={uploadingItems.length ? uploadingItems : undefined}
          />
          <ExpensesSection
            title="Analyzing"
            showLoading
            items={groupedItems.ANALYZING}
          />
          <ExpensesSection title="Unpaid" items={groupedItems.UNPAID} />
          <ExpensesSection title="Paid" items={groupedItems.PAID} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default ExpenseListRoute
