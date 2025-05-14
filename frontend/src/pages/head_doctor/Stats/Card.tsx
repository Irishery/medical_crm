import React from 'react'

type Props = {
    title: string
    number: number | string
}

const Card = ({ title, number }: Props) => {
    return (
        <div className="rounded-lg border-[1px] border-solid border-[#BFC9D4] p-6">
            <span className="text-base">{title}</span>
            <br />
            <span className="block h-9 text-3xl">{number}</span>
        </div>
    )
}

export default Card
