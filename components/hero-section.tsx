'use client'

import ScheduleCard from '../components/ScheduleCard'
import MainContent from '../components/MainContent'

export default function HeroSection() {


  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-contain sm:bottom-0 bottom-240 bg-no-repeat bg-center opacity-50"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/proxmaircloud/image/upload/v1774121797/products/zf6aisy27jaolgdms97j.png')",
        }}
      />
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
         <MainContent/>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24">
            <ScheduleCard />
          </div>
        </div>
      </div>
    </section>
  )
}