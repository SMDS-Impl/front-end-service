import React from 'react'

type CustomLabelProps = {
    color?: 'gray' | 'bold'
}

export const Label = React.forwardRef<
    HTMLButtonElement,
    JSX.IntrinsicElements['label'] & CustomLabelProps
>(({ color, className = '', ...props }, ref) => {
    let classNames = 'block mb-2 text-xs'
    color === 'gray'
        ? (classNames += ' text-[#A5A8B9]')
        : color === 'bold'
        ? (classNames += ' text-[#A5A8B9] font-bold')
        : (classNames += '')
    if (className) {
        classNames += ` ${className}`
    }
    return <label {...props} className={classNames} />
})
