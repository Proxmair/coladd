'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { BookOpen, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BlogSection() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // ---------------- FETCH BLOGS ----------------
  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/blogs')
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setBlogs(data.data || [])
    } catch (err: any) {
      console.error('Failed to fetch blogs:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  // ---------------- HANDLE CLICK ----------------
  const handleClick = (blog: any) => {
    if (blog._id) {
      router.push(`/blog/${blog._id}`)
    }
  }

  return (
    <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-accent" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary">Blogs</h2>
          </div>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore my latest healthcare insights and medical knowledge shared through in-depth blogs.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              className={`h-full bg-card border-2 border-accent/10 overflow-hidden transition-all duration-300 ${
                blog._id ? 'hover:border-accent/40 hover:shadow-lg hover:scale-105 cursor-pointer' : ''
              }`}
              onClick={() => handleClick(blog)}
            >
              {/* Image */}
              <div className="relative h-48 w-full bg-gradient-to-br from-secondary to-accent overflow-hidden">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.heading}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground line-clamp-2 hover:text-accent transition-colors">
                  {blog.heading}
                </h3>
                <p className="text-foreground/70 text-sm line-clamp-3">{blog.description}</p>

                {/* Read More */}
                {blog._id && (
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}

          {!loading && blogs.length === 0 && (
            <p className="text-center col-span-full py-6 text-gray-500">No blogs found</p>
          )}
        </div>
      </div>
    </section>
  )
}
