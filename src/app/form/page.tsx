"use client"
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

interface FormDataType {
  name: string
  email: string
  phone: string
  password: string
}

const Page = () => {
  const initialValues: FormDataType = {
    name: '',
    email: '',
    phone: '',
    password: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .required('Password is required'),
  })

  const handleSubmit = (data: FormDataType) => {
    console.log('data is:', data)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="w-full rounded-lg border border-gray-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-teal-500
                           focus:border-teal-500 transition"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-xs text-red-600 mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-teal-500
                           focus:border-teal-500 transition"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-xs text-red-600 mt-1"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <Field
                type="tel"
                name="phone"
                className="w-full rounded-lg border border-gray-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-teal-500
                           focus:border-teal-500 transition"
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="text-xs text-red-600 mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-teal-500
                           focus:border-teal-500 transition"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-xs text-red-600 mt-1"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700
                         text-white font-semibold py-2 rounded-lg
                         transition duration-200 shadow-md cursor-pointer"
            >
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Page
