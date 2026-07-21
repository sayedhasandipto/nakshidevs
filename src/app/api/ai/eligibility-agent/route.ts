import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { EligibilityInputs, EligibilityResult } from '@/lib/types/eligibility';

// Define the rule checker logic locally in Bengali
function runEligibilityCheck(args: EligibilityInputs): EligibilityResult {
  const { serviceType, userAge, monthlyIncome, residencyStatus } = args;
  const normalizedService = serviceType.toLowerCase();
  const isBangladeshi = residencyStatus.toLowerCase().includes('bangladesh') || residencyStatus.toLowerCase().includes('বাংলা');

  if (normalizedService.includes('passport') || normalizedService.includes('পাসপোর্ট')) {
    if (userAge < 18) {
      return {
        status: 'Partially Eligible',
        documents: [
          'ডিজিটাইজড জন্ম নিবন্ধন সনদ',
          'পিতা অথবা মাতার জাতীয় পরিচয়পত্র (NID) কার্ডের কপি',
          'পাসপোর্ট সাইজের ছবি (ল্যাব প্রিন্ট ও নীল ব্যাকগ্রাউন্ড)',
          'পিতা/মাতা বা আইনগত অভিভাবকের লিখিত সম্মতিপত্র',
          'বর্তমান ঠিকানার প্রমাণ হিসেবে ইউটি利টি বিলের কপি'
        ],
        processingTime: '১৫-২১ কার্যদিবস (সাধারণ), ৭-১০ কার্যদিবস (জরুরী)',
        reason: '১৮ বছরের কম বয়সী আবেদনকারীরা ই-পাসপোর্টের জন্য আবেদন করতে পারবেন, তবে পিতা-মাতার এনআইডি ও আইনগত সম্মতিপত্র প্রয়োজন।'
      };
    }
    if (!isBangladeshi) {
      return {
        status: 'Not Eligible',
        documents: [],
        processingTime: 'প্রযোজ্য নয়',
        reason: 'ই-পাসপোর্ট শুধুমাত্র বাংলাদেশের নাগরিকদের জন্য প্রযোজ্য।'
      };
    }
    return {
      status: 'Eligible',
      documents: [
        'জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্ম নিবন্ধন সনদ',
        'পূর্ববর্তী পাসপোর্ট (যদি থাকে)',
        'চালান বা ব্যাংক পেমেন্ট স্লিপের কপি',
        'বর্তমান ঠিকানার প্রমাণ হিসেবে ইউটিলিটি বিলের কপি (বিদ্যুৎ/পানি/গ্যাস)'
      ],
      processingTime: '১৫-২১ কার্যদিবস (সাধারণ), ৭-১০ কার্যদিবস (জরুরী)',
      reason: 'বাংলাদেশী ই-পাসপোর্টের জন্য আপনার সকল মৌলিক যোগ্যতা রয়েছে।'
    };
  }

  if (normalizedService.includes('tin') || normalizedService.includes('tax') || normalizedService.includes('টিন') || normalizedService.includes('কর')) {
    if (userAge < 18) {
      return {
        status: 'Not Eligible',
        documents: [],
        processingTime: 'প্রযোজ্য নয়',
        reason: 'ব্যক্তিগত ই-টিন (e-TIN) সার্টিফিকেট নিবন্ধনের জন্য আবেদনকারীর বয়স ন্যূনতম ১৮ বছর হতে হবে।'
      };
    }
    if (!isBangladeshi) {
      return {
        status: 'Partially Eligible',
        documents: [
          'বৈধ পাসপোর্ট এর কপি',
          'বিদেশী ব্যবসা নিবন্ধন অথবা স্থানীয় বিনিয়োগের প্রমাণপত্র',
          'সাম্প্রতিক পাসপোর্ট সাইজের ছবি'
        ],
        processingTime: '৩-৫ কার্যদিবস',
        reason: 'অপ্রবাসী বা বিদেশী নাগরিকরা নির্দিষ্ট উদ্দেশ্যে (যেমন বিনিয়োগ বা কোম্পানির পরিচালক পদ) টিন সার্টিফিকেট পেতে পারেন, তবে তাদের ক্ষেত্রে অতিরিক্ত নথিপত্র এবং শারীরিক যাচাইয়ের প্রয়োজন রয়েছে।'
      };
    }
    return {
      status: 'Eligible',
      documents: [
        'জাতীয় পরিচয়পত্র (NID)',
        'এনআইডি-র সাথে নিবন্ধিত একটি সচল মোবাইল নম্বর (OTP এর জন্য)',
        'ব্যবসার ঠিকানা ও বিবরণ (যদি প্রোপ্রাইটরশিপ ব্যবসা হয়)'
      ],
      processingTime: 'তাৎক্ষণিক (১০-১৫ মিনিট অনলাইন)',
      reason: 'আপনি অনলাইনে তাৎক্ষণিকভাবে একটি ব্যক্তিগত ই-টিন সার্টিফিকেট নিবন্ধনের যোগ্য।'
    };
  }

  if (normalizedService.includes('trade') || normalizedService.includes('license') || normalizedService.includes('ট্রেড') || normalizedService.includes('লাইসেন্স')) {
    if (userAge < 18) {
      return {
        status: 'Not Eligible',
        documents: [],
        processingTime: 'প্রযোজ্য নয়',
        reason: 'ট্রেড লাইসেন্সের জন্য আবেদন করতে হলে ব্যবসার মালিকের বয়স ন্যূনতম ১৮ বছর হতে হবে।'
      };
    }
    if (!isBangladeshi) {
      return {
        status: 'Partially Eligible',
        documents: [
          'মালিক/অংশীদারদের বৈধ পাসপোর্ট ও ভিসার কপি',
          'যৌথ উদ্যোগ চুক্তি বা বোর্ড রেজোলিউশন',
          'ওয়ার্ক পারমিট কপি',
          'ব্যবসা প্রতিষ্ঠানের ভাড়ার চুক্তি বা মালিকানার দলিল'
        ],
        processingTime: '৭-১০ কার্যদিবস',
        reason: 'বিদেশী নাগরিকরা বাংলাদেশে নিবন্ধিত প্রতিষ্ঠানের জন্য ট্রেড লাইসেন্স পেতে পারেন, তবে এর জন্য ওয়ার্ক পারমিট, স্থানীয় অংশীদারি ঘোষণা এবং বিশেষ অনুমোদনের প্রয়োজন হবে।'
      };
    }
    return {
      status: 'Eligible',
      documents: [
        'মালিকের জাতীয় পরিচয়পত্র (NID)',
        'ব্যবসা প্রতিষ্ঠানের ভাড়ার চুক্তি অথবা বাণিজ্যিক জায়গার মালিকানার দলিল',
        'বাণিজ্যিক জায়গার হোল্ডিং ট্যাক্স পরিশোধের রশিদ',
        'আবেদনকারীর পাসপোর্ট সাইজের ছবি',
        'ফায়ার সার্ভিস ক্লিয়ারেন্স সার্টিফিকেট (কারখানা/গুদামের ক্ষেত্রে প্রযোজ্য)'
      ],
      processingTime: '৩-৫ কার্যদিবস',
      reason: 'আপনি ট্রেড লাইসেন্স পাওয়ার যোগ্য। মনে রাখবেন আপনার অবশ্যই একটি বাণিজ্যিক ঠিকানা থাকতে হবে।'
    };
  }

  // Fallback
  return {
    status: 'Partially Eligible',
    documents: [
      'জাতীয় পরিচয়পত্র (NID) অথবা পাসপোর্ট',
      'বাংলাদেশে বর্তমান ঠিকানার প্রমাণপত্র',
      'আয়ের বিবরণ / ব্যাংক সচ্ছলতার সনদ (প্রাসঙ্গিক হলে)'
    ],
    processingTime: 'সংশ্লিষ্ট কর্তৃপক্ষের ওপর নির্ভরশীল (সাধারণত ৫-১৫ দিন)',
    reason: `আমরা আপনার পছন্দকৃত সেবা '${serviceType}' এর জন্য অনুরোধ নথিভুক্ত করেছি। নির্দিষ্ট মন্ত্রণালয়ের নির্দেশনা অনুযায়ী যোগ্যতার অন্যান্য মানদণ্ড যাচাই করার অনুরোধ রইল।`
  };
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'সার্ভারে GEMINI_API_KEY কনফিগার করা নেই। অনুগ্রহ করে .env ফাইলে এটি যোগ করুন।' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'অকার্যকর অনুরোধ: "messages" অ্যারে আবশ্যক।' },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Format chat history context for Gemini's contents parameter
    const contents = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Declare the checkEligibilityRule tool
    const eligibilityTool = {
      functionDeclarations: [
        {
          name: 'checkEligibilityRule',
          description: 'Calculates the user eligibility status, required documents list, and estimated processing time for Bangladesh government services (e.g., E-Passport, TIN Certificate, Trade License). Call this when you have gathered the required parameters: serviceType, userAge, and residencyStatus.',
          parameters: {
            type: 'OBJECT',
            properties: {
              serviceType: {
                type: 'STRING',
                description: 'The type of service. E.g., "Trade License", "E-Passport", "TIN Certificate", etc.'
              },
              userAge: {
                type: 'INTEGER',
                description: 'The age of the user in years'
              },
              monthlyIncome: {
                type: 'NUMBER',
                description: 'The monthly income of the user in BDT (optional)'
              },
              residencyStatus: {
                type: 'STRING',
                description: 'Residency status of the user, e.g., "Bangladeshi", "Non-Resident Bangladeshi", "Foreigner"'
              }
            },
            required: ['serviceType', 'userAge', 'residencyStatus']
          }
        }
      ]
    };

    const systemInstruction = 
      "You are the NakshiDevs Smart Eligibility & Guidance Agent. " +
      "Your goal is to guide users to determine if they are eligible for various Bangladesh government services. " +
      "YOU MUST CONVERSE AND REPLY ENTIRELY IN BENGALI (বাংলা). " +
      "First, check if you have all the required details: serviceType, userAge, and residencyStatus. " +
      "If any of these details are missing, do not guess. Ask the user friendly follow-up questions in Bengali to gather them. " +
      "Once you have all three pieces of information, call the `checkEligibilityRule` tool immediately. " +
      "Do NOT tell the user that you are calling a tool or performing a check. Just make the function call. " +
      "When the tool returns the check result (which is already in Bengali), summarize the eligibility details in a polite, helpful way in Bengali, " +
      "and direct the user to apply using the structured card displayed in the UI.";

    // First model generation call
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction,
        tools: [eligibilityTool]
      }
    });

    const responseText = response.text;
    const functionCalls = response.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === 'checkEligibilityRule') {
        const args = call.args as any;
        
        // Execute rule logic locally
        const checkResult = runEligibilityCheck({
          serviceType: args.serviceType || '',
          userAge: Number(args.userAge),
          monthlyIncome: args.monthlyIncome ? Number(args.monthlyIncome) : undefined,
          residencyStatus: args.residencyStatus || ''
        });

        const candidateContent = response.candidates?.[0]?.content;
        if (!candidateContent) {
          throw new Error('No candidate content returned from the first model call.');
        }

        // Feed tool response back to Gemini to generate final summary message
        const secondResponse = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: [
            ...contents,
            candidateContent,
            {
              role: 'tool',
              parts: [{
                functionResponse: {
                  name: 'checkEligibilityRule',
                  response: { result: checkResult }
                }
              }]
            }
          ],
          config: {
            systemInstruction: "You are the NakshiDevs Smart Eligibility & Guidance Agent. Summarize the eligibility check result in friendly Bengali (বাংলা) and explain why they are eligible/not eligible and what documents they need to collect. Inform them they can check the interactive checklist details card above."
          }
        });

        return NextResponse.json({
          content: secondResponse.text || 'যোগ্যতা যাচাই সফলভাবে সম্পন্ন হয়েছে।',
          eligibilityResult: checkResult
        });
      }
    }

    return NextResponse.json({
      content: responseText || 'আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?'
    });

  } catch (error: any) {
    console.error('Error in eligibility-agent API route:', error);
    return NextResponse.json(
      { error: error.message || 'অভ্যন্তরীণ সার্ভার ত্রুটি' },
      { status: 500 }
    );
  }
}
