import HomeParagraphTable from '@/components/dashboard/home/HomeParagrphTable'
import HomeHeading from '@/components/dashboard/home/HomeHeading'
import HomeProfileLink from '@/components/dashboard/home/HomeProfileLink'
import HomeScheduleTable from '@/components/dashboard/home/HomeScheduleTable'
import HomeBackgroundImage from '@/components/dashboard/home/HomeBackgroundImage'
import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
  return (
    <div className='flex flex-col gap-4' >
      <HomeHeading/>
      <HomeParagraphTable />
      <HomeProfileLink/>
      <HomeScheduleTable/>
      <HomeBackgroundImage/>
    </div>
  )

}

export default Page