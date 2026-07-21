export default function ProcessSection() {
  const steps = [
    {
      num: "১",
      title: "সেবা নির্বাচন করুন",
      desc: "আপনার প্রয়োজনীয় সেবাটি ডিরেক্টরি থেকে খুঁজে নিন।",
      color: "from-blue-500 to-indigo-600",
    },
    {
      num: "২",
      title: "তথ্য পূরণ করুন",
      desc: "সঠিক তথ্য দিয়ে অনলাইন আবেদন ফর্মটি সম্পন্ন করুন।",
      color: "from-emerald-500 to-teal-600",
    },
    {
      num: "৩",
      title: "ট্র্যাকিং ও প্রাপ্তি",
      desc: "আবেদনের আইডি ব্যবহার করে যেকোনো সময় স্ট্যাটাস চেক করুন।",
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section className="bg-linear-to-b from-gray-50 to-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold tracking-widest text-emerald-600 uppercase">
            সহজ পদ্ধতি
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#002045] md:text-4xl">
            কীভাবে সেবা নেবেন?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            মাত্র ৩টি সহজ ধাপে আপনার প্রয়োজনীয় সরকারি সেবা গ্রহণ করুন।
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.num} className="group relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+40px)] hidden h-0.5 w-[calc(100%-40px)] bg-gray-200 sm:block" />
              )}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div
                  className={`h-16 w-16 rounded-2xl bg-linear-to-br ${step.color} mx-auto mb-5 flex items-center justify-center text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  {step.num}
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#002045]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
