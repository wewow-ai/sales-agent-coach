"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { MobileNav } from "./mobile-nav";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslations } from "@/components/translations-context";
import { useSession, signIn, signOut } from "next-auth/react";

export function Header() {
  const { t } = useTranslations();
  const { data: session, status } = useSession();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full sticky top-0 z-50 border-b bg-background"
    >
      <div className="container mx-auto px-4 h-12 flex items-center justify-between gap-2">
        <MobileNav />
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-md:hidden flex items-center"
        >
          <Link href="/" className="flex gap-3 items-center">
            <motion.h1
              className="text-lg font-medium tracking-tighter flex gap-1 items-center"
              whileHover={{ scale: 1.02 }}
            >
              {t("header.logo")}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge variant="outline" className="text-normal">
                {t("header.beta")}
              </Badge>
            </motion.div>
          </Link>
        </motion.nav>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 items-center justify-end ml-auto"
        >
          <LanguageSwitcher />
          {status === "loading" ? (
            <p>Loading...</p>
          ) : !session ? (
            <Button
              variant="outline"
              size="sm"
              className="flex gap-3 items-center"
              onClick={() => signIn()} // Trigger login with next-auth
            >
              {t("header.login")}
            </Button>
          ) : (
            <>
              {(session.user.role === "ADMIN" ||
                session.user.role === "TEAM_LEAD") && (
                <Link href="/admin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-2 items-center"
                  >
                    {t("header.dashboard")}
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                size="sm"
                className="flex gap-3 items-center"
                onClick={() => signOut({ callbackUrl: "/" })} // Trigger logout with next-auth
              >
                {t("header.logout")}
              </Button>
            </>
          )}

          <ThemeSwitcher />
        </motion.div>
      </div>
    </motion.header>
  );
}
