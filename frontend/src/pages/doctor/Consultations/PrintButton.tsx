import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@mui/material'
import { printer } from '@/shared/printer'

type Props = {
    template: (data: Record<string, string>) => string
}

const PrintButton = ({ template }: Props) => {
    const form = useFormContext()

    return (
        <Button
            onClick={() => {
                const data = form.getValues()
                printer(data, template)
            }}
        >
            Распечатать
        </Button>
    )
}

export default PrintButton
