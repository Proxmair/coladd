'use client'

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { myToast } from "@/lib/utils"
import React from "react"
import PasswordInput from "@/components/ui/password-input"
import { ADMIN_EMAIL } from "@/lib/constant"

const ChangePasswordForm = () => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [formData, setFormData] = React.useState({
        password: "",
        confirmPassword: ""
    })

    const handleChangePassword = async () => {
        if (!formData.password || !formData.confirmPassword) {
            myToast.error("Please fill both fields")
            return
        }

        if (formData.password !== formData.confirmPassword) {
            myToast.error("Passwords do not match")
            return
        }


        try {
            setIsLoading(true)

            const form = new FormData()
            form.append("email", ADMIN_EMAIL)
            form.append("password", formData.password)

            const res = await fetch("/api/auth/change-password", {
                method: "POST",
                body: form,
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to change password")
            }

            myToast.success(data.message)

        } catch (error: any) {
            myToast.error(error.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4 mt-4">
            <PasswordInput
                id="new-password"
                label="New Password"
                value={formData.password}
                onChange={(value: string) =>
                    setFormData({ ...formData, password: value })
                }
            />

            <PasswordInput
                id="confirm-password"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={(value: string) =>
                    setFormData({ ...formData, confirmPassword: value })
                }
            />

            <Button
                disabled={isLoading}
                onClick={handleChangePassword}
                className="bg-accent hover:bg-accent/90"
            >
                {isLoading ? <Spinner /> : "Change Password"}
            </Button>
        </div>
    )
}

export default ChangePasswordForm