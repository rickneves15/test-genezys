import { Header } from '~/components/header'
import { ListUsers } from '~/components/list-users'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-8">
      <Header />
      <main className="flex flex-1 flex-col items-center px-20">
        <ListUsers />
      </main>
    </div>
  )
}
