import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/primitives';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Delix4 collects, uses and protects personal information submitted through this website.',
  alternates: { canonical: '/privacy' },
};

const lastUpdated = 'October 5, 2026';

export default function PrivacyPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ name: 'Privacy Policy', href: '/privacy' }]} title="Privacy Policy" description={`Last updated: ${lastUpdated}`} />
      <Section className="pt-0! md:pt-0!">
        <article className="prose-delix max-w-3xl">
          <p>
            This policy explains how {site.name} (&quot;we&quot;, &quot;us&quot;) handles personal
            information when you visit {site.url} or contact us. We collect as little information as
            possible and use it only to respond to you and provide our services.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Information you give us:</strong> your name, email address, company name,
              project details, budget range and timeline when you submit the contact form, email
              us, or message us on WhatsApp.
            </li>
            <li>
              <strong>Technical information:</strong> basic data such as your IP address, which is
              used temporarily to protect our contact form from abuse (rate limiting), and standard
              server logs kept by our hosting provider.
            </li>
          </ul>

          <h2>How we use your information</h2>
          <ul>
            <li>To reply to your enquiry and discuss your project.</li>
            <li>To prepare proposals and deliver services you request.</li>
            <li>To keep our website secure and prevent spam.</li>
          </ul>
          <p>We do not sell your personal information or use it for unrelated marketing.</p>

          <h2>Sharing</h2>
          <p>
            We share information only with service providers that help us operate — such as our
            website host and email provider — and only as needed for them to provide that service,
            or when required by law.
          </p>

          <h2>Data retention</h2>
          <p>
            We keep enquiry information for as long as needed to respond and, if we work together,
            for the duration of the project and any legal or accounting requirements afterwards.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us to access, correct or delete the personal information we hold about you
            at any time by emailing <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>Cookies</h2>
          <p>
            This website does not use advertising or tracking cookies. If we add analytics in the
            future, this policy will be updated first.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </article>
      </Section>
    </>
  );
}
