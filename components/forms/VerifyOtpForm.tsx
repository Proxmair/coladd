'use client'

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { myToast } from "@/lib/utils"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import React from "react"
import { RefreshCwIcon } from "lucide-react"
import { useDispatch } from "react-redux"
import { setModal } from "@/store/slices/modalSlice"
import { ADMIN_EMAIL } from "@/lib/constant"

const VerifyOtpForm = () => {

    const dispatch = useDispatch()

    const [otp, setOtp] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [isResending, setIsResending] = React.useState(false)

    const handleVerifyOtp = async () => {
        try {
            setIsLoading(true)

            const form = new FormData()
            form.append("otp", otp)

            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                body: form,
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Invalid OTP")
            }

            myToast.success(data.message)
            dispatch(setModal({ key: 'verifyOTP', value: false }))
        } catch (error: any) {
            myToast.error(error.message || "OTP verification failed")
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendOtp = async () => {
        try {
            setIsResending(true)

            const form = new FormData()
           form.append("email", ADMIN_EMAIL || '')
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                body: form,
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to resend OTP")
            }

            myToast.success("OTP resent successfully!")
            setOtp("")
        } catch (error: any) {
            myToast.error(error.message || "Failed to resend OTP")
        } finally {
            setIsResending(false)
        }
    }

    return (
        <div className="space-y-4 mt-4">
            {/* Resend OTP */}
            <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className="w-full mb-2 mt-0 text-xs text-right text-muted-foreground flex items-center justify-end gap-1 hover:text-accent/80 active:scale-95 transition-transform duration-150 origin-right"
            >
                <RefreshCwIcon className="w-3.5 h-3.5" />
                {isResending ? "Resending..." : "Resend OTP"}
            </button>

            <div className="flex justify-center">
                <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    className="justify-center"
                >
                    <InputOTPGroup className="flex gap-1 sm:gap-2">
                        <InputOTPSlot index={0} className="h-8 w-8 sm:h-12 sm:w-12 text-lg sm:text-xl border border-primary/50" />
                        <InputOTPSlot index={1} className="h-8 w-8 sm:h-12 sm:w-12 text-lg sm:text-xl border border-primary/50" />
                        <InputOTPSlot index={2} className="h-8 w-8 sm:h-12 sm:w-12 text-lg sm:text-xl border border-primary/50" />
                    </InputOTPGroup>

                    <InputOTPSeparator className="mx-1 sm:mx-2" />

                    <InputOTPGroup className="flex gap-1 sm:gap-2">
                        <InputOTPSlot index={3} className="h-8 w-8 sm:h-12 sm:w-12 text-lg sm:text-xl border border-primary/50" />
                        <InputOTPSlot index={4} className="h-8 w-8 sm:h-12 sm:w-12 text-lg sm:text-xl border border-primary/50" />
                        <InputOTPSlot index={5} className="h-8 w-8 sm:h-12 sm:w-12 text-lg sm:text-xl border border-primary/50" />
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <Button
                disabled={otp.length !== 6 || isLoading}
                onClick={handleVerifyOtp}
                className="bg-accent hover:bg-accent/90 w-full"
            >
                {isLoading ? <Spinner /> : "Verify OTP"}
            </Button>
        </div>
    )
}

export default VerifyOtpForm