'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, Loader } from 'lucide-react';
import { budgets, projectTypes, timelines } from '@/lib/contact-options';
import { site } from '@/lib/site';

type FormData = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

const MAX_MESSAGE = 5000;

const emptyForm = (projectType = ''): FormData => ({
  name: '',
  email: '',
  company: '',
  projectType,
  budget: '',
  timeline: '',
  message: '',
});

const inputClass = (hasError: boolean) =>
  `w-full bg-black/60 border rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-colors ${
    hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-white/10 focus:border-primary focus:ring-primary'
  }`;

export default function ContactForm() {
  // Service pages link here with ?service=<slug> to preselect the project type.
  const searchParams = useSearchParams();
  const preselected = searchParams.get('service') ?? '';
  const initialType = projectTypes.some((p) => p.value === preselected) ? preselected : '';

  const [formData, setFormData] = useState<FormData>(() => emptyForm(initialType));
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const name = formData.name.trim();
    const message = formData.message.trim();

    if (!name) newErrors.name = 'Please enter your name';
    else if (name.length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Please enter your email';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.projectType) newErrors.projectType = 'Please choose a project type';

    if (!message) newErrors.message = 'Please tell us a little about your project';
    else if (message.length < 10) newErrors.message = 'Please add a few more details (at least 10 characters)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
        setFormData(emptyForm());
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const fieldError = (field: keyof FormData) =>
    errors[field] ? (
      <p id={`${field}-error`} className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
        <AlertCircle className="h-3.5 w-3.5" aria-hidden />
        {errors[field]}
      </p>
    ) : null;

  const describedBy = (field: keyof FormData) => (errors[field] ? `${field}-error` : undefined);

  if (status === 'success') {
    return (
      <div className="bg-white/3 border border-green-500/30 p-8 md:p-10 rounded-2xl text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" aria-hidden />
        <h3 className="mt-5 text-2xl font-bold text-white">Thanks — we have your message</h3>
        <p className="mt-3 text-gray-400">
          We will reply {site.responseTime} with questions or next steps. Need to talk sooner?{' '}
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Message us on WhatsApp
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-gray-400 underline hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/3 border border-white/10 p-6 md:p-8 rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Your name <span className="text-primary">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={describedBy('name')}
              className={inputClass(!!errors.name)}
              placeholder="Jane Smith"
            />
            {fieldError('name')}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Work email <span className="text-primary">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={describedBy('email')}
              className={inputClass(!!errors.email)}
              placeholder="jane@company.com"
            />
            {fieldError('email')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              Company <span className="text-gray-600">(optional)</span>
            </label>
            <input
              id="company"
              type="text"
              name="company"
              autoComplete="organization"
              value={formData.company}
              onChange={handleChange}
              className={inputClass(false)}
              placeholder="Company name"
            />
          </div>
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
              What do you need? <span className="text-primary">*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              aria-invalid={!!errors.projectType}
              aria-describedby={describedBy('projectType')}
              className={inputClass(!!errors.projectType)}
            >
              <option value="">Select a project type</option>
              {projectTypes.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {fieldError('projectType')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
              Estimated budget
            </label>
            <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className={inputClass(false)}>
              <option value="">Select a range</option>
              {budgets.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
              Timeline
            </label>
            <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} className={inputClass(false)}>
              <option value="">Select a timeline</option>
              {timelines.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Project details <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            name="message"
            maxLength={MAX_MESSAGE}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy('message')}
            className={`${inputClass(!!errors.message)} resize-y`}
            placeholder="What are you building, who is it for, and what does success look like?"
          />
          <div className="flex justify-between items-start">
            {fieldError('message')}
            <p className="text-gray-600 text-xs ml-auto mt-1.5">
              {formData.message.length}/{MAX_MESSAGE}
            </p>
          </div>
        </div>

        {status === 'error' && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3" role="alert">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" aria-hidden />
            <div>
              <p className="text-red-300 font-medium">Your message could not be sent</p>
              <p className="text-red-300/80 text-sm">
                Please try again, or email us at{' '}
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-primary text-black font-semibold py-3.5 px-4 rounded-full hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader className="h-5 w-5 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            'Send Project Details'
          )}
        </button>
        <p className="text-xs text-gray-500 text-center">
          We reply {site.responseTime}. Your details are only used to respond to your enquiry — see
          our{' '}
          <Link href="/privacy" className="underline hover:text-gray-300">
            privacy policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
