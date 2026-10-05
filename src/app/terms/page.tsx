import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/primitives';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using the Delix4 website.',
  alternates: { canonical: '/terms' },
};

const lastUpdated = 'October 5, 2026';

export default function TermsPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ name: 'Terms & Conditions', href: '/terms' }]} title="Terms & Conditions" description={`Last updated: ${lastUpdated}`} />
      <Section className="pt-0! md:pt-0!">
        <article className="prose-delix max-w-3xl">
          <p>
            These terms govern your use of {site.url}. By using this website you agree to them. If
            you do not agree, please do not use the site.
          </p>

          <h2>Website content</h2>
          <p>
            The content on this website is provided for general information about {site.name} and
            our services. We work to keep it accurate and up to date, but it does not form an offer
            or a contract.
          </p>

          <h2>Project agreements</h2>
          <p>
            Any software development work is governed by a separate written proposal or agreement
            that sets out scope, timeline, payment terms and ownership. If that agreement conflicts
            with these terms, the agreement applies.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The {site.name} name, logo, website design and content are owned by {site.name}. You may
            not copy or reuse them without our permission. Third-party names and trademarks belong
            to their respective owners.
          </p>

          <h2>Acceptable use</h2>
          <ul>
            <li>Do not use the website or contact form to send spam or unlawful content.</li>
            <li>Do not attempt to disrupt, overload or gain unauthorised access to the website.</li>
          </ul>

          <h2>External links</h2>
          <p>
            We may link to third-party websites. We are not responsible for their content or
            privacy practices.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            The website is provided &quot;as is&quot;. To the extent permitted by law, {site.name} is
            not liable for any loss arising from use of the website.
          </p>

          <h2>Changes</h2>
          <p>We may update these terms from time to time. The date above shows the latest revision.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </article>
      </Section>
    </>
  );
}
