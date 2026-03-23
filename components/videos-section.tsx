'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Video } from 'lucide-react'

export default function VideosSection() {
  const [videos, setVideos] = useState<any[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos')
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        setVideos((data.data || []).filter((item: any) => item.isActive))
      } catch (error) {
        console.error('Failed to fetch videos:', error)
      }
    }

    fetchVideos()
  }, [])

  return (
    <section id="videos" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Video className="w-8 h-8 text-accent" />
              <h2 className="text-4xl md:text-5xl font-bold text-primary">Educational Videos</h2>
            </div>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Watch our comprehensive medical education videos covering various health topics.
            </p>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card
                key={video._id}
                className="bg-card border-2 border-accent/10 hover:border-accent/40 overflow-hidden transition-all duration-300 hover:shadow-lg group"
              >
                {/* Video Thumbnail */}
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-56 w-full bg-black overflow-hidden block"
                >
                  <img
                    src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                    <div className="bg-accent rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary fill-primary" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </a>

                {/* Video Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-secondary transition-colors">
                    {video.title}
                  </h3>

                  {video.description && (
                    <p className="text-sm text-foreground/70 line-clamp-3">{video.description}</p>
                  )}

                  {/* Watch Button */}
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold rounded-lg">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>

          {videos.length === 0 && (
            <p className="text-center py-6 text-gray-500">No videos found</p>
          )}

          {/* YouTube Channel Link */}
          <div className="text-center pt-8">
            <p className="text-foreground/70 mb-4">
              Subscribe to our YouTube channel for more educational content
            </p>
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-primary-foreground px-8 py-6 text-lg rounded-lg"
            >
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Our Channel
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
