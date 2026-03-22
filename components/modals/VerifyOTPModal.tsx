'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import VerifyOtpForm from '../forms/VerifyOtpForm'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function VerifyOtpModal({ open, onOpenChange }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:w-105 w-80">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-center text-xl font-bold">
                        Verify OTP
                    </DialogTitle>

                    <p className="text-xs text-center text-muted-foreground leading-relaxed">
                        Enter the 6-digit code sent to admin email. The code usually
                        arrives within 1 minute and expires after 10 minutes.
                    </p>
                </DialogHeader>

                <VerifyOtpForm />
            </DialogContent>
        </Dialog>
    )
}