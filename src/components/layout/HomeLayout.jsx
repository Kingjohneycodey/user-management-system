import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
  return (
      <div className="">


        <main className="min-h-[80vh]">
          <Outlet />
        </main>

        <footer>
            footer
        </footer>
      </div>
  )
}