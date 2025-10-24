"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { registerUser } from "@/services/auth.service";

const RegisterSchema = z.object({
    name: z.string().min(3, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    phone: z.string().min(10, { message: "Phone number is too short" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    role: z.string().default("user"),
});

type RegisterFormType = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: { role: "user" },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            setSuccessMessage("Registration successful!");
        },
        onError: (err) => {
            const errorMessage = err?.message || "Registration failed. Try again.";
            setErrorMessage(errorMessage);
        },
    });

    const onSubmit = (values: RegisterFormType) => {
        setSuccessMessage("")
        setErrorMessage("")
        mutate(values);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            {...formRegister("name")}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Masud Rana"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            {...formRegister("email")}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="hello@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            {...formRegister("phone")}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="+880123456789"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...formRegister("password")}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* hidden role */}
                    <input type="hidden" {...formRegister("role")} />

                    <button
                        type="submit"
                        disabled={isPending}
                        className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {isPending ? "Registering..." : "Register"}
                    </button>
                </form>

                {successMessage && (
                    <p className="text-center text-sm mt-4 text-green-600">{successMessage}</p>
                )}
                {errorMessage && (
                    <p className="text-center text-sm mt-4 text-red-600">{errorMessage}</p>
                )}
            </div>
        </div>
    );
}
