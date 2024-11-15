"use client";
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQItemProps extends FAQItem {
  key?: React.Key;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="text-base font-karla font-semibold text-gray-900 pr-4">
          {question}
        </span>
        <svg
          className={`w-4 h-4 flex-shrink-0 text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            d="M5 15l7-7 7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
        aria-hidden={!isOpen}
      >
        <p className="text-gray-600 text-sm leading-relaxed font-karla">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      question: "How do I qualify for the vouchers?",
      answer:
        "To qualify for the vouchers, participants must complete both the mid-point and final surveys, as well as submit 2 months of electricity meter readings to validate their success and participation in the pilot.",
    },
    {
      question: "What happens if I don't reduce my energy usage?",
      answer:
        "The goal is to encourage energy-saving habits, so households that successfully reduce their consumption will qualify for $20 NTUC vouchers. However, households who signed up for the pilot and have remained within +/-2% of their previous moth's energy usage will also get $5 NTUC voucher as thanks for participating in our pilot programme.",
    },
    {
      question: "Do I need any special equipment to participate?",
      answer:
        "No special equipment needed! All you need is a phone camera or computer to access our cost estimate calculator. Simply create an account and follow the challenge terms to participate!",
    },
    {
      question: "Can my family join the challenge?",
      answer:
        "Sure! Everyone can participate, but each household is eligible for only one voucher. Family members in separate households can join the challenge individually and redeem their own vouchers.",
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-[90%] w-[800px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-4xl sm:text-3xl font-arvo font-bold text-gray-900 mb-6 sm:mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-1 bg-white p-3 sm:p-5 rounded-lg shadow-sm">
          {faqItems.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
