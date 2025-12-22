"use client";

import { Instagram, Twitter, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-3">K-Nomad</h3>
            <p className="text-sm text-muted-foreground">{t("about")}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-3">{t("contact")}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:hello@k-nomad.kr"
                className="hover:text-primary transition-colors"
              >
                hello@k-nomad.kr
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
