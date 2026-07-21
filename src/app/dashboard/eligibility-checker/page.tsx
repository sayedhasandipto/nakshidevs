"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button, Input } from "@heroui/react";
import { ChatMessage, EligibilityResult } from "@/lib/types/eligibility";
import { toast } from "react-hot-toast";

export default function EligibilityCheckerPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "হ্যালো! আমি আপনার NakshiDevs স্মার্ট যোগ্যতা ও নির্দেশিকা সহকারী। 🇧🇩\n\nআমি কৃত্রিম বুদ্ধিমত্তা (AI) এর মাধ্যমে আপনাকে বাংলাদেশের বিভিন্ন সরকারি সেবা যেমন **ই-পাসপোর্ট (E-Passport)**, **ই-টিন সার্টিফিকেট (e-TIN)**, এবং **ট্রেড লাইসেন্স (Trade License)** এর জন্য আবেদন করার যোগ্যতা তাৎক্ষণিকভাবে যাচাই করতে সাহায্য করতে পারি।\n\nআজ আপনাকে কোন সেবার যোগ্যতা যাচাইয়ে সাহায্য করতে পারি?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [checkedDocuments, setCheckedDocuments] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedText]);

  const simulateTyping = (fullText: string, messageId: string, callback: () => void) => {
    setTypingMessageId(messageId);
    let index = 0;
    setDisplayedText("");
    
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setTypingMessageId(null);
        callback();
      }
    }, 10);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const apiMessages = [...messages, userMessage].map((msg) => ({
        role: msg.role === "user" ? ("user" as const) : ("model" as const),
        content: msg.content,
      }));

      const res = await fetch("/api/ai/eligibility-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "সাড়া পেতে ব্যর্থ হয়েছে।");
      }

      const data = await res.json();
      const modelMsgId = `model-${Date.now()}`;

      simulateTyping(data.content, modelMsgId, () => {
        setMessages((prev) => [
          ...prev,
          {
            id: modelMsgId,
            role: "model",
            content: data.content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            eligibilityResult: data.eligibilityResult,
          },
        ]);
        setDisplayedText("");
      });

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "একটি ত্রুটি ঘটেছে।");
      
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "model",
          content: "দুঃখিত, এআই মডেলের সাথে সংযোগ করতে সমস্যা হয়েছে। দয়া করে আপনার সার্ভার রানিং আছে কি না এবং `GEMINI_API_KEY` ঠিক আছে কি না তা পরীক্ষা করুন।",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentCheck = (docName: string) => {
    setCheckedDocuments((prev) => ({
      ...prev,
      [docName]: !prev[docName],
    }));
  };

  const getStatusBadgeText = (status: EligibilityResult["status"]) => {
    switch (status) {
      case "Eligible":
        return "যোগ্য";
      case "Partially Eligible":
        return "আংশিক যোগ্য";
      case "Not Eligible":
        return "যোগ্য নন";
    }
  };

  const getStatusStyle = (status: EligibilityResult["status"]) => {
    switch (status) {
      case "Eligible":
        return {
          badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
          cardBorder: "border-emerald-500/30",
          headerBg: "bg-gradient-to-r from-emerald-500/10 to-teal-500/5",
          dot: "bg-emerald-500"
        };
      case "Partially Eligible":
        return {
          badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
          cardBorder: "border-amber-500/30",
          headerBg: "bg-gradient-to-r from-amber-500/10 to-orange-500/5",
          dot: "bg-amber-500"
        };
      case "Not Eligible":
        return {
          badge: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
          cardBorder: "border-rose-500/30",
          headerBg: "bg-gradient-to-r from-rose-500/10 to-red-500/5",
          dot: "bg-rose-500"
        };
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-2 py-4">
      {/* Visual App Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#001731] via-[#00254d] to-[#003870] p-6 shadow-xl text-white">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 h-28 w-28 rounded-full bg-[#38bdf8]/10 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-[#38bdf8] text-white shadow-lg shadow-blue-500/30">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">NakshiDevs স্মার্ট এজেন্ট</h1>
              <p className="text-sm font-medium text-blue-200/90 mt-1">তাৎক্ষণিক যোগ্যতা যাচাই এবং সরকারি সেবা নির্দেশিকা পোর্টাল</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-semibold text-emerald-300">জেমিনি ৩.৫ সক্রিয়</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Side: Rules Overview & Presets */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Eligibility Criteria Panel */}
          <div className="rounded-3xl border border-gray-100 bg-white/70 p-6 shadow-sm backdrop-blur-lg">
            <h3 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">gavel</span>
              প্রধান যোগ্যতার মানদণ্ড
            </h3>
            
            <div className="space-y-4">
              {/* Card E-Passport */}
              <div className="group rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-blue-200 hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">ই-পাসপোর্ট (E-Passport)</span>
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">নাগরিক</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  বাংলাদেশী নাগরিকত্ব থাকতে হবে। প্রাপ্তবয়স্ক আবেদনকারীদের বয়স ১৮ বা তার বেশি হতে হবে। নাবালকদের ক্ষেত্রে পিতা-মাতার এনআইডি দিয়ে আবেদনযোগ্য।
                </p>
              </div>

              {/* Card TIN */}
              <div className="group rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-emerald-200 hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">ই-টিন সার্টিফিকেট</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">তাৎক্ষণিক</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  আবেদনকারীর বয়স কমপক্ষে ১৮ বছর হতে হবে। জাতীয় পরিচয়পত্রের (NID) ডাটা ব্যবহার করে অনলাইনে তাৎক্ষণিক নিবন্ধন সম্পন্ন হয়।
                </p>
              </div>

              {/* Card Trade License */}
              <div className="group rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-amber-200 hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">ট্রেড লাইসেন্স</span>
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">ব্যবসা</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  বয়স ১৮+ হতে হবে। সিটি কর্পোরেশন বা সংশ্লিষ্ট এলাকার মধ্যে ব্যবসার জন্য বৈধ হোল্ডিং ট্যাক্স বা ভাড়ার চুক্তি থাকতে হবে।
                </p>
              </div>
            </div>
          </div>

          {/* Quick Start Buttons Panel */}
          <div className="rounded-3xl border border-gray-100 bg-white/70 p-6 shadow-sm backdrop-blur-lg">
            <h4 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">bolt</span>
              দ্রুত যোগ্যতা যাচাই
            </h4>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => handleSendMessage("আমি ই-পাসপোর্টের যোগ্যতা চেক করতে চাই। বয়স: ২৫ বছর, বাস করি বাংলাদেশে।")}
                className="w-full flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-xs font-bold text-gray-700 shadow-sm transition-all hover:border-blue-500 hover:bg-blue-50/20 active:scale-95"
              >
                <span>🌍 ই-পাসপোর্ট নাগরিক যোগ্যতা যাচাই</span>
                <span className="material-symbols-outlined text-sm text-gray-400">chevron_right</span>
              </button>
              <button
                onClick={() => handleSendMessage("আমার বয়স ১৭ বছর, আমি কি ট্রেড লাইসেন্স পেতে পারি? আমি ঢাকায় দোকান খুলতে চাই।")}
                className="w-full flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-xs font-bold text-gray-700 shadow-sm transition-all hover:border-blue-500 hover:bg-blue-50/20 active:scale-95"
              >
                <span>💼 অপ্রাপ্তবয়স্ক ট্রেড লাইসেন্স যাচাই</span>
                <span className="material-symbols-outlined text-sm text-gray-400">chevron_right</span>
              </button>
              <button
                onClick={() => handleSendMessage("প্রবাসী বাংলাদেশিরা কি ই-টিন সার্টিফিকেট করতে পারবেন? বয়স ৩২ বছর।")}
                className="w-full flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-xs font-bold text-gray-700 shadow-sm transition-all hover:border-blue-500 hover:bg-blue-50/20 active:scale-95"
              >
                <span>📄 প্রবাসী/বিদেশী ই-টিন যোগ্যতা যাচাই</span>
                <span className="material-symbols-outlined text-sm text-gray-400">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Chat and Assessment Results */}
        <div className="lg:col-span-8 flex h-[620px] flex-col rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-[#38bdf8] text-white shadow-md">
                <span className="material-symbols-outlined text-lg">forum</span>
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"></span>
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-sm">যোগ্যতা পরামর্শ এজেন্ট</h3>
                <p className="text-[10px] font-bold text-gray-400">রিয়েল-টাইম রেসপন্স সক্রিয়</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 space-y-6 overflow-y-auto bg-gray-50/20 p-6">
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`flex gap-3.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm">
                      <span className="material-symbols-outlined text-base">smart_toy</span>
                    </div>
                  )}

                  <div className="max-w-[85%] flex flex-col gap-3">
                    {/* Message Bubble */}
                    <div
                      className={`rounded-3xl px-5 py-3.5 shadow-sm text-sm leading-relaxed transition-all duration-200 ${
                        isUser
                          ? "bg-gradient-to-tr from-[#001731] to-[#002f5c] text-white rounded-tr-none"
                          : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                      <span className={`mt-2 block text-[9px] text-right font-medium ${isUser ? "text-blue-200/80" : "text-gray-400"}`}>
                        {message.timestamp}
                      </span>
                    </div>

                    {/* Verdict Card */}
                    {!isUser && message.eligibilityResult && (
                      (() => {
                        const style = getStatusStyle(message.eligibilityResult.status);
                        return (
                          <div className={`mt-1 overflow-hidden rounded-3xl border bg-white shadow-md transition-all duration-300 hover:shadow-lg ${style.cardBorder}`}>
                            {/* Card Banner */}
                            <div className={`flex items-center justify-between px-5 py-3.5 ${style.headerBg}`}>
                              <span className="text-xs font-black uppercase tracking-wider text-gray-700">অফিসিয়াল সিদ্ধান্ত</span>
                              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black shadow-sm ${style.badge}`}>
                                <span className={`h-2 w-2 rounded-full ${style.dot} animate-pulse`}></span>
                                {getStatusBadgeText(message.eligibilityResult.status)}
                              </span>
                            </div>

                            {/* Details body */}
                            <div className="p-5 space-y-5">
                              <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">সিদ্ধান্তের কারণ ও ব্যাখ্যা</h4>
                                <p className="text-sm font-semibold text-gray-800 mt-1.5 leading-relaxed">
                                  {message.eligibilityResult.reason}
                                </p>
                              </div>

                              {message.eligibilityResult.documents.length > 0 && (
                                <div>
                                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">প্রয়োজনীয় নথিপত্র চেকলিস্ট</h4>
                                  <div className="grid grid-cols-1 gap-2">
                                    {message.eligibilityResult.documents.map((doc, idx) => {
                                      const isChecked = !!checkedDocuments[doc];
                                      return (
                                        <div
                                          key={idx}
                                          onClick={() => handleDocumentCheck(doc)}
                                          className={`flex items-start gap-3 rounded-2xl border p-3 cursor-pointer transition-all duration-200 ${
                                            isChecked
                                              ? "bg-blue-50/50 border-blue-200 text-blue-900"
                                              : "bg-white border-gray-100 hover:bg-gray-50/60 text-gray-700"
                                          }`}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={isChecked}
                                            readOnly
                                            className="mt-0.5 rounded border-gray-300 text-blue-600 h-4 w-4"
                                          />
                                          <span className="text-xs font-bold leading-snug">{doc}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Footer Action info */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                                <div>
                                  <span className="text-[9px] text-gray-400 block uppercase font-black tracking-widest">প্রক্রিয়াকরণ সময়</span>
                                  <span className="text-xs font-black text-gray-800">{message.eligibilityResult.processingTime}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Animation Bubble */}
            {typingMessageId && (
              <div className="flex gap-3.5 justify-start">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm">
                  <span className="material-symbols-outlined text-base">smart_toy</span>
                </div>
                <div className="max-w-[85%] rounded-3xl rounded-tl-none border border-gray-100 bg-white px-5 py-3.5 shadow-sm text-sm text-gray-800">
                  <p className="whitespace-pre-line">{displayedText}</p>
                  <span className="inline-flex items-center gap-1 ml-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </span>
                </div>
              </div>
            )}

            {/* General Loading Indicator */}
            {isLoading && !typingMessageId && (
              <div className="flex gap-3.5 justify-start animate-pulse">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <span className="material-symbols-outlined text-base">smart_toy</span>
                </div>
                <div className="flex items-center gap-1 rounded-3xl rounded-tl-none border border-gray-100 bg-white px-5 py-3.5 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }}
            className="border-t border-gray-100 bg-white p-4"
          >
            <div className="relative flex items-center gap-3">
              <Input
                type="text"
                placeholder="পাসপোর্টের নিয়ম, বয়সের প্রয়োজনীয়তা বা নথিপত্র সম্পর্কে জিজ্ঞাসা করুন..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
              <Button
                type="submit"
                isDisabled={isLoading || !inputMessage.trim()}
                isIconOnly
                className="h-10 w-10 shrink-0 bg-gradient-to-tr from-[#001731] to-[#002f5c] text-white shadow-md rounded-xl hover:opacity-95 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
