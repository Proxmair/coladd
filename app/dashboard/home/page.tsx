import HomeScheduleTable from '@/components/dashboard/home/HomeScheduleTable'
import HomeProfileSection from '@/components/dashboard/home/HomeProfileSection'
import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
  return (
    <div>
      <HomeProfileSection/>
      <HomeScheduleTable/>
    </div>
  )

}

export default Page