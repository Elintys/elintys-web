import HeroSection from "../components/hero-section";
import SectionWrapper from "../components/section-wrapper";
import ContactForm from "../components/contact-form";
import ContactDetails from "../components/contact-details";
import MeetingSection from "../components/meeting-section";
import SocialLinks from "../components/social-links";
import FinalCta from "../components/final-cta";
import T from "../../../i18n/t";
import { CONTACT_CONTENT } from "../data/contact-content";

const ContactPage = () => {
  const detailItems = CONTACT_CONTENT.details.items.map((item) => ({
    key: item.label,
    label: <T k={item.label} />,
    value: <T k={item.value} />,
  }));

  const socialLinks = CONTACT_CONTENT.socials.links.map((link) => ({
    name: link.name,
    href: link.href,
    label: <T key={link.labelKey} k={link.labelKey} />,
  }));

  return (
    <div className="bg-slate-50">
      <HeroSection
        title={<T k={CONTACT_CONTENT.hero.title} />}
        subtitle={<T k={CONTACT_CONTENT.hero.subtitle} />}
      />

      <SectionWrapper>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <ContactForm
            titleKey={CONTACT_CONTENT.form.title}
            submitLabelKey={CONTACT_CONTENT.form.submitLabel}
            successMessageKey={CONTACT_CONTENT.form.successMessage}
          />
          <ContactDetails
            title={<T k={CONTACT_CONTENT.details.title} />}
            items={detailItems}
          />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-6 md:grid-cols-2">
          <MeetingSection
            title={<T k={CONTACT_CONTENT.meeting.title} />}
            description={<T k={CONTACT_CONTENT.meeting.description} />}
            ctaLabel={<T k={CONTACT_CONTENT.meeting.ctaLabel} />}
            ctaHref={CONTACT_CONTENT.meeting.ctaHref}
          />
          <SocialLinks
            title={<T k={CONTACT_CONTENT.socials.title} />}
            links={socialLinks}
          />
        </div>
      </SectionWrapper>

      <FinalCta text={<T k={CONTACT_CONTENT.finalCta.text} />} />
    </div>
  );
};

export default ContactPage;
