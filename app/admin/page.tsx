"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "@/components/translations-context";

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslations();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-8">{t("common.loading")}</div>;
  }

  const role = session?.user?.role;
  const canSeeStats = role === "ADMIN" || role === "TEAM_LEAD";

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-6">{t("admin.title")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/admin/scenarios"
          className="block p-6 border rounded shadow hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">{t("admin.scenariosTitle")}</h2>
          <p className="text-sm text-gray-600">
            {t("admin.scenariosDescription")}
          </p>
        </Link>

        <Link
          href="/admin/recordings"
          className="block p-6 border rounded shadow hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">{t("admin.sessionsTitle")}</h2>
          <p className="text-sm text-gray-600">
            {t("admin.sessionsDescription")}
          </p>
        </Link>

        <Link
          href="/admin/users"
          className="block p-6 border rounded shadow hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">{t("admin.usersTitle")}</h2>
          <p className="text-sm text-gray-600">{t("admin.usersDescription")}</p>
        </Link>

        {canSeeStats && (
          <Link
            href="/admin/statistics"
            className="block p-6 border rounded shadow hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold">{t("admin.statsTitle")}</h2>
            <p className="text-sm text-gray-600">
              {t("admin.statsDescription")}
            </p>
          </Link>
        )}
      </div>
    </main>
  );
}
