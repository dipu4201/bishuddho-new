import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'বিশুদ্ধ | প্রকৃতির খাঁটি স্বাদ',
  description: 'বিশুদ্ধ থেকে পান মানসম্মত ও প্রাকৃতিক পণ্য, সরাসরি আপনার ঘরে।',
  metadataBase: new URL('https://bishuddho.bond'),
  openGraph: { title: 'বিশুদ্ধ | প্রকৃতির খাঁটি স্বাদ', description: 'প্রকৃতির খাঁটি স্বাদ, আপনার পরিবারের জন্য।', type: 'website' }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bn"><body>{children}</body></html>;
}
