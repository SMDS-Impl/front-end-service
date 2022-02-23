import React from 'react'

type CustomButtonProps = {
    size?: 'xs' | 'md' | 'lg' | 'xl'
}

export const Button = React.forwardRef<
    HTMLButtonElement,
    JSX.IntrinsicElements['button'] & CustomButtonProps
>(({ size, className = '', ...props }, ref) => {
    let classNames =
        'text-white bg-[#3751FF] px-36 py-3 font-medium text-sm text-center'
    size === 'md'
        ? (classNames += ' rounded-md')
        : size === 'lg'
        ? (classNames += ' rounded-lg py-2 px-2')
        : (classNames += ' rounded-xl')
    if (className) {
        classNames += ` ${className}`
    }
    return <button {...props} ref={ref} className={classNames} />
})
