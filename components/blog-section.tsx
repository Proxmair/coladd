'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Your Health: A Comprehensive Guide',
    description: 'Learn the fundamentals of maintaining good health through proper nutrition, exercise, and regular check-ups.',
    image: '/blog1.jpg',
    category: 'Health Tips',
  },
  {
    id: 2,
    title: 'The Importance of Preventive Care',
    description: 'Discover why preventive healthcare is crucial and how regular screenings can save your life.',
    image: '/blog2.jpg',
    category: 'Medical Insights',
  },
  {
    id: 3,
    title: 'Managing Stress for Better Health',
    description: 'Explore practical techniques to manage stress and improve your overall well-being.',
    image: '/blog3.jpg',
    category: 'Wellness',
  },
  {
    id: 4,
    title: 'Nutrition and Disease Prevention',
    description: 'Learn how proper nutrition can help prevent chronic diseases and promote longevity.',
    image: '/blog4.jpg',
    category: 'Nutrition',
  },
  {
    id: 5,
    title: 'Exercise Guidelines for Different Age Groups',
    description: 'Understand the recommended exercise routines tailored for your age and fitness level.',
    image: '/blog5.jpg',
    category: 'Fitness',
  },
  {
    id: 6,
    title: 'Mental Health: Breaking the Stigma',
    description: 'An in-depth look at mental health awareness and seeking professional help.',
    image: '/blog6.jpg',
    category: 'Mental Health',
  },
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-accent" />
              <h2 className="text-4xl md:text-5xl font-bold text-primary">Latest Articles</h2>
            </div>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Explore my latest healthcare insights and medical knowledge shared through in-depth articles.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="h-full bg-card border-2 border-accent/10 hover:border-accent/40 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
                  {/* Image */}
                  <div className="relative h-48 w-full bg-gradient-to-br from-secondary to-accent overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground line-clamp-2 hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-foreground/70 text-sm line-clamp-3">
                      {post.description}
                    </p>

                    {/* Read More Button */}
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center pt-8">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-lg"
            >
              <Link href="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
