import React, { useState, useEffect } from "react";
import { ArrowRight, Zap, CheckCircle, Loader } from "lucide-react";
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
      console.error("EmailJS Error:", err);
      alert("Oops! Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/3 to-emerald-500/3 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-full px-5 py-2.5 text-sm text-slate-300 shadow-2xl">
          <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
          <span className="font-medium">Coming Soon</span>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="mb-12 animate-fade-in-up">
          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-100 to-emerald-400 tracking-tight mb-4 mt-10 select-none">
            TREDNA
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full" />
        </div>

        <div
          className="mb-8 h-20 flex items-center justify-center animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-200 transition-all duration-1000 ease-in-out">
            {taglineWords[currentWord]}
          </h2>
        </div>

        <div
          className="mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Track your balance, posture, and recovery — powered by science and
            play.
          </p>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg group-hover:bg-slate-800/70"
                  required
                />
              </div>

              <div className="relative group">
                <PhoneInput
                  country={"ng"}
                  value={phone}
                  onChange={setPhone}
                  containerClass="w-full h-full"
                  inputClass="w-full h-full px-6 py-4 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg group-hover:bg-slate-800/70"
                  buttonClass="
        absolute left-0 top-0 h-full flex items-center px-4 
        rounded-l-2xl bg-slate-800/50 backdrop-blur-xl border border-r-0 border-slate-700/50
        text-slate-100 transition-all duration-300 group-hover:bg-slate-800/70
      "
                  dropdownClass="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl text-slate-100"
                  searchClass="bg-transparent placeholder-slate-400 text-slate-100"
                  placeholder="Phone number"
                  searchPlaceholder="Search country"
                />
              </div>
            </div>

            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-8 py-4 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg group-hover:bg-slate-800/70"
                required
              />
              <button
                type="submit"
                disabled={isLoading || isSubmitted}
                className="
                  absolute right-2 top-1/2 transform -translate-y-1/2 h-14 px-6 flex items-center justify-center gap-2
                  bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                  text-white font-semibold rounded-xl transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <span>Join Waitlist</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {isSubmitted && (
            <div className="mt-4 text-emerald-400 font-medium animate-fade-in-up">
              🎉 Thank you! You’re on the list. We’ll notify you when TREDNA
              launches.
            </div>
          )}
        </div>

        <div
          className="mt-12 animate-fade-in-up"
          style={{ animationDelay: "1.2s" }}
        >
          <p className="text-slate-500 text-sm font-mono">trednafit.com</p>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-500 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
