"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // try {
    //   const response = await fetch("/api/contact", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     alert("Message sent successfully!");
    //     setForm({ name: "", email: "", message: "" });
    //   } else {
    //     alert(data.error || "Something went wrong.");
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    //   alert("Failed to send message.");
    // }
  };

  return (
    <>
      <h2 className="text-3xl sm:text-5xl md:text-8xl  m-5 dark:text-white text-black font-bold animate-rise0_25s mt-20">
        C O N T A C T
      </h2>
      <div className="flex items-center justify-center text-black dark:text-white">
        <Card>
          <p className="text-gray-600 dark:text-white mb-6">
            {`phone: +995 555 12-34-56`}
          </p>
          <p className="text-gray-600 dark:text-white mb-6">
            {`email: contact@killers.ge`}
          </p>
          <p className="text-gray-600 dark:text-white mb-6">sendMessage</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="your_name"
              value={form.name}
              onChange={handleChange}
              name="name"
            />
            <Input
              type="email"
              placeholder="your_email"
              value={form.email}
              onChange={handleChange}
              name="email"
            />
            <Textarea
              placeholder="your_message"
              value={form.message}
              onChange={handleChange}
              name="message"
            />
            <button
              type="submit"
              className="hover:scale-105 active:scale-95 ease-in-out duration-150"
            >
              send message
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ContactPage;
