import React, {memo} from 'react'

type ErrorPanelProps = {
  text?: string
}

const ErrorPanel: React.FC<ErrorPanelProps> = ({text}) => {
  return (
    <div className="alert alert-danger" role="alert">
      {text}
    </div>
  )
}

export default memo(ErrorPanel)
