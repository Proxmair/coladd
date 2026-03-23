'use client'

import { useEffect, useState } from 'react'
import BlogDetailForm from '@/components/forms/BlogDetailForm'
import { myToast } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const BlogDetailPage = () => {
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const pathname = usePathname()
  const blogId = pathname?.split('/').pop()

  useEffect(() => {
    if (!blogId) return

    let isMounted = true

    const fetchBlog = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/blogs/${blogId}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        if (isMounted) setBlog(data.blog)
      } catch (err: any) {
        if (isMounted) myToast.error(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchBlog()

    return () => {
      isMounted = false
    }
  }, [blogId])

  // ✅ FIXED: accept FormData directly
  const handleSubmit = async (form: FormData) => {
    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        body: form,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      myToast.success('Blog updated successfully')
    } catch (err: any) {
      myToast.error(err.message)
    }
  }

  if (loading) return <p>Loading blog...</p>
  if (!blog) return <p>Blog not found</p>

  return (
    <div className="max-w-4xl mx-auto py-10">
      <BlogDetailForm defaultValues={blog} onSubmit={handleSubmit} />
    </div>
  )
}

export default BlogDetailPage