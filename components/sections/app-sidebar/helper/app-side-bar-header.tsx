'use client'

import { SidebarHeader, useSidebar } from '@/components/ui/sidebar'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const LOGO_URL =
    'https://res.cloudinary.com/proxmaircloud/image/upload/v1774124473/products/ndg6rydh0jxbq0t3ulxi.png'

const AppSidebarHeader = () => {
    const { state } = useSidebar()
    const router = useRouter()
    return (
        <>
            {state !== "collapsed" ? (
                <SidebarHeader className="p-4 text-lg font-semibold">
                    <div
                        onClick={() => router.push("/dashboard/home")}
                        className="flex items-center gap-2 hover:cursor-pointer active:scale-95 transition-all"
                    >
                        
                            <Image
                                src={LOGO_URL}
                                alt="Logo"
                                className="w-30 h-30"
                                width={0}
                                height={0}
                            />
                        
                    </div>
                </SidebarHeader>
            ) : (
                <SidebarHeader className="px-1 py-4">
                    <div
                        onClick={() => router.push("/dashboard/home")}
                        className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center cursor-pointer"
                    >
                        <Image
                            src={LOGO_URL}
                            alt="Logo"
                            className="w-full h-full"
                            width={0}
                            height={0}
                        />
                    </div>
                </SidebarHeader>
            )}
        </>
    )
}

export default AppSidebarHeader