import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import { ADMIN_EMAIL } from '@/lib/constant'

function formatSocialData(user: any) {
  return {
    _id: user?._id || null,
    facebookLink: user?.facebookLink || '',
    youtubeLink: user?.youtubeLink || '',
    twitterLink: user?.twitterLink || '',
    instagramLink: user?.instagramLink || '',
    linkedinLink: user?.linkedinLink || '',
  }
}

export async function GET() {
  try {
    await connectDB()
    const user = await User.findOne(
      { email: ADMIN_EMAIL },
      'facebookLink youtubeLink twitterLink instagramLink linkedinLink'
    )

    return NextResponse.json({ data: formatSocialData(user) })
  } catch (err) {
    return NextResponse.json({ message: 'Server error', error: err }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()

    const formData = await req.formData()
    const user = await User.findOne({ email: ADMIN_EMAIL })

    if (!user) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 })
    }

    user.facebookLink = ((formData.get('facebookLink') as string) || '').trim()
    user.youtubeLink = ((formData.get('youtubeLink') as string) || '').trim()
    user.twitterLink = ((formData.get('twitterLink') as string) || '').trim()
    user.instagramLink = ((formData.get('instagramLink') as string) || '').trim()
    user.linkedinLink = ((formData.get('linkedinLink') as string) || '').trim()

    await user.save()

    return NextResponse.json({ message: 'Social links updated', data: formatSocialData(user) })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ message: 'Server error', error: err.message }, { status: 500 })
  }
}
