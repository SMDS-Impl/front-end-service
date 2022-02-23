import React from 'react'

type CustomInputProps = {
    radius?: 'md' | 'lg' | 'xs'
}

export const Input = React.forwardRef<
    HTMLInputElement,
    JSX.IntrinsicElements['input'] & CustomInputProps
>(({ radius, className = '', ...props }, ref) => {
    let classNames =
        'bg-slate-25 text-black p-2.5 placeholder-[#A5A8B9] text-sm font-light tracking-widest px-4 border-1 border-[#F0F1F7] rounded-lg w-full'
    radius === 'xs'
        ? (classNames += ' rounded-r-none border-r-transparent')
        : (classNames += ' rounded')
    if (className) {
        classNames += ` ${className}`
    }
    return <input {...props} ref={ref} className={classNames} required />
})
