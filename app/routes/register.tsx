/* eslint-disable jsx-a11y/role-supports-aria-props */
import { useEffect, useState } from 'react'
import { ActionFunction, json, Link, MetaFunction, useActionData } from 'remix'
import { Button } from '~/components/basic/button'
import { Input } from '~/components/basic/input'
import { Label } from '~/components/basic/label'

export const meta: MetaFunction = () => {
    return {
        title: 'SMDS | Login',
        description: 'Login to Start Using SMDS APP',
    }
}

function validateEmail(email: unknown) {
    if (typeof email !== 'string' || email.length < 6) {
        return `Email must be at least 6 characters long`
    }
}

function validateFullnames(fullname: unknown) {
    if (typeof fullname !== 'string' || fullname.length < 10) {
        return `Full name must be at least 10 characters long`
    }
}

function validatePassword(password: unknown) {
    if (typeof password !== 'string' || password.length < 6) {
        return `Password must be at least 6 characters long`
    }
}

type RegisterData = {
    formError?: string
    fieldErrors?: {
        email: string | undefined
        fullname: string | undefined
        password: string | undefined
    }
    fields?: {
        email: string
        fullname: string
        password: string
    }
}

const badRequest = (data: RegisterData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const email = form.get('email')
    const fullname = form.get('fullname')
    const password = form.get('password')
    if (
        typeof email !== 'string' ||
        typeof fullname !== 'string' ||
        typeof password !== 'string'
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const fields = { email, fullname, password }
    const fieldErrors = {
        email: validateEmail(email),
        fullname: validateFullnames(fullname),
        password: validatePassword(password),
    }
    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields })
}

export default function Login() {
    const registerData = useActionData<RegisterData>()
    // Initialize a boolean state
    const [passwordShown, setPasswordShown] = useState(false)
    useEffect(() => {}, [passwordShown])

    return (
        // font-display  bg-black font-primary
        <div className="font-display flex h-screen w-screen flex-col items-center  justify-center bg-black font-primary text-white">
            <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
                <form
                    method="post"
                    autoComplete="off"
                    aria-errormessage={
                        registerData?.formError
                            ? 'form-error-message'
                            : undefined
                    }
                >
                    {/* Logo */}
                    <div className="mt-2 mb-3 flex flex-col">
                        <div className="flex justify-center">
                            <img
                                src="/logo.png"
                                alt="SMDS Logo"
                                className="h-12 w-12 rounded-full bg-slate-100 ring-2 ring-white"
                            />
                        </div>
                        <span className="py-2 text-center font-medium text-[#A5A8B9]">
                            SMDS
                        </span>
                    </div>
                    {/* End of Logo */}
                    <h1 className="text-center text-xl font-bold text-black">
                        Sign up to SMDS
                    </h1>
                    <p className="text-md pt-2 text-center tracking-wide text-[#A5A8B9]">
                        Enter your basic information below
                    </p>
                    <div className="pt-6">
                        <Label color="bold">EMAIL</Label>
                        <Input
                            type="email"
                            id="email-input"
                            name="email"
                            placeholder="Email address"
                            defaultValue={registerData?.fields?.email}
                            aria-invalid={Boolean(
                                registerData?.fieldErrors?.email
                            )}
                            aria-errormessage={
                                registerData?.fieldErrors?.email
                                    ? 'email-error'
                                    : undefined
                            }
                        />
                        {registerData?.fieldErrors?.email ? (
                            <p
                                className="text-rose-500"
                                role="alert"
                                id="email-error"
                            >
                                {registerData.fieldErrors.email}
                            </p>
                        ) : null}
                    </div>

                    <div className="pt-6">
                        <Label color="bold">FULL NAMES</Label>
                        <Input
                            type="text"
                            id="fullname-input"
                            name="fullname"
                            placeholder="Full names"
                            defaultValue={registerData?.fields?.fullname}
                            aria-invalid={Boolean(
                                registerData?.fieldErrors?.fullname
                            )}
                            aria-errormessage={
                                registerData?.fieldErrors?.fullname
                                    ? 'fullname-error'
                                    : undefined
                            }
                        />
                        {registerData?.fieldErrors?.fullname ? (
                            <p
                                className="text-rose-500"
                                role="alert"
                                id="fullname-error"
                            >
                                {registerData.fieldErrors.fullname}
                            </p>
                        ) : null}
                    </div>

                    <div className="py-6">
                        <Label color="bold">PASSWORD</Label>
                        <div className="flex justify-between">
                            <Input
                                type={passwordShown ? 'text' : 'password'}
                                id="password-input"
                                name="password"
                                placeholder="Password"
                                radius="xs"
                                defaultValue={registerData?.fields?.password}
                                aria-invalid={Boolean(
                                    registerData?.fieldErrors?.password
                                )}
                                aria-errormessage={
                                    registerData?.fieldErrors?.password
                                        ? 'password-error'
                                        : undefined
                                }
                            />

                            <button
                                type="button"
                                onClick={() => setPasswordShown(!passwordShown)}
                                className="bg-slate-25 rounded-lg rounded-l-none border border-[#F0F1F7] border-l-transparent"
                            >
                                <span className="whitespace-no-wrap flex items-center rounded px-3 text-gray-600">
                                    <i className="fas fa-eye-slash"></i>
                                </span>
                            </button>
                        </div>

                        {registerData?.fieldErrors?.password ? (
                            <p
                                className="text-rose-500"
                                role="alert"
                                id="password-error"
                            >
                                {registerData.fieldErrors.password}
                            </p>
                        ) : null}
                    </div>
                    <Button className="my-4" size="md" type="submit">
                        Sign up
                    </Button>
                    <div className="mt-4 flex px-8">
                        <span className="text-center text-[#A5A8B9]">
                            Have an account already?
                        </span>
                        <Link className="px-2 text-[#3751FF]" to="/login">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
