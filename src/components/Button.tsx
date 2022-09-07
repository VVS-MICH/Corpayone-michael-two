import React, {memo} from 'react'
import styled, {css} from 'styled-components/macro'

export type ButtonVariants = 'primary' | 'danger'

type ButtonProps = {
  className?: string
  children: React.ReactNode
  disabled?: boolean
  onClick: (evt?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  color?: string
  backgroundColor?: string
  variant?: ButtonVariants
}

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  color,
  backgroundColor,
  children,
  variant = 'primary',
}) => {
  return (
    <ButtonStyled
      className={className}
      color={color}
      backgroundColor={backgroundColor}
      onClick={onClick}
      variant={variant}
    >
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button<{
  color?: string
  backgroundColor?: string
  variant?: ButtonVariants
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  user-select: none;

  color: ${({color}) => color || 'white'};
  background-color: ${({backgroundColor}) => backgroundColor || '#371e88'};

  ${({variant}) =>
    variant === 'primary' &&
    css`
      background-color: #0071b1;
      &:hover,
      &:focus {
        filter: brightness(112%);
      }
      &:active {
        filter: brightness(124%);
      }
    `}

  ${({variant}) =>
    variant === 'danger' &&
    css`
      background-color: #d73814;
      &:hover,
      &:focus {
        filter: brightness(112%);
      }
      &:active {
        filter: brightness(124%);
      }
    `}
`

export default memo(Button)
