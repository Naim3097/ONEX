'use client'

import { useState } from 'react'
import { business, getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import Text from '@/components/typography/Text'

interface ContactFormProps {
  locale: Locale
}

export default function ContactForm({ locale }: ContactFormProps) {
  const content = getContent(locale)
  const form = content.contact.form

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    problem: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `ONEX - Name: ${formData.name}\nPhone: ${formData.phone}\nCar: ${formData.carModel}\nIssue: ${formData.problem}\n\n${formData.message}`
    )
    window.open(
      `https://wa.me/+601131051677?text=${text}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const inputClasses =
    'w-full px-4 py-3 bg-white border border-neutral-200 text-body text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 transition-colors duration-200'

  const problemOptions = [
    'Gearbox slipping',
    'Hard shifting',
    'Delayed engagement',
    'Transmission noise',
    'Fluid leak',
    'Warning light on',
    'Regular servicing',
    'Other',
  ]

  return (
    <FadeIn>
      <div>
        <h3 className="text-h4 text-neutral-950 mb-8">{form.title}</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="sr-only">{form.fields.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={form.fields.name}
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="phone" className="sr-only">{form.fields.phone}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder={form.fields.phone}
              value={formData.phone}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="carModel" className="sr-only">{form.fields.carModel}</label>
            <input
              type="text"
              id="carModel"
              name="carModel"
              placeholder={form.fields.carModel}
              value={formData.carModel}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="problem" className="sr-only">{form.fields.problem}</label>
            <select
              id="problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
              className={`${inputClasses} ${!formData.problem ? 'text-neutral-400' : ''}`}
            >
              <option value="" disabled>{form.fields.problem}</option>
              {problemOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="sr-only">{form.fields.message}</label>
            <textarea
              id="message"
              name="message"
              placeholder={form.fields.message}
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`${inputClasses} resize-none`}
            />
          </div>

          <button type="submit" className="cta-primary w-full text-center">
            {form.submit}
          </button>

          <Text variant="caption" className="text-neutral-400 text-center">
            This form opens WhatsApp with your details pre-filled.
          </Text>
        </form>
      </div>
    </FadeIn>
  )
}
