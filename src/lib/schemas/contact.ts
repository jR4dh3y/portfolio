import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }).max(100),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }).max(320),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }).max(2000),
  hp: z.string().max(0).optional(), // honeypot field
});

export type ContactFormData = z.infer<typeof contactSchema>;
