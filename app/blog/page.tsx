import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { connectDB } from '@/lib/mongodb'
import Blog from '@/models/Blog'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  await connectDB()
  const blogPosts = await Blog.find().sort({ createdAt: -1 }).lean()

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
            Explore our latest healthcare articles and medical insights.
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link key={String(post._id)} href={`/blog/${String(post._id)}`}>
              <Card className="p-6 md:p-8 bg-card border-2 border-accent/10 hover:border-accent/40 cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-card/80">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Content */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                        {post.details?.tags?.[0] || 'General'}
                      </span>
                      <span className="text-sm text-foreground/60">
                        {new Date(post.details?.date || post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {post.details?.heading || post.heading}
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
