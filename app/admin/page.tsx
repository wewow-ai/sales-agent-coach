'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboardPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth')
        }
    }, [status, router])

    if (status === 'loading') {
        return <div className="p-8">Loading...</div>
    }

    return (
        <main className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Link
                    href="/admin/scenarios"
                    className="block p-6 border rounded shadow hover:bg-gray-50"
                >
                    <h2 className="text-lg font-semibold">Manage Scenarios</h2>
                    <p className="text-sm text-gray-600">
                        Add, edit or remove training scenarios with transcripts
                        and breakdowns.
                    </p>
                </Link>

                <Link
                    href="/admin/sessions"
                    className="block p-6 border rounded shadow hover:bg-gray-50"
                >
                    <h2 className="text-lg font-semibold">Agent Sessions</h2>
                    <p className="text-sm text-gray-600">
                        View sessions submitted by sales agents, including
                        feedback and stats.
                    </p>
                </Link>

                <Link
                    href="/admin/users"
                    className="block p-6 border rounded shadow hover:bg-gray-50"
                >
                    <h2 className="text-lg font-semibold">User Management</h2>
                    <p className="text-sm text-gray-600">
                        Review team leads and sales agents. Permissions by role.
                    </p>
                </Link>
            </div>
        </main>
    )
}
