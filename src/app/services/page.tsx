"use client";

import { useState, useEffect } from "react";
import { LuFilter, LuClock, LuSearchCode, LuStar } from "react-icons/lu";
import Header from "@/components/home/Header";
import Link from "next/link";
import { LucideCheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_URL}/api/services`);
        if (res.ok) {
          const json = await res.json();
          setServicesData(json.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const categories = [
    "all",
    "government",
    "business",
    "healthcare",
    "education",
    "finance",
    "legal",
    "technical",
  ];

  const filteredServices =
    selectedCategory === "all"
      ? servicesData
      : servicesData.filter((s) => s.category === selectedCategory);

  return (
    <>
      <Header />

      <div className="relative overflow-hidden bg-linear-to-br from-[#001830] via-[#002045] to-[#0a1628] px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute top-1/2 left-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            Available Services
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-300">
            Browse and order from our comprehensive service offerings. Premium
            solutions tailored for your needs.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div>
                <h3 className="flex items-center gap-2 text-xl font-bold text-[#002045]">
                  <LuFilter className="h-5 w-5 text-blue-600" />
                  Categories
                </h3>
                <div className="mt-6 flex scrollbar-none flex-row gap-2 overflow-x-auto pb-3 lg:flex-col lg:overflow-x-visible lg:pb-0">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`shrink-0 rounded-xl px-5 py-3 text-center font-medium capitalize transition-all duration-200 lg:w-full lg:text-left ${
                        selectedCategory === category
                          ? "bg-[#002045] text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category === "all" ? "All Services" : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Services Grid */}
          <div className="lg:col-span-3">
            <div className="grid gap-8 md:grid-cols-2">
              {isLoading
                ? // Loading Skeleton
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse rounded-2xl border border-gray-100 bg-white p-8"
                    >
                      <div className="mb-4 h-6 w-24 rounded-full bg-gray-200"></div>
                      <div className="mb-4 h-8 w-3/4 rounded bg-gray-200"></div>
                      <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
                      <div className="mb-6 h-4 w-5/6 rounded bg-gray-200"></div>
                      <div className="mb-8 space-y-3">
                        <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                      </div>
                      <div className="mt-auto h-12 w-full rounded-xl bg-gray-200"></div>
                    </div>
                  ))
                : filteredServices.map((service) => (
                    <div
                      key={service.serviceId}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                      <div className="flex h-full flex-col p-8">
                        <div className="flex-1">
                          <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase">
                            {service.category}
                          </p>
                          <h3 className="mb-4 text-2xl font-bold text-[#002045]">
                            {service.title}
                          </h3>
                          <p className="line-clamp-3 leading-relaxed text-gray-600">
                            {service.description}
                          </p>

                          <div className="mt-6 space-y-3">
                            {service.features
                              .slice(0, 3)
                              .map((feature: string, i: number) => (
                                <div
                                  key={i}
                                  className="flex items-center space-x-3 text-sm font-medium text-gray-700"
                                >
                                  <LucideCheckCircle2 className="h-5 w-5 shrink-0 text-lg text-[#0a6c44]" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className="mt-8 border-t border-gray-100 pt-6">
                          <div className="mb-6 flex items-center justify-between">
                            <div>
                              <p className="text-3xl font-extrabold text-[#002045]">
                                ৳{service.price}
                              </p>
                              <p className="mt-1 flex items-center gap-1 text-sm font-medium text-gray-500">
                                <LuClock className="h-4 w-4 shrink-0 text-sm" />{" "}
                                {service.duration}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="flex items-center justify-end gap-1 text-xl font-bold text-amber-500">
                                {service.rating}{" "}
                                <LuStar className="ml-1 inline-block h-5 w-5 shrink-0 fill-current text-amber-500" />
                              </p>
                              <p className="mt-1 text-xs font-medium text-gray-500">
                                {service.reviews} reviews
                              </p>
                            </div>
                          </div>

                          <Link
                            href={`/services/${service.serviceId}`}
                            className="block w-full rounded-xl bg-blue-600 px-4 py-3.5 text-center font-bold text-white shadow-md transition-all group-hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {!isLoading && filteredServices.length === 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white p-16 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                  <LuSearchCode className="h-12 w-12 text-4xl text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  No Services Found
                </h3>
                <p className="text-gray-500">
                  There are currently no services available in this category.
                </p>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="mt-6 font-semibold text-blue-600 hover:underline"
                >
                  View all services
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
