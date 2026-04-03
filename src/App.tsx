/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  School, 
  MapPin, 
  Phone, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  GraduationCap,
  Languages
} from 'lucide-react';

type FormData = {
  fullName: string;
  standard: string;
  schoolName: string;
  address: string;
  whatsappNumber: string;
  alternateNumber: string;
  medium: 'Marathi' | 'Semi-English' | '';
};

const INITIAL_DATA: FormData = {
  fullName: '',
  standard: '',
  schoolName: '',
  address: '',
  whatsappNumber: '',
  alternateNumber: '',
  medium: '',
};

export default function App() {
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'पूर्ण नाव आवश्यक आहे';
    if (!formData.standard) newErrors.standard = 'कृपया इयत्ता निवडा';
    if (!formData.schoolName.trim()) newErrors.schoolName = 'शाळेचे नाव आवश्यक आहे';
    if (!formData.address.trim()) newErrors.address = 'पत्ता आवश्यक आहे';
    
    if (!formData.whatsappNumber) {
      newErrors.whatsappNumber = 'व्हॉट्सॲप नंबर आवश्यक आहे';
    } else if (!/^\d{10}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'नंबर १० अंकी असणे आवश्यक आहे';
    }

    if (formData.alternateNumber && !/^\d{10}$/.test(formData.alternateNumber)) {
      newErrors.alternateNumber = 'नंबर १० अंकी असणे आवश्यक आहे';
    }
    
    if (!formData.medium) newErrors.medium = 'कृपया परीक्षेचे माध्यम निवडा';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitted(true);
      }, 500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-brand/10 p-8 text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">नोंदणी यशस्वी झाली!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for registering for the USA OLYMPIAD 2026 - SCIENCE & MATHS. We have received your application.
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData(INITIAL_DATA);
            }}
            className="w-full py-3.5 bg-brand hover:bg-brand-dark text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-brand/20"
          >
            Register Another Student
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-2 bg-brand-light rounded-2xl mb-4"
          >
            <GraduationCap className="w-6 h-6 text-brand mr-2" />
            <span className="text-brand-dark font-semibold text-sm uppercase tracking-wider">शिष्यवृत्ती परीक्षा २०२६</span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3 flex flex-col items-center">
            <span>USA OLYMPIAD 2026</span>
            <span>SCIENCE & MATHS</span>
            <span className="text-2xl sm:text-3xl text-brand font-bold mt-1">National Level Compitition</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-lg mx-auto font-medium">
            Your First Step Towards NTSE | NEET | JEE | NDA Success
          </p>
        </div>

        {/* Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100"
        >
          <div className="p-8 sm:p-10 space-y-12">
            
            {/* Section 1: Personal Information */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 pb-2 border-b border-slate-100">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">विद्यार्थ्याचे पूर्ण नाव</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="विद्यार्थ्याचे नाव - वडिलांचे नाव - आडनाव"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-brand'} focus:ring-4 focus:ring-brand/10 outline-none transition-all duration-200 placeholder:text-slate-400`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">इयत्ता</label>
                  <div className="relative">
                    <select
                      name="standard"
                      value={formData.standard}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border appearance-none ${errors.standard ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-brand'} focus:ring-4 focus:ring-brand/10 outline-none transition-all duration-200 bg-white`}
                    >
                      <option value="">इयत्ता निवडा</option>
                      <option value="Grade 5">इयत्ता ५ वी</option>
                      <option value="Grade 6">इयत्ता ६ वी</option>
                      <option value="Grade 7">इयत्ता ७ वी</option>
                      <option value="Grade 8">इयत्ता ८ वी</option>
                      <option value="Grade 9">इयत्ता ९ वी</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
                    </div>
                  </div>
                  {errors.standard && <p className="text-red-500 text-xs mt-1 ml-1">{errors.standard}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">शाळेचे नाव</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      placeholder="शाळेचे नाव टाका"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.schoolName ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-brand'} focus:ring-4 focus:ring-brand/10 outline-none transition-all duration-200 placeholder:text-slate-400`}
                    />
                  </div>
                  {errors.schoolName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.schoolName}</p>}
                </div>
              </div>
            </section>

            {/* Section 2: Address & Contact */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 pb-2 border-b border-slate-100">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Address & Contact</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">पूर्ण पत्ता</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="गाव, तालुका, जिल्हा"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-brand'} focus:ring-4 focus:ring-brand/10 outline-none transition-all duration-200 placeholder:text-slate-400 resize-none`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1 ml-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 ml-1">पालकांचा व्हॉट्सॲप नंबर</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pr-3 border-r border-slate-200">
                        <Phone className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData(prev => ({ ...prev, whatsappNumber: val }));
                          if (errors.whatsappNumber) setErrors(prev => ({ ...prev, whatsappNumber: undefined }));
                        }}
                        placeholder="१० अंकी मोबाईल नंबर"
                        className={`w-full pl-14 pr-4 py-3 rounded-xl border ${errors.whatsappNumber ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-brand'} focus:ring-4 focus:ring-brand/10 outline-none transition-all duration-200 placeholder:text-slate-400`}
                      />
                    </div>
                    {errors.whatsappNumber && <p className="text-red-500 text-xs mt-1 ml-1">{errors.whatsappNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 ml-1">पालकांचा पर्यायी नंबर (पर्यायी)</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pr-3 border-r border-slate-200">
                        <Phone className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        name="alternateNumber"
                        value={formData.alternateNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData(prev => ({ ...prev, alternateNumber: val }));
                          if (errors.alternateNumber) setErrors(prev => ({ ...prev, alternateNumber: undefined }));
                        }}
                        placeholder="१० अंकी मोबाईल नंबर"
                        className={`w-full pl-14 pr-4 py-3 rounded-xl border ${errors.alternateNumber ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-brand'} focus:ring-4 focus:ring-brand/10 outline-none transition-all duration-200 placeholder:text-slate-400`}
                      />
                    </div>
                    {errors.alternateNumber && <p className="text-red-500 text-xs mt-1 ml-1">{errors.alternateNumber}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Educational Information */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 pb-2 border-b border-slate-100">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Languages className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Educational Information</h2>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 ml-1">परीक्षेचे माध्यम</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Marathi', 'Semi-English'].map((option) => (
                    <label 
                      key={option}
                      className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        formData.medium === option 
                          ? 'border-brand bg-brand-light/50 ring-4 ring-brand/5' 
                          : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="medium"
                        value={option}
                        checked={formData.medium === option}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.medium === option ? 'border-brand' : 'border-slate-300'
                      }`}>
                        {formData.medium === option && <div className="w-2.5 h-2.5 bg-brand rounded-full" />}
                      </div>
                      <span className={`font-medium ${formData.medium === option ? 'text-brand-dark' : 'text-slate-600'}`}>
                        {option === 'Marathi' ? 'मराठी' : 'सेमी-इंग्रजी'}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.medium && <p className="text-red-500 text-xs mt-1 ml-1">{errors.medium}</p>}
              </div>
            </section>
          </div>

          {/* Footer / Submit */}
          <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-slate-500 text-sm">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>नोंदणीसाठी सर्व माहिती भरणे अनिवार्य आहे</span>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 bg-brand hover:bg-brand-dark text-white rounded-2xl font-bold text-lg transition-all duration-200 shadow-xl shadow-brand/20 hover:shadow-brand/30 flex items-center justify-center group"
            >
              Register Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.form>

        {/* Footer Info */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>© 2026 National Level Competition Committee. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-indigo-500 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-indigo-500 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-indigo-500 transition-colors">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
