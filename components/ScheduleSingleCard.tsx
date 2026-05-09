import React from 'react'
import { Card } from '@/components/ui/card'
import { MapPin, Clock, Phone } from 'lucide-react'
const ScheduleSingleCard = ({ item, index }: any) => {
    const formatTimings = (timings: Record<string, string[]>) => {
        if (!timings) return []

        return Object.entries(timings)
            .filter(([_, v]) => Array.isArray(v) && v.length)
            .map(([day, times]) => ({
                day,
                times: times.filter(t => t.trim()).join(' | ')
            }))
            .filter(t => t.times) // skip if no valid timing
    }
    return (
        <Card key={index} className="bg-card secondary-2 border-secondary/20 overflow-hidden mt-4 ml-2">
            <div className="bg-linear-to-r from-primary to-accent text-primary-foreground p-6">
                <h3 className="font-bold text-xl mb-6">Schedule & Contact</h3>
            </div>

            <div className="p-6 space-y-6">
                {/* LOCATION */}
                {item.location.length > 0 && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                            <h4 className="font-semibold text-foreground">Location</h4>
                        </div>
                        {item.location.map((loc: any, i: number) => (
                            <p key={i} className="text-sm text-foreground/80 ml-7">
                                {loc}
                            </p>
                        ))}
                    </div>
                )}

                {/* TIMINGS */}
                {Object.keys(item.timings).length > 0 && (
                    <div className="border-t border-border pt-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                            <h4 className="font-semibold text-foreground">Timings</h4>
                        </div>
                        <div className="text-sm text-foreground/80 ml-7 space-y-2">
                            {formatTimings(item.timings).map((t, i) => (
                                <p key={i}>
                                    <span className="font-medium">{t.day}</span>
                                    <br />
                                    {t.times}
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                {/* CONTACT */}
                {item.contact.length > 0 && (
                    <div className="border-t border-border pt-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                            <h4 className="font-semibold text-foreground">Contact</h4>
                        </div>
                        <div className="text-sm text-foreground/80 ml-7 space-y-1">
                            {item.contact.map((c: any, i: number) => (
                                <p key={i} className="hover:text-accent transition-colors">
                                    <a href={c.startsWith('03') ? `tel:${c}` : c}>{c}</a>
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default ScheduleSingleCard