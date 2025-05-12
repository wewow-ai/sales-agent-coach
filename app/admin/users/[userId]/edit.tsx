'use client'

import { useRole } from '@/hooks/use-role'
import { redirect } from 'next/navigation'

export default function ScenarioPage() {
    const { isAdmin } = useRole()
    if (!isAdmin) {
        redirect('/') // Or show "Access Denied"
    }

    return <div>Scenario management UI here</div>
}
