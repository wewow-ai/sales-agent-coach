// app/admin/scenarios/page.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ScenarioListClient from './ScenarioListClient'

export default async function ScenarioListPage() {
    return (
        <main className="max-w-5xl mx-auto p-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Scenarios
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        View, edit, and manage customer service scenarios.
                    </p>
                </div>
            </div>
            <Button asChild className="px-5">
                <Link href="/admin/scenarios/new">+ New Scenario</Link>
            </Button>

            <ScenarioListClient />
        </main>
    )
}
