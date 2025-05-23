// app/admin/scenarios/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScenarioListClient from "./ScenarioListClient";
import { useTranslations } from "@/components/translations-context";

export default function ScenarioListPage() {
  const { t } = useTranslations();

  return (
    <main className="max-w-5xl mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("scenarios.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("scenarios.description")}
          </p>
        </div>
      </div>
      <Button asChild className="px-5">
        <Link href="/admin/scenarios/new">{t("scenarios.new")}</Link>
      </Button>

      <ScenarioListClient />
    </main>
  );
}
