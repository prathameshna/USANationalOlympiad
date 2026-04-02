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
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.standard) newErrors.standard = 'Please select a standard';
    if (!formData.schoolName.trim()) newErrors.schoolName = 'School name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    if (!formData.whatsappNumber) {
      newErrors.whatsappNumber = 'WhatsApp number is required';
    } else if (!/^\d{10}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'Number must be exactly 10 digits';
    }

    if (formData.alternateNumber && !/^\d{10}$/.test(formData.alternateNumber)) {
      newErrors.alternateNumber = 'Number must be exactly 10 digits';
    }
    
    if (!formData.medium) newErrors.medium = 'Please select an exam medium';

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
          className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-indigo-100 p-8 text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Successful!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for registering for the USA National Olympiad 2026. We have received your application.
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData(INITIAL_DATA);
            }}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-indigo-200"
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
            className="inline-flex items-center justify-center p-2 bg-indigo-50 rounded-2xl mb-4"
          >
            <GraduationCap className="w-6 h-6 text-indigo-600 mr-2" />
            <span className="text-indigo-700 font-semibold text-sm uppercase tracking-wider">Scholarship Exam 2026</span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            USA National Olympiad 2026
          </h1>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Empowering the next generation of scholars through excellence and opportunity.
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
                  <label className="block text-sm font-semibold text-slate-700 ml-1">Student Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Last Name - First Name - Father’s Name"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-indigo-500'} focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 placeholder:text-slate-400`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">Standard</label>
                  <div className="relative">
                    <select
                      name="standard"
                      value={formData.standard}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border appearance-none ${errors.standard ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-indigo-500'} focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-white`}
                    >
                      <option value="">Select Grade</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
                    </div>
                  </div>
                  {errors.standard && <p className="text-red-500 text-xs mt-1 ml-1">{errors.standard}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">School Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      placeholder="Enter school name"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.schoolName ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-indigo-500'} focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 placeholder:text-slate-400`}
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
                  <label className="block text-sm font-semibold text-slate-700 ml-1">Full Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Village, Taluka, District"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-indigo-500'} focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 placeholder:text-slate-400 resize-none`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1 ml-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 ml-1">Parent’s WhatsApp Number</label>
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
                        placeholder="10-digit mobile number"
                        className={`w-full pl-14 pr-4 py-3 rounded-xl border ${errors.whatsappNumber ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-indigo-500'} focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 placeholder:text-slate-400`}
                      />
                    </div>
                    {errors.whatsappNumber && <p className="text-red-500 text-xs mt-1 ml-1">{errors.whatsappNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 ml-1">Alternate Parent's No. (Optional)</label>
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
                        placeholder="10-digit mobile number"
                        className={`w-full pl-14 pr-4 py-3 rounded-xl border ${errors.alternateNumber ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-indigo-500'} focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 placeholder:text-slate-400`}
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
                <label className="block text-sm font-semibold text-slate-700 ml-1">Exam Medium</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Marathi', 'Semi-English'].map((option) => (
                    <label 
                      key={option}
                      className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        formData.medium === option 
                          ? 'border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-500/5' 
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
                        formData.medium === option ? 'border-indigo-600' : 'border-slate-300'
                      }`}>
                        {formData.medium === option && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                      </div>
                      <span className={`font-medium ${formData.medium === option ? 'text-indigo-900' : 'text-slate-600'}`}>
                        {option}
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
              <span>All fields are mandatory for registration</span>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg transition-all duration-200 shadow-xl shadow-indigo-200 hover:shadow-indigo-300 flex items-center justify-center group"
            >
              Register Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.form>

        {/* Footer Info */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>© 2026 USA National Olympiad Committee. All rights reserved.</p>
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
