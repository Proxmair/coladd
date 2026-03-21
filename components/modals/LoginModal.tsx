'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import LoginForm from '../forms/LoginForm'

export default function AuthModal({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:w-105 w-80">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">
                        Admin Login
                    </DialogTitle>
                </DialogHeader>
                <LoginForm />
            </DialogContent>
        </Dialog>
    )
}