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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 w-90 ", className)} {...props}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <Card className="bg-slate-900 text-slate-50 border border-slate-700">
          <CardHeader className="text-center ">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="username"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </Field>
                <Field>
                  <Field className="grid grid-cols-2 gap-4 ">
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="password"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirm-password">
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="password again "
                        required
                      />
                    </Field>
                  </Field>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <Button
                    type="submit"
                    className="bg-card-foreground hover:border-secondary/20"
                  >
                    Create Account
                  </Button>
                  <FieldDescription className="text-center ">
                    Already have an account?{"   "}
                    <Link href="/auth/login">
                      <span className="text-secondary/80 hover:text-secondary hover:underline">
                        Sign In{" "}
                      </span>
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center py-4">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy
        </FieldDescription>
      </motion.div>
    </div>
  );
}
