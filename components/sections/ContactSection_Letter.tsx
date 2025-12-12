"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

export function ContactSection_Letter() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsError(false);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/movgyagg', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setIsSuccess(true);
                form.reset();
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative w-full py-32 bg-[#080808] overflow-hidden">

            <Container className="relative z-10 max-w-4xl">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-4"
                    >
                        <span className="font-mono text-[#8c7b64] text-xs uppercase tracking-[0.3em]">
                            Get in Touch
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-4xl sm:text-5xl text-[#e5e5e5]"
                    >
                        Start a Conversation
                    </motion.h2>
                    <p className="font-sans text-off-white/60 mt-4 max-w-2xl">
                        Ready to discuss your next project? Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                </div>

                {/* Form Container */}
                <div className="relative w-full p-8 md:p-16 bg-[#111] border border-[#222] shadow-2xl">

                    {/* Decorative Corner Marks */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#8c7b64]/30" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#8c7b64]/30" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#8c7b64]/30" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#8c7b64]/30" />

                    {isSuccess ? (
                        <div className="text-center py-12">
                            <div className="text-[#8c7b64] text-5xl mb-4">✓</div>
                            <h3 className="font-serif text-2xl text-off-white mb-2">Message Sent Successfully</h3>
                            <p className="font-sans text-off-white/60">We'll be in touch shortly.</p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="mt-8 font-mono text-sm text-[#8c7b64] hover:text-off-white transition-colors"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Name & Company */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-[#8c7b64] mb-3">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-transparent border-b border-[#333] pb-3 outline-none text-[#e5e5e5] placeholder:text-[#444] hover:border-[#8c7b64] focus:border-[#8c7b64] transition-colors font-sans"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className="block font-mono text-xs uppercase tracking-widest text-[#8c7b64] mb-3">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        className="w-full bg-transparent border-b border-[#333] pb-3 outline-none text-[#e5e5e5] placeholder:text-[#444] hover:border-[#8c7b64] focus:border-[#8c7b64] transition-colors font-sans"
                                        placeholder="Acme Corp"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-[#8c7b64] mb-3">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full bg-transparent border-b border-[#333] pb-3 outline-none text-[#e5e5e5] placeholder:text-[#444] hover:border-[#8c7b64] focus:border-[#8c7b64] transition-colors font-sans"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Industry */}
                            <div>
                                <label htmlFor="industry" className="block font-mono text-xs uppercase tracking-widest text-[#8c7b64] mb-3">
                                    Industry
                                </label>
                                <select
                                    id="industry"
                                    name="industry"
                                    className="w-full bg-[#111] border-b border-[#333] pb-3 outline-none text-[#e5e5e5] hover:border-[#8c7b64] focus:border-[#8c7b64] transition-colors font-sans"
                                >
                                    <option value="">Select your industry</option>
                                    <option value="fintech">FinTech / Financial Services</option>
                                    <option value="healthcare">Healthcare / MedTech</option>
                                    <option value="ecommerce">E-Commerce / Retail</option>
                                    <option value="saas">SaaS / Enterprise Software</option>
                                    <option value="logistics">Logistics / Supply Chain</option>
                                    <option value="education">Education / EdTech</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-[#8c7b64] mb-3">
                                    Project Details *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    className="w-full bg-transparent border border-[#333] p-4 outline-none text-[#e5e5e5] placeholder:text-[#444] hover:border-[#8c7b64] focus:border-[#8c7b64] transition-colors resize-none font-sans leading-relaxed"
                                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                                />
                            </div>

                            {/* Honeypot (spam protection) */}
                            <input type="text" name="_gotcha" style={{ display: 'none' }} />

                            {/* Error Message */}
                            {isError && (
                                <div className="text-red-400 text-sm font-mono">
                                    Something went wrong. Please try again or email us directly at contact@bytechlabs.com
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group relative px-12 py-4 bg-[#8c7b64] text-ink font-mono text-sm uppercase tracking-widest hover:bg-[#a39075] transition-colors disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                >
                                    <span className="relative z-10">
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </span>
                                    {!isSubmitting && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                </div>

            </Container>
        </section>
    );
}
