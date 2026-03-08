import { Button } from '@/components/ui/button'
import { Ghost, Home, Plus } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted">
          <Ghost className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground">
            Looks like this page has already been laid to rest. Perhaps it belongs on someone&apos;s Anti-Bucket list.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button asChild variant="outline">
            <a href="/">
              <Home className="h-4 w-4 mr-2" />
              Go home
            </a>
          </Button>
          <Button asChild className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600">
            <a href="/add">
              <Plus className="h-4 w-4 mr-2" />
              Add an item
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
