"use client";

import { useTranslation } from "@/app/i18n/client";
import { createPathWithLang } from "@/app/i18n/client-config";
import { languages } from "@/app/i18n/settings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LanguageSwitcher = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const pathname = usePathname() || "/";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full aspect-square">
          <Globe className="h-6 w-6" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto px-2">
        {languages.map((l, index) => (
          <DropdownMenuItem
            key={index}
            disabled={lng === l}
          >
            <Link
              className={`w-full cursor-pointer justify-between flex items-center`}
              href={pathname ? createPathWithLang(pathname, l) : `/${l}`}
            >
              <span>{t(l)}</span>
              {lng === l && (
                <span className="ml-auto text-xs text-blue-600 dark:text-blue-400">✓</span>
              )}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;