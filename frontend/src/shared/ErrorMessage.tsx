import React from 'react'
import type { ComponentProps } from 'react'

const ErrorMessage = ({ children, ...props }: ComponentProps<'span'>) => {
    return (
        <span {...props} className='text-red-700'>{children}</span>
    )
}

export default ErrorMessage