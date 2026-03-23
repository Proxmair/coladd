'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
]

export default function HomeScheduleForm({
    onSubmit,
    defaultValues,
}: any) {
    const [location, setLocation] = useState<string[]>(
        defaultValues?.location || ['']
    )

    const [contact, setContact] = useState<string[]>(
        defaultValues?.contact || ['']
    )

    const [timings, setTimings] = useState<any>(
        defaultValues?.timings ||
        days.reduce((acc, day) => {
            acc[day] = ['']
            return acc
        }, {} as any)
    )

    // ---------------- LOCATION ----------------
    const updateArray = (arr: string[], setArr: any, index: number, value: string) => {
        const updated = [...arr]
        updated[index] = value
        setArr(updated)
    }

    const addField = (arr: string[], setArr: any) => {
        setArr([...arr, ''])
    }

    const removeField = (arr: string[], setArr: any, index: number) => {
        setArr(arr.filter((_: any, i: number) => i !== index))
    }

    // ---------------- TIMINGS ----------------
    const updateTiming = (day: string, index: number, value: string) => {
        const updated = { ...timings }
        updated[day][index] = value
        setTimings(updated)
    }

    const addTiming = (day: string) => {
        const updated = { ...timings }
        updated[day].push('')
        setTimings(updated)
    }

    const removeTiming = (day: string, index: number) => {
        const updated = { ...timings }
        updated[day] = updated[day].filter((_: any, i: number) => i !== index)
        setTimings(updated)
    }

    // ---------------- SUBMIT ----------------
    const handleSubmit = () => {
        onSubmit({
            location,
            contact,
            timings,
        })
    }

    return (
        <div className="space-y-4">

            {/* LOCATION */}
            <div>
                <h3 className="font-semibold mb-2">Location</h3>
                {location.map((loc, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <Input
                            value={loc}
                            onChange={(e) =>
                                updateArray(location, setLocation, i, e.target.value)
                            }
                            placeholder="Enter location"
                        />
                        <Button variant="destructive" onClick={() => removeField(location, setLocation, i)}>
                            X
                        </Button>
                    </div>
                ))}
                <Button size="sm" onClick={() => addField(location, setLocation)}>
                    + Add Location
                </Button>
            </div>

            {/* CONTACT */}
            <div>
                <h3 className="font-semibold mb-2">Contact</h3>
                {contact.map((c, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <Input
                            value={c}
                            onChange={(e) =>
                                updateArray(contact, setContact, i, e.target.value)
                            }
                            placeholder="Enter contact"
                        />
                        <Button variant="destructive" onClick={() => removeField(contact, setContact, i)}>
                            X
                        </Button>
                    </div>
                ))}
                <Button size="sm" onClick={() => addField(contact, setContact)}>
                    + Add Contact
                </Button>
            </div>

            {/* TIMINGS */}
            <div>
                <h3 className="font-semibold mb-2 w-full">Timings</h3>
                <div className='grid grid-cols-2'>

                    {days.map((day) => (
                        <div key={day} className="mb-3">
                            <p className="text-sm font-medium">{day}</p>

                            {timings[day].map((time: string, i: number) => (
                                <div key={i} className="flex gap-2 mb-2">
                                    <Input
                                        value={time}
                                        onChange={(e) =>
                                            updateTiming(day, i, e.target.value)
                                        }
                                        placeholder="3:30 PM - 5:30 PM"
                                    />
                                    <Button
                                        variant="destructive"
                                        onClick={() => removeTiming(day, i)}
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}

                            <Button size="sm" onClick={() => addTiming(day)}>
                                + Add Timing
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* SUBMIT */}
            <Button className="w-full" onClick={handleSubmit}>
                Save
            </Button>
        </div>
    )
}