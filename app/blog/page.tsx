import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Your Health: A Comprehensive Guide',
    description: 'Learn the fundamentals of maintaining good health through proper nutrition, exercise, and regular check-ups.',
    category: 'Health Tips',
    date: 'March 15, 2024',
  },
  {
    id: 2,
    title: 'The Importance of Preventive Care',
    description: 'Discover why preventive healthcare is crucial and how regular screenings can save your life.',
    category: 'Medical Insights',
    date: 'March 10, 2024',
  },
  {
    id: 3,
    title: 'Managing Stress for Better Health',
    description: 'Explore practical techniques to manage stress and improve your overall well-being.',
    category: 'Wellness',
    date: 'March 5, 2024',
  },
  {
    id: 4,
    title: 'Nutrition and Disease Prevention',
    description: 'Learn how proper nutrition can help prevent chronic diseases and promote longevity.',
    category: 'Nutrition',
    date: 'February 28, 2024',
  },
  {
    id: 5,
    title: 'Exercise Guidelines for Different Age Groups',
    description: 'Understand the recommended exercise routines tailored for your age and fitness level.',
    category: 'Fitness',
    date: 'February 20, 2024',
  },
  {
    id: 6,
    title: 'Mental Health: Breaking the Stigma',
    description: 'An in-depth look at mental health awareness and seeking professional help.',
    category: 'Mental Health',
    date: 'February 15, 2024',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button
              variant="outline"
              className="mb-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">All Articles</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Explore our comprehensive collection of healthcare articles and medical insights.
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="p-6 md:p-8 bg-card border-2 border-accent/10 hover:border-accent/40 cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-card/80">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Content */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-foreground/60">{post.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-foreground/80">
                      {post.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-end">
                    <div className="bg-accent/10 rounded-full p-4 group-hover:bg-accent group-hover:text-primary transition-all">
                      <ArrowRight className="w-6 h-6 text-accent group-hover:text-primary" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination Info */}
        <div className="mt-12 text-center">
          <p className="text-foreground/70">
            Showing all {blogPosts.length} articles
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
