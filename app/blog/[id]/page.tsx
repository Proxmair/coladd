import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import Blog from '@/models/Blog'

export const dynamic = 'force-dynamic'

type BlogPostPageProps = {
  params: Promise<{ id: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params
  await connectDB()
  const post = await Blog.findById(id).lean()

  if (!post) {
    notFound()
  }

  const articleTitle = post.details?.heading || post.heading
  const articleDate = new Date(post.details?.date || post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const articleTags = post.details?.tags || []
  const articleContent = post.details?.content || []

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
            {articleTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {articleTags.map((tag: string) => (
                  <span key={tag} className="inline-block bg-accent text-primary text-sm font-bold px-4 py-2 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
              {articleTitle}
            </h1>
            <p className="text-lg text-foreground/80">{post.description}</p>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap gap-6 text-sm text-foreground/70 border-t border-b border-border py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-accent" />
              <span>{post.details?.author || 'Unknown author'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span>{articleDate}</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-none mb-12 space-y-6">
          {articleContent.length > 0 ? (
            articleContent.map((item: any, index: number) => {
              if (item.identity === 'heading') {
                return (
                  <h2 key={index} className="text-3xl font-bold text-primary">
                    {item.text}
                  </h2>
                )
              }

              if (item.identity === 'subheading') {
                return (
                  <h3 key={index} className="text-2xl font-semibold text-primary/90">
                    {item.text}
                  </h3>
                )
              }

              if (item.identity === 'imageLink' && item.imageLink) {
                return (
                  <img
                    key={index}
                    src={item.imageLink}
                    alt={articleTitle}
                    className="w-full rounded-2xl border border-border object-cover"
                  />
                )
              }

              return (
                <p key={index} className="text-lg leading-relaxed text-foreground/90">
                  {item.text}
                </p>
              )
            })
          ) : (
            <p className="text-lg leading-relaxed text-foreground/90">
              Full article content has not been added for this blog yet.
            </p>
          )}
        </div>

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
