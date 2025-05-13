'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Scenario {
    id: string
    title: string
    description: string
    createdAt: string
    createdBy: {
        name: string
    } | null
}

export default function ScenarioListClient() {
    const [scenarios, setScenarios] = useState<Scenario[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/admin/scenarios')
            .then((res) => res.json())
            .then((data) => {
                setScenarios(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const handleDelete = async (id: string) => {
        const confirmed = confirm(
            'Are you sure you want to delete this scenario?'
        )
        if (!confirmed) return

        const res = await fetch(`/api/admin/scenarios/${id}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            setScenarios((prev) => prev.filter((s) => s.id !== id))
        } else {
            alert('Failed to delete scenario.')
        }
    }

    if (loading) {
        return <p className="text-center mt-20">Loading...</p>
    }

    return (
        <div className="space-y-4">
            {scenarios.map((scenario) => (
                <Card key={scenario.id}>
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="font-semibold text-lg">
                                    {scenario.title}
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    {scenario.description}
                                </p>
                                <p className="text-sm mt-1">
                                    ID:{' '}
                                    <Link
                                        href={`/admin/scenarios/${scenario.id}/edit`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {scenario.id}
                                    </Link>
                                </p>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                                <p>
                                    By: {scenario.createdBy?.name || 'Unknown'}
                                </p>
                                <p>
                                    {new Date(
                                        scenario.createdAt
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4 gap-2">
                            <Button variant="outline" asChild>
                                <Link
                                    href={`/admin/scenarios/${scenario.id}/edit`}
                                >
                                    Edit
                                </Link>
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => handleDelete(scenario.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
