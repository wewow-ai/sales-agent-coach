// app/auth/signin/page.tsx
'use client'

import { getCsrfToken, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
    const [csrfToken, setCsrfToken] = useState<string>('') // Set initial value to an empty string
    const { data: session, status } = useSession() // Hook to manage session state
    const router = useRouter()

    // Fetch CSRF token when the page loads
    useEffect(() => {
        getCsrfToken().then((token) => setCsrfToken(token ?? '')) // Ensure token is never undefined
    }, [])

    // Redirect user if authenticated
    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/') // Redirect to homepage if authenticated
        }
    }, [status, router])

    return (
        <main className="max-w-md mx-auto mt-20 p-4 border rounded shadow">
            <h1 className="text-xl font-bold mb-4">Sign in with Email</h1>

            {/* If session is loading, display a loading message */}
            {status === 'loading' && <p>Loading...</p>}

            {/* Show the sign-in form only if the user is not authenticated */}
            {status === 'unauthenticated' && (
                <form
                    method="post"
                    action="/api/auth/signin/email"
                    className="space-y-4"
                >
                    <input type="hidden" name="csrfToken" value={csrfToken} />
                    <label className="block">
                        <span>Email</span>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full border px-3 py-2 rounded"
                            placeholder="you@example.com"
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Send Magic Link
                    </button>
                </form>
            )}
        </main>
    )
}
