"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, Check } from "lucide-react";
import { signUp } from "./actions";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error: string }, formData: FormData) => {
      const result = await signUp(formData);
      return result ?? { error: "" };
    },
    { error: "" }
  );

  const passwordRequirements = [
    { key: "minLength", check: password.length >= 8 },
    { key: "hasNumber", check: /\d/.test(password) },
    { key: "hasSpecial", check: /[!@#$%^&*]/.test(password) },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/5 via-background to-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2 pb-2">
          <h1 className="text-2xl font-bold">{t("register.title")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("register.subtitle")}
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
                {t("register.email")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("register.emailPlaceholder")}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                {t("register.password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("register.passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              {password && (
                <div className="space-y-1 mt-2">
                  {passwordRequirements.map((req) => (
                    <div
                      key={req.key}
                      className={`flex items-center gap-2 text-xs ${
                        req.check ? "text-green-600" : "text-muted-foreground"
                      }`}
                    >
                      <Check
                        className={`h-3 w-3 ${
                          req.check ? "opacity-100" : "opacity-30"
                        }`}
                      />
                      {t(`register.requirements.${req.key}`)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                {t("register.confirmPassword")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("register.confirmPasswordPlaceholder")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {confirmPassword &&
                password !== confirmPassword && (
                  <p className="text-xs text-destructive">
                    {t("register.passwordMismatch")}
                  </p>
                )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded border-input"
                required
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                {t("register.terms")}{" "}
                <Link href="#" className="text-primary hover:underline">
                  {t("register.termsLink")}
                </Link>{" "}
                {t("register.and")}{" "}
                <Link href="#" className="text-primary hover:underline">
                  {t("register.privacyLink")}
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
              {isPending ? t("register.loading") : t("register.submit")}
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("register.hasAccount")}{" "}
            <Link
              href={`/${locale}/login`}
              className="text-primary font-medium hover:underline"
            >
              {t("register.loginLink")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
