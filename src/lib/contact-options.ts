// Shared between the contact form and the contact API so values are validated against one list.
export const projectTypes = [
  { value: 'web-development', label: 'Website / Web App' },
  { value: 'mobile-app-development', label: 'Mobile App' },
  { value: 'ai-development', label: 'AI / Machine Learning' },
  { value: 'software-development', label: 'Custom Software' },
  { value: 'other', label: 'Something else' },
] as const;

export const budgets = [
  { value: 'under-2k', label: 'Under $2,000' },
  { value: '2k-5k', label: '$2,000 – $5,000' },
  { value: '5k-15k', label: '$5,000 – $15,000' },
  { value: '15k-plus', label: '$15,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export const timelines = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: 'Within 1–3 months' },
  { value: '3-plus-months', label: 'In 3+ months' },
  { value: 'flexible', label: 'Flexible' },
] as const;

export const labelFor = (
  options: readonly { value: string; label: string }[],
  value: string | undefined
) => options.find((o) => o.value === value)?.label;
