'use client'

import { useEffect, useState } from 'react'
import { myToast } from '@/lib/utils'
import ScheduleSingleCard from './ScheduleSingleCard'
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from './ui/carousel'

interface ScheduleItem {
    location: string[]
    timings: Record<string, string[]>
    contact: string[]
}

export default function ScheduleCard() {
    const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(1)

    // ---------------- FETCH SCHEDULE ----------------
    const fetchSchedules = async () => {
        try {
            setLoading(true)

            const res = await fetch('/api/home/schedule')
            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            const filteredData = (data.data || [])
                .map((item: ScheduleItem) => ({
                    location: (item.location || []).filter(loc =>
                        loc?.trim()
                    ),

                    timings: Object.fromEntries(
                        Object.entries(item.timings || {}).filter(
                            ([_, times]) =>
                                Array.isArray(times) &&
                                times.some(t => t.trim())
                        )
                    ),

                    contact: (item.contact || []).filter(c =>
                        c?.trim()
                    ),
                }))
                .filter(
                    (item: ScheduleItem) =>
                        item.location.length > 0 ||
                        Object.keys(item.timings).length > 0 ||
                        item.contact.length > 0
                )

            setScheduleData(filteredData)
        } catch (err: any) {
            myToast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSchedules()
    }, [])

    // ---------------- TRACK CURRENT SLIDE ----------------
    useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap() + 1)

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    if (loading) {
        return (
            <p className="text-center text-sm text-foreground/70 mt-4">
                Loading schedule...
            </p>
        )
    }

    // SINGLE CARD
    if (scheduleData.length <= 1) {
        return (
            <>
                {scheduleData.map((item, index) => (
                    <ScheduleSingleCard
                        key={'schedule-card-' + index}
                        item={item}
                    />
                ))}
            </>
        )
    }

    // MULTIPLE CARDS => VERTICAL CAROUSEL
    return (
       <Carousel
        setApi={setApi}
        orientation="vertical"
        opts={{
            align: 'start',
            loop: true,
        }}
         plugins={[
        Autoplay({
          delay: 6000,
        }),
      ]}
        className="w-full max-w-full relative"
    >
        {/* TOP CONTROLS */}
        <div className="flex items-center justify-center gap-4 mb-4">
            <CarouselPrevious
                className="static translate-x-0 translate-y-0 rotate-90"
            />

            <p className="text-sm font-medium text-foreground/80">
                Schedule {current} of {scheduleData.length}
            </p>

            <CarouselNext
                className="static translate-x-0 translate-y-0 rotate-90"
            />
        </div>

        <CarouselContent className="h-[850px]">
            {scheduleData.map((item, index) => (
                <CarouselItem
                    key={'schedule-card-carousel-' + index}
                    className="basis-full"
                >
                    <ScheduleSingleCard item={item} />
                </CarouselItem>
            ))}
        </CarouselContent>
    </Carousel>
    )
}