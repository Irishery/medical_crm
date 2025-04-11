import React, { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import { getErrorMessage } from './patterns'

type Props = {
    name: string
} & ComponentProps<any>

const FormItem = ({ name, ...props }: ComponentProps<any>) => {
    const form = useFormContext()
    const errors = form.formState.errors
    const message = errors[name]?.message
    console.log({ message })
    return (
        <div className="grid gap-2">
            {props.children}
            <ErrorMessage>
                {getErrorMessage(message as any as string)}
            </ErrorMessage>
        </div>
    )
}

export default FormItem
