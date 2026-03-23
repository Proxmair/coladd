import HomeScheduleTable from '@/components/dashboard/home/HomeScheduleTable'
import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
  return (
    <div>
      <HomeScheduleTable/>
    </div>
  )

}

export default Page