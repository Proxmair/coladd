'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Video } from 'lucide-react'

const videos = [
  {
    id: 1,
    title: 'Introduction to Healthy Living',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '12:34',
  },
  {
    id: 2,
    title: 'Nutrition Tips for Beginners',
    thumbnail: 'https://img.youtube.com/vi/8P0nV-J6DQE/hqdefault.jpg',
    youtubeId: '8P0nV-J6DQE',
    duration: '15:42',
  },
  {
    id: 3,
    title: 'Home Remedies for Common Illnesses',
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg',
    youtubeId: '9bZkp7q19f0',
    duration: '18:20',
  },
  {
    id: 4,
    title: 'Understanding Blood Pressure',
    thumbnail: 'https://img.youtube.com/vi/jNgzyeUwrnw/hqdefault.jpg',
    youtubeId: 'jNgzyeUwrnw',
    duration: '14:15',
  },
  {
    id: 5,
    title: 'Exercise Routine for Daily Health',
    thumbnail: 'https://img.youtube.com/vi/5KLPxDtMqe8/hqdefault.jpg',
    youtubeId: '5KLPxDtMqe8',
    duration: '22:30',
  },
  {
    id: 6,
    title: 'Medical Check-up Importance',
    thumbnail: 'https://img.youtube.com/vi/Xvjc_I3Bkqc/hqdefault.jpg',
    youtubeId: 'Xvjc_I3Bkqc',
    duration: '10:45',
  },
]

export default function VideosSection() {
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
                key={video.id}
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
                    src={video.thumbnail}
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
                  <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                    {video.title}
                  </h3>

                  {/* Watch Button */}
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold rounded-lg">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>

          {/* YouTube Channel Link */}
          <div className="text-center pt-8">
            <p className="text-foreground/70 mb-4">
              Subscribe to our YouTube channel for more educational content
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-lg"
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
