import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateOTP = () => {
  const otp =  Math.floor(100000 + Math.random() * 900000).toString()
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  return {otp, otpExpires}
}

export const myToast = {
  success: (message: string) =>
    toast.success(message, { position: "top-right", className: '!border-none' }),

  error: (message: string) =>
    toast.success(message, { position: "top-right", className: '!border-none' }),

  info: (message: string) =>
    toast.success(message, { position: "top-right", className: '!border-none' }),

  warning: (message: string) =>
    toast.success(message, { position: "top-right", className: '!border-none' }),

  default: (message: string) =>
    toast(message, { position: "top-right", className: '!border-none' }),
}