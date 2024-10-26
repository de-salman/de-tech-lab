"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

// Email validation function
export function isValidEmail(email: string): boolean {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Types for the input state and error state
interface InputState {
  name: string;
  email: string;
  contact: string;
  message: string;
}

interface ErrorState {
  email: boolean;
  required: boolean;
}

function Contact() {
  const [input, setInput] = useState<InputState>({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [error, setError] = useState<ErrorState>({
    email: false,
    required: false,
  });

  // Check required fields
  const checkRequired = () => {
    const allFieldsFilled =
      input.email && input.message && input.name && input.contact;
    setError((prevError) => ({ ...prevError, required: !allFieldsFilled }));
  };

  // Handle sending mail
  const handleSendMail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.email || !input.message || !input.name || !input.contact) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    try {
      const formData = new FormData();
      formData.append("Name", input.name);
      formData.append("Email", input.email);
      formData.append("Phone", input.contact);
      formData.append("Message", input.message);

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw8LJHW60QO0coHAwo5PiIfzSUxUlR_D8d_pQVZfREMoBrHx1ENnAR8rmnUn9oBumMs2w/exec",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setInput({ name: "", email: "", message: "", contact: "" });
      }
    } catch (error) {
      toast.error((error as Error)?.message || "An error occurred");
    }
  };

  return (
    <div>
      <p className="mb-5 text-xl font-medium uppercase text-[#16f2b3]">
        Contact with me
      </p>
      <div className="max-w-3xl rounded-lg border border-[#464c6a] p-3 text-white lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          If you have any questions or concerns, please don't hesitate to
          contact us.
        </p>
        <form onSubmit={handleSendMail} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base">Your Name: </label>
            <input
              className="w-full rounded-md border border-[#353a52] bg-[#10172d] px-3 py-2 outline-0 ring-0 transition-all duration-300 focus:border-[#16f2b3]"
              type="text"
              maxLength={100}
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput({ ...input, name: e.target.value })
              }
              onBlur={checkRequired}
              value={input.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Email: </label>
            <input
              className="w-full rounded-md border border-[#353a52] bg-[#10172d] px-3 py-2 outline-0 ring-0 transition-all duration-300 focus:border-[#16f2b3]"
              type="email"
              maxLength={100}
              required
              value={input.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput({ ...input, email: e.target.value })
              }
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(input.email) });
              }}
            />
            {error.email && (
              <p className="text-sm text-red-400">
                Please provide a valid email!
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Contact: </label>
            <input
              className="w-full rounded-md border border-[#353a52] bg-[#10172d] px-3 py-2 outline-0 ring-0 transition-all duration-300 focus:border-[#16f2b3]"
              maxLength={100}
              required
              value={input.contact}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput({ ...input, contact: e.target.value })
              }
              onBlur={checkRequired}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Message: </label>
            <textarea
              className="w-full rounded-md border border-[#353a52] bg-[#10172d] px-3 py-2 outline-0 ring-0 transition-all duration-300 focus:border-[#16f2b3]"
              maxLength={500}
              name="message"
              required
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setInput({ ...input, message: e.target.value })
              }
              onBlur={checkRequired}
              value={input.message}
            />
          </div>
          {error.required && (
            <p className="text-sm text-red-400">Please fill in all fields!</p>
          )}
          <button
            type="submit"
            className="mt-4 flex items-center gap-2 rounded-md bg-[#16f2b3] p-2 transition-all duration-300 hover:bg-[#14e7a5]"
          >
            <TbMailForward />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
