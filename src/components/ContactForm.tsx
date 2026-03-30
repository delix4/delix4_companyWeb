'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name <span className="text-primary">*</span></label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-primary focus:ring-1 focus:ring-primary'}`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p id="name-error" className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email <span className="text-primary">*</span></label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-primary focus:ring-1 focus:ring-primary'}`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p id="email-error" className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject <span className="text-primary">*</span></label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-primary focus:ring-1 focus:ring-primary'}`}
            placeholder="Project Inquiry"
          />
          {errors.subject && (
            <p id="subject-error" className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.subject}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message <span className="text-primary">*</span></label>
          <textarea
            id="message"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-primary focus:ring-1 focus:ring-primary'}`}
            placeholder="Tell us about your project..."
          />
          <div className="flex justify-between items-start mt-2">
            {errors.message && (
              <p id="message-error" className="text-red-400 text-sm flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.message}
              </p>
            )}
            <p className="text-gray-500 text-xs ml-auto">{formData.message.length}/1000</p>
          </div>
        </div>

        {status === 'success' && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-400 font-medium">Message sent successfully!</p>
              <p className="text-green-300 text-sm">We&apos;ll get back to you within 24 hours.</p>
            </div>
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-medium">Failed to send message</p>
              <p className="text-red-300 text-sm">Please try again or contact us directly.</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-primary text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
        <p className="text-xs text-gray-500 text-center">We respect your privacy. Your data is safe with us.</p>
      </form>
    </div>
  );
}
