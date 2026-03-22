import { Button } from "@/components/ui/button"
import PasswordInput from "@/components/ui/password-input"
import { Spinner } from "@/components/ui/spinner"
import { ADMIN_EMAIL } from "@/lib/constant"
import { myToast } from "@/lib/utils"
import { AppDispatch } from "@/store"
import { setModal } from "@/store/slices/modalSlice"
import { setUser } from "@/store/slices/userSlice"
import { useRouter } from "next/navigation"
import React from "react"
import { useDispatch } from "react-redux"


const LoginForm = () => {

    const dispatch = useDispatch<AppDispatch>()
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
                throw new Error(data.message || "Login failed")
            }

            dispatch(
                setUser({
                    id: data.userId,
                })
            )

            dispatch(setModal({ key: "auth", value: false }))
            myToast.success("Login successful")
            router.push("/dashboard")

        } catch (error: any) {
            myToast.error(error.message || "Login failed")
        } finally {
            setIsLoading(false)
        }
    }
   const handleForgotPassword = async () => {
        try {
            setIsLoading(true)
            const form = new FormData()
            form.append("email", ADMIN_EMAIL || '')

            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                body: form,
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Request failed")
            }

            myToast.success(data.message)
            dispatch(setModal({ key: 'auth', value: false }));
            dispatch(setModal({ key: "verifyOTP", value: true }))

        } catch (error: any) {
            myToast.error(error.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
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