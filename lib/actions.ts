"use server"

import { z } from "zod"

// Define form schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(1, { message: "Organization is required" }),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

// Use a form service like Formspree
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID"

export async function submitContactForm(formData: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(formData)

    // Submit to form service
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(validatedData),
    })

    const result = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: "Thank you for your interest! We'll be in touch soon.",
      }
    } else {
      throw new Error(result.message || "Failed to submit form")
    }
  } catch (error) {
    // Error handling remains the same
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      }))

      return {
        success: false,
        message: "Please check your form inputs",
        errors: errorMessages,
      }
    }

    console.error("Form submission error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}

