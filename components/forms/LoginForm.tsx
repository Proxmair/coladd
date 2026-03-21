'use client '
import { Button } from "@/components/ui/button"
import PasswordInput from "@/components/ui/password-input"
import { Spinner } from "@/components/ui/spinner"
import { myToast } from "@/lib/utils"
import { useRouter } from "next/navigation"
import React from "react"


const LoginForm = () => {

    const router = useRouter()

    const [isLoading, setIsLoading] = React.useState(false);
    const [loginData, setLoginData] = React.useState({
        password: '',
    })

    const handleLogin = async () => {
        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append("password", loginData.password)

            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: formData,
            })

            const data = await res.json()

            if (!res.ok) {
                myToast.error(data.message || "Login failed")
                throw new Error(data.message || "Login failed")
            }
            
            myToast.success("Login successful")
            router.push("/dashboard")

        } catch (error: any) {
            myToast.error(error.message || "Login failed")
        } finally {
            setIsLoading(false)
        }
    }
    const handleForgotPassword = () => {
    }

    return (
        <div className="space-y-4 mt-4">
            <PasswordInput
                id="login-password"
                label="Password"
                value={loginData.password}
                onChange={(value: string) =>
                    setLoginData({
                        ...loginData,
                        password: value,
                    })
                }
            />

            <div className="flex justify-end relative -top-3">
                <a
                    className="text-sm hover:cursor-pointer hover:text-accent"
                    onClick={handleForgotPassword}
                >
                    Forgot password ?
                </a>
            </div>

            <Button disabled={isLoading} onClick={handleLogin} className="bg-accent hover:bg-accent/90 w-full">
                {isLoading ? <Spinner /> : "Login"}
            </Button>
        </div>
    )
}

export default LoginForm