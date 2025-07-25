import React, { useState, useEffect } from "react";
import { ArrowLeft, Zap, CheckCircle, Loader } from "lucide-react";
import emailjs from "emailjs-com";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "flag-icons/css/flag-icons.min.css";

const SERVICE_ID = "service_41f4ldd";
const TEMPLATE_ID = "template_84hy8ss";
const PUBLIC_KEY = "3IWvIp_-weI_soHy3";

const Hero: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);

  const taglineWords = [
    "The Smart Mat That Moves With You",
    "Track Your Balance & Posture",
    "Powered by Science and Play",
  ];

  useEffect(() => {
    const iv = setInterval(() => {
      setCurrentWord((w) => (w + 1) % taglineWords.length);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsLoading(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { name, email, phone },
        PUBLIC_KEY
      );
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong—please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 bg-white overflow-hidden">
      <div className="absolute top-16 sm:top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 bg-black/10 rounded-full px-4 py-2 text-sm text-black/70">
          <Zap className="w-4 h-4 animate-pulse" />
          <span className="font-medium">Coming Soon</span>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-sm w-full mx-auto space-y-6">
        <h1 className="text-7xl sm:text-8xl lg:text-8xl mt-10 font-black text-black">
          TREDNA
        </h1>

        <div className="h-20 flex items-center justify-center">
          <h2 className="text-2xl sm:text-3xl font-light text-black transition-all duration-1000 ease-in-out">
            {taglineWords[currentWord]}
          </h2>
        </div>

        <p className="text-base sm:text-lg text-black/70 leading-relaxed font-light max-w-md mx-auto">
          Track your balance, posture, and recovery — powered by science and
          play.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-xl bg-black/5 border border-black/10 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/20 transition"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl bg-black/5 border border-black/10 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/20 transition"
            required
          />

          <PhoneInput
            country={"us"}
            value={phone}
            onChange={setPhone}
            containerClass="w-full"
            inputClass="w-full px-4 py-3 rounded-xl bg-black/5 border border-black/10 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/20 transition"
            buttonClass="absolute left-0 top-0 h-full flex items-center px-3 rounded-l-xl bg-black/5 border-r-0 border border-black/10 text-black"
            dropdownClass="bg-white border border-black/10 rounded-xl text-black"
            searchClass="bg-transparent placeholder-black/40 text-black"
            placeholder="Phone number"
            searchPlaceholder="Search country"
          />

          <button
            type="submit"
            disabled={isLoading || isSubmitted}
            className="w-full py-3 flex items-center justify-center gap-2 bg-black text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>
              {isLoading
                ? "Sending..."
                : isSubmitted
                ? "Added!"
                : "Join the waitlist"}
            </span>

            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : isSubmitted ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <ArrowLeft className="w-5 h-5 rotate-180" />
            )}
          </button>
        </form>

        <div className="flex justify-center items-center text-sm text-black/60 space-x-3 pt-2">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="/support" className="hover:underline">
            Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
