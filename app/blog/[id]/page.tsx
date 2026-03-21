'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User } from 'lucide-react'

const blogPosts = {
  1: {
    title: 'Understanding Your Health: A Comprehensive Guide',
    author: 'Dr. Khurram Baqai',
    date: 'March 15, 2024',
    category: 'Health Tips',
    content: `
      <p>
        Maintaining good health is one of the most important aspects of living a fulfilling life. 
        In this comprehensive guide, we'll explore the fundamental principles of health and wellness.
      </p>
      
      <h3>The Pillars of Good Health</h3>
      <p>
        Good health is built on several key pillars: proper nutrition, regular exercise, adequate sleep, 
        stress management, and regular medical check-ups.
      </p>
      
      <h3>Nutrition</h3>
      <p>
        A balanced diet rich in fruits, vegetables, whole grains, and lean proteins is essential for 
        maintaining optimal health. Avoid excessive sugar, salt, and processed foods.
      </p>
      
      <h3>Exercise</h3>
      <p>
        Regular physical activity helps maintain a healthy weight, strengthens your muscles and bones, 
        and improves cardiovascular health. Aim for at least 150 minutes of moderate exercise per week.
      </p>
      
      <h3>Sleep</h3>
      <p>
        Quality sleep is crucial for physical and mental health. Adults should aim for 7-9 hours of 
        sleep per night to allow their bodies to recover and regenerate.
      </p>
      
      <h3>Stress Management</h3>
      <p>
        Chronic stress can have serious health consequences. Practice relaxation techniques such as 
        meditation, deep breathing, or yoga to manage stress effectively.
      </p>
      
      <h3>Regular Check-ups</h3>
      <p>
        Regular medical check-ups help detect health problems early when they're most treatable. 
        Schedule annual check-ups with your healthcare provider.
      </p>
      
      <p>
        By focusing on these pillars, you can improve your overall health and well-being significantly. 
        Remember, small changes made consistently can lead to significant health improvements over time.
      </p>
    `,
  },
  2: {
    title: 'The Importance of Preventive Care',
    author: 'Dr. Khurram Baqai',
    date: 'March 10, 2024',
    category: 'Medical Insights',
    content: `
      <p>
        Preventive healthcare is one of the most effective ways to maintain good health and avoid serious 
        medical conditions. This article explores why preventive care is so important.
      </p>
      
      <h3>What is Preventive Care?</h3>
      <p>
        Preventive care includes all measures taken to prevent disease, such as vaccinations, screenings, 
        and lifestyle modifications.
      </p>
      
      <h3>Early Detection Saves Lives</h3>
      <p>
        Many serious diseases can be detected early through regular screening. Early detection often means 
        more treatment options and better outcomes.
      </p>
    `,
  },
  3: {
    title: 'Managing Stress for Better Health',
    author: 'Dr. Khurram Baqai',
    date: 'March 5, 2024',
    category: 'Wellness',
    content: `
      <p>
        Stress is a natural part of life, but chronic stress can have serious impacts on your health. 
        Learn how to manage stress effectively.
      </p>
      
      <h3>Understanding Stress</h3>
      <p>
        Stress is your body's response to any demand or threat. When you sense danger, your body releases 
        stress hormones that prepare you to respond.
      </p>
      
      <h3>Stress Management Techniques</h3>
      <p>
        There are many effective techniques to manage stress, including meditation, exercise, deep breathing, 
        and counseling.
      </p>
    `,
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const postId = params.id as string
  const post = blogPosts[parseInt(postId) as keyof typeof blogPosts] || null

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Article Not Found</h1>
          <p className="text-foreground/70 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link href="/#blog">
          <Button
            variant="outline"
            className="mb-8 flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-12 space-y-6">
          <div className="space-y-4">
            <span className="inline-block bg-accent text-primary text-sm font-bold px-4 py-2 rounded-full">
              {post.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
              {post.title}
            </h1>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap gap-6 text-sm text-foreground/70 border-t border-b border-border py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-accent" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span>{post.date}</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div
          className="prose prose-invert max-w-none mb-12 text-foreground space-y-6"
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/<h3>/g, '<h3 class="text-2xl font-bold text-primary mt-8 mb-4">')
              .replace(/<p>/g, '<p class="text-lg leading-relaxed text-foreground/90">'),
          }}
        />

        {/* Related Articles Link */}
        <div className="mt-12 pt-12 border-t border-border">
          <p className="text-foreground/70 mb-4">Want to read more?</p>
          <Link href="/#blog">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              View More Articles
            </Button>
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  )
}
