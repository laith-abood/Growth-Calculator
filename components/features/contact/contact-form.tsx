import * as React from "react";
'use client';

import { useState } from "react";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { toast } from "@/components/shared/use-toast";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      // Add your form submission logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      });

      (event.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <textarea
          className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="message"
          name="message"
          placeholder="Message"
          required
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
