"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-90")}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <Card className="bg-slate-900 text-slate-50 border border-slate-700">
          <CardHeader className="text-center ">
            <CardTitle className="text-xl">Login to your account</CardTitle>
            <CardDescription>
              Enter your email and password below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>
                {error && (
                  <Field>
                    <p className="text-sm text-red-500">{error}</p>
                  </Field>
                )}
                <Field>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-card-foreground hover:border-white cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                  <FieldDescription className="text-center cursor-pointer">
                    Don&apos;t have an account?{"   "}
                    <Link
                      href="/auth/register"
                      className="text-secondary/20 hover:text-secondary"
                    >
                      <span className="text-white/80 hover:text-secondary hover:underline hover:text-white/100 transition-colors">
                        Sign Up
                      </span>
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 py-5 text-center">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy.
        </FieldDescription>
      </motion.div>
    </div>
  );
}
