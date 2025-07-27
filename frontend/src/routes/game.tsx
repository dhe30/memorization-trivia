import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/game')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='my-layout test justify-center relative'>
      <Outlet></Outlet>
    </div>
  )
}
