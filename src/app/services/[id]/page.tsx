"use client";

import { use, useState, useEffect } from "react";
import { LuClock, LuArrowRight, LuInfo, LuStar } from "react-icons/lu";
import Header from "@/components/home/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { LucideCheckCircle2 } from "lucide-react";

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { data: session } = useSession();
  const [isOrdering, setIsOrdering] = useState(false);
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(
          `${API_URL}/api/services/${unwrappedParams.id}`,
        );
        if (res.ok) {
          const json = await res.json();
          setService(json.service);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [unwrappedParams.id]);

  const handleOrderClick = async () => {
    if (!session?.user) {
      toast.error("Please login first to place an order.");
      router.push("/auth/login");
      return;
    }

    try {
      setIsOrdering(true);
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: session.user.name,
          customerEmail: session.user.email,
          serviceName: service?.title,
          amount: service?.price,
        }),
      });

      if (res.ok) {
        toast.success("Order placed successfully! Redirecting...");
        setTimeout(() => {
          window.location.href = "/dashboard/services";
        }, 1000);
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsOrdering(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-4 font-medium text-gray-600">
              Loading service details...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!service) {
    return (
      <>
        <Header />
        <div className="flex min-h-screen items-center justify-center bg-red-50 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Service Not Found
            </h1>
            <p className="mt-4 text-gray-600">
              The service you are looking for does not exist.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Back to Services
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Hero Section */}
        <div className="relative flex h-72 items-center justify-center overflow-hidden bg-linear-to-br from-[#002045] to-[#0a1628]">
          <div className="absolute inset-0 rounded-full bg-blue-500/10 mix-blend-overlay blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto -mt-32 max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                <div className="mb-6">
                  <span className="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase">
                    {service.category}
                  </span>
                  <h1 className="text-3xl leading-tight font-extrabold text-gray-900 md:text-4xl">
                    {service.title}
                  </h1>
                </div>

                {/* Rating */}
                <div className="mb-8 flex items-center gap-8 border-b border-gray-100 pb-8">
                  <div>
                    <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                      Rating
                    </p>
                    {service.rating}{" "}
                    <LuStar className="ml-1 inline-block h-5 w-5 shrink-0 fill-current text-amber-500" />
                  </div>
                  <div className="h-12 w-px bg-gray-100"></div>
                  <div>
                    <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                      Reviews
                    </p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      {service.reviews}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-10">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    About This Service
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <div className="mb-10">
                    <h2 className="mb-5 text-2xl font-bold text-gray-900">
                      What&apos;s Included
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {service.features.map((feature: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 rounded-xl bg-gray-50 p-4"
                        >
                          <LucideCheckCircle2 className="h-5 w-5 shrink-0 text-[#0a6c44]" />
                          <p className="font-medium text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Provider Info */}
                {service.providerId && (
                  <div className="flex flex-col items-start gap-5 rounded-xl border border-blue-100 bg-blue-50/50 p-6 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-md">
                      {service.providerId.name.charAt(0)}
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-semibold tracking-wide text-blue-600 uppercase">
                        Service Provider
                      </p>
                      <h3 className="text-xl font-bold text-gray-900">
                        {service.providerId.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-gray-600">
                        <span className="flex items-center gap-1 font-bold text-amber-500">
                          {service.providerId.rating}{" "}
                          <LuStar className="h-4 w-4 shrink-0 fill-current text-amber-500" />
                        </span>{" "}
                        ({service.providerId.reviews} reviews)
                      </p>
                      {service.providerId.bio && (
                        <p className="mt-2 text-sm text-gray-600">
                          {service.providerId.bio}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                  <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    Service Price
                  </p>
                  <p className="mt-2 text-5xl font-extrabold text-[#002045]">
                    ৳{service.price}
                  </p>
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm font-medium text-gray-600">
                    <LuClock className="h-5 w-5 shrink-0 text-gray-400" />
                    Delivery: {service.duration}
                  </div>

                  <button
                    onClick={handleOrderClick}
                    disabled={isOrdering}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#002045] py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-[#001530] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isOrdering ? (
                      <>Processing...</>
                    ) : (
                      <>
                        Proceed to Order{" "}
                        <LuArrowRight className="ml-1 inline-block h-5 w-5 shrink-0 text-lg" />
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-center text-xs font-medium text-gray-500">
                    You must be logged in to place an order
                  </p>
                </div>

                {/* How It Works */}
                <div className="rounded-2xl border border-blue-100 bg-linear-to-br from-indigo-50 to-blue-50 p-8">
                  <h3 className="mb-6 flex items-center gap-2 font-bold text-gray-900">
                    <LuInfo className="h-5 w-5 shrink-0 text-blue-600" />
                    How It Works
                  </h3>
                  <ol className="space-y-4 text-sm font-medium text-gray-700">
                    <li className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                        1
                      </span>
                      Place an order securely
                    </li>
                    <li className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                        2
                      </span>
                      Make payment via portal
                    </li>
                    <li className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                        3
                      </span>
                      Provider starts processing
                    </li>
                    <li className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
                        4
                      </span>
                      Receive deliverables
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
