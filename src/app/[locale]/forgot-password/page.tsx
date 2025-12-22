"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import { requestPasswordReset } from "./actions";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  const locale = useLocale();
  const [emailSent, setEmailSent] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error: string; success: boolean }, formData: FormData) => {
      const result = await requestPasswordReset(formData);
      if (result?.success) {
        setEmailSent(true);
      }
      return result ?? { error: "", success: false };
    },
    { error: "", success: false }
  );

  if (emailSent) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/5 via-background to-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-2 pb-2">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold">{t("emailSentTitle")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("emailSentDescription")}
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <Button asChild className="w-full">
              <Link href={`/${locale}/login`}>{t("backToLogin")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/5 via-background to-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2 pb-2">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("subtitle")}
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <form action={formAction} className="space-y-4">
            {state.error !== "" && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {state.error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t("email")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
              {isPending ? t("loading") : t("submit")}
            </Button>
          </form>

          {/* Back to Login */}
          <Link
            href={`/${locale}/login`}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToLogin")}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
