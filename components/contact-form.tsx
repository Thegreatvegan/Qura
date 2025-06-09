"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitContactForm } from "@/lib/actions"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type FormState = {
  name: string
  email: string
  company: string
  message: string
}

type FormError = {
  field: string | number
  message: string
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formResponse, setFormResponse] = useState<{
    success?: boolean
    message?: string
  } | null>(null)
  const [formErrors, setFormErrors] = useState<FormError[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })

    // Clear error for this field when user starts typing
    if (formErrors.some((error) => error.field === e.target.name)) {
      setFormErrors(formErrors.filter((error) => error.field !== e.target.name))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormResponse(null)
    setFormErrors([])

    try {
      const response = await submitContactForm(formState)

      if (response.success) {
        setFormResponse({
          success: true,
          message: response.message,
        })

        // Reset form on success
        setFormState({
          name: "",
          email: "",
          company: "",
          message: "",
        })
      } else {
        setFormResponse({
          success: false,
          message: response.message,
        })

        // Set field-specific errors if available
        if (response.errors) {
          setFormErrors(response.errors)
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormResponse({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper function to get error message for a specific field
  const getFieldError = (fieldName: string) => {
    const error = formErrors.find((err) => err.field === fieldName)
    return error ? error.message : null
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Request Early Access</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join the pioneers in quantum-enhanced drug discovery. Get early access to Qura's comprehensive platform
            that's transforming the pharmaceutical research landscape.
          </p>
        </motion.div>

        <motion.div
          className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {formResponse && (
            <Alert
              className={`mb-6 ${formResponse.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
            >
              {formResponse.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertTitle className={formResponse.success ? "text-green-800" : "text-red-800"}>
                {formResponse.success ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription className={formResponse.success ? "text-green-700" : "text-red-700"}>
                {formResponse.message}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div>
                <Label htmlFor="name" className="flex items-center justify-between">
                  <span>Full Name</span>
                  {getFieldError("name") && <span className="text-xs text-red-500">{getFieldError("name")}</span>}
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Dr. Jane Smith"
                  required
                  className={`mt-1 ${getFieldError("name") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}`}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center justify-between">
                  <span>Email Address</span>
                  {getFieldError("email") && <span className="text-xs text-red-500">{getFieldError("email")}</span>}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="jane.smith@research.org"
                  required
                  className={`mt-1 ${getFieldError("email") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}`}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="company" className="flex items-center justify-between">
                  <span>Organization</span>
                  {getFieldError("company") && <span className="text-xs text-red-500">{getFieldError("company")}</span>}
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  placeholder="Research Institute"
                  required
                  className={`mt-1 ${getFieldError("company") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}`}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="message" className="flex items-center justify-between">
                  <span>How would you use our platform?</span>
                  {getFieldError("message") && <span className="text-xs text-red-500">{getFieldError("message")}</span>}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell us about your research and how our platform could help..."
                  rows={4}
                  className={`mt-1 ${getFieldError("message") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}`}
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

