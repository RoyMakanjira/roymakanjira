"use client"

import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Target, TrendingUp, Clock, Calendar, Mail, Coffee, Gamepad2, Briefcase, LinkIcon, RocketIcon } from "lucide-react"
import {
  LightbulbIcon,
  BarChart3,
  PenTool,
  ClipboardList,
  MessageSquare,
  MailIcon,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react"

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export default function Component() {
  const [honeypot, setHoneypot] = useState("") // Honeypot for spam protection
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    // Skip if honeypot is filled (spam protection)
    if (honeypot) {
      toast.success("Message sent successfully!")
      reset()
      return
    }

    const toastId = toast.loading("Sending your message...")

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, honeypot }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      toast.success("Message sent successfully!", {
        id: toastId,
        description: "Thank you for reaching out. I'll get back to you soon.",
        duration: 5000,
      })
      reset()
    } catch (error) {
      toast.error("Failed to send message", {
        id: toastId,
        description: error instanceof Error ? error.message : "Please try again later",
        duration: 5000,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-gray-900">Hola!</div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Projects
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Blog
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Feeds
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-8 py-20">
        <div className="text-center space-y-12">
          {/* Title with rocket emoji */}
          <div className="flex items-center justify-center gap-3 text-lg text-gray-700">
            <span>Marketing Specialist at</span>
            <Rocket className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-gray-900">Uncommon</span>
          </div>

          {/* Main heading with avatar */}
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-6 text-6xl lg:text-7xl font-bold text-gray-900">
              <span>Hey, I'm</span>
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
                <Image
                  src="/roy.png?height=96&width=96"
                  alt="Roy Makanjira"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>Roy</span>
            </div>

            <div className="flex items-center justify-center gap-6 text-5xl lg:text-6xl font-bold text-gray-900 flex-wrap">
              <span>And I Create</span>
              <div className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-lg">
                <Target className="w-10 h-10" />
                <span>Campaigns</span>
              </div>
              <span>and</span>
              <div className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-lg">
                <TrendingUp className="w-10 h-10" />
                <span>Strategies</span>
              </div>
            </div>
          </div>

          {/* Availability indicators */}
          <div className="flex items-center justify-center gap-8 pt-12">
            <div className="flex items-center gap-3 text-gray-700">
              <span className="font-semibold text-lg">Full Time</span>
              <Clock className="w-6 h-6 text-gray-500" />
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <span className="font-semibold text-lg">Part-Time</span>
              <Calendar className="w-6 h-6 text-gray-500" />
            </div>
            <Mail className="w-6 h-6 text-gray-500" />
            <Coffee className="w-6 h-6 text-gray-500" />
            <Gamepad2 className="w-6 h-6 text-gray-500" />
          </div>
        </div>

        {/* Portfolio Section */}
        <section className="mt-32">
          <div className="flex items-center gap-4 mb-16">
            <div className="bg-gray-900 p-4 rounded-2xl shadow-lg">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Meet some of my Works</h2>
          </div>

          {/* Project Categories */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center lg:justify-start">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 text-sm font-medium border-0">
              Campaign Strategy
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 text-sm font-medium border-0">
              Brand Development
            </Badge>
            <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 text-sm font-medium border-0">
              2025
            </Badge>
            <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200 px-4 py-2 text-sm font-medium border-0">
              Digital Marketing
            </Badge>
            <Badge className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 text-sm font-medium border-0">
              2024
            </Badge>
          </div>

          {/* Project Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="group h-96 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="relative h-56 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10" />
                <a href="https://www.figma.com/proto/D0GfI2Kf3RkWnBsRgt7AcI/Royalty-foods-application?page-id=0%3A1&node-id=57-148&starting-point-node-id=57%3A148&t=SdmB5xxBXHkNPd7G-1" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/food-deli.png"
                    alt="Food Delivery App"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/90 rounded-full backdrop-blur-sm border border-white">
                    <RocketIcon className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Food Delivery Experience</h3>
                <p className="text-gray-600 mb-4">
                  Discover restaurants, customize orders, and track deliveries in real-time.
                </p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <a 
                      href="https://www.figma.com/proto/D0GfI2Kf3RkWnBsRgt7AcI/Royalty-foods-application?page-id=0%3A1&node-id=57-148&starting-point-node-id=57%3A148&t=SdmB5xxBXHkNPd7G-1" 
                      target="_blank" 
                      className="text-sm text-blue-600 hover:underline truncate"
                    >
                      Live Demo
                    </a>
                  </div>
                  <button 
                    onClick={() => window.open('https://www.figma.com/proto/D0GfI2Kf3RkWnBsRgt7AcI/Royalty-foods-application?page-id=0%3A1&node-id=57-148&starting-point-node-id=57%3A148&t=SdmB5xxBXHkNPd7G-1', '_blank')}
                    className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    Live Demo →
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="group h-96 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="relative h-56 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10" />
                <a href="https://www.canva.com/design/DAGsLxhf-yY/ICqxHiXIpnh8NKvQ7XZ0Sw/edit" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/schweppes.png"
                    alt="Schweppes"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/90 rounded-full backdrop-blur-sm border border-white">
                    <RocketIcon className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Schweppes</h3>
                <p className="text-gray-600 mb-4">
                  What made Schweppes Content Marketing strategy successful?
                </p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <a 
                      href="https://www.canva.com/design/DAGsLxhf-yY/ICqxHiXIpnh8NKvQ7XZ0Sw/edit?utm_content=DAGsLxhf-yY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" 
                      target="_blank" 
                      className="text-sm text-blue-600 hover:underline truncate"
                    >
                      Full Report
                    </a>
                  </div>
                  <button 
                    onClick={() => window.open('https://www.canva.com/design/DAGsLxhf-yY/ICqxHiXIpnh8NKvQ7XZ0Sw/edit?utm_content=DAGsLxhf-yY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', '_blank')}
                    className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    Full Report →
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="group h-96 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="relative h-56 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10" />
                <a href="https://www.canva.com/design/DAGq4J1Gx30/o7zARVvh_kJO8HMEvztLWA/edit?utm_content=DAGq4J1Gx30&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/zimgold.png"
                    alt="ZimGold"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/90 rounded-full backdrop-blur-sm border border-white">
                    <RocketIcon className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">ZimGold</h3>
                <p className="text-gray-600 mb-4">
                  ZimGold Campaign Strategy
                </p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <a 
                      href="https://www.canva.com/design/DAGq4J1Gx30/o7zARVvh_kJO8HMEvztLWA/edit?utm_content=DAGq4J1Gx30&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" 
                      target="_blank" 
                      className="text-sm text-blue-600 hover:underline truncate"
                    >
                      View Link
                    </a>
                  </div>
                  <button 
                    onClick={() => window.open('https://www.canva.com/design/DAGq4J1Gx30/o7zARVvh_kJO8HMEvztLWA/edit?utm_content=DAGq4J1Gx30&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', '_blank')}
                    className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    View Link →
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mt-32">
          <div className="flex items-center gap-4 mb-16">
            <div className="bg-gray-900 p-4 rounded-2xl shadow-lg">
              <LightbulbIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">My Expertise</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="bg-orange-100 text-orange-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Growth Marketing</h3>
                <p className="text-gray-600">
                  Developing data-driven strategies to acquire and retain customers through various digital channels.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics & Insights</h3>
                <p className="text-gray-600">
                  Translating complex data into actionable insights to optimize marketing performance and ROI.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="bg-purple-100 text-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <PenTool className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Brand Strategy</h3>
                <p className="text-gray-600">
                  Creating compelling brand narratives and positioning strategies that resonate with target audiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mt-32">
          <div className="flex items-center gap-4 mb-16">
            <div className="bg-gray-900 p-4 rounded-2xl shadow-lg">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Work Experience</h2>
          </div>

          <div className="space-y-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Marketing Student</h3>
                    <p className="text-gray-600">Uncommon, Mufakose</p>
                  </div>
                  <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 text-sm font-medium border-0 w-fit">
                    2025 - Present
                  </Badge>
                </div>
                <p className="text-gray-600">
                  Lead strategic marketing initiatives for high-profile tech clients, resulting in an average 40%
                  increase in customer acquisition and 25% improvement in retention rates. Manage a team of 5 marketing
                  specialists and oversee campaign budgets exceeding $2M annually.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-32">
          <div className="flex items-center gap-4 mb-16">
            <div className="bg-gray-900 p-4 rounded-2xl shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Client Testimonials</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                    JD
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Jane Shumba</h3>
                    <p className="text-gray-600">CEO, TechStart</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Roy's strategic approach to our product launch campaign exceeded all expectations. The creative
                  direction and execution were flawless, resulting in our most successful launch to date."
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold">
                    MS
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Michael S</h3>
                    <p className="text-gray-600">Marketing Director, InnovateCorp</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Working with Roy transformed our marketing approach. Their data-driven strategies and creative
                  campaigns helped us reach new audience segments and significantly improved our conversion rates."
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-32">
          <div className="flex items-center gap-4 mb-16">
            <div className="bg-gray-900 p-4 rounded-2xl shadow-lg">
              <MailIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Get In Touch</h2>
          </div>

          <Card className="border-0 shadow-xl bg-white overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6" />
                    <p>roymakanjira@gmail.com</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6" />
                    <p>+263 777 587 533</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6" />
                    <p>Harare, ZW</p>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="text-lg font-semibold mb-4">Connect with me</h4>
                  <div className="flex gap-4">
                    <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send me a message</h3>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    autoComplete="off"
                  />

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Your name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="your@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Your message"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-32 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Roy Makanjira</h3>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Growth Marketing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex gap-4 mb-6">
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <p className="text-gray-400">roymakanjira@gmail.com</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 Roy Makanjira. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}