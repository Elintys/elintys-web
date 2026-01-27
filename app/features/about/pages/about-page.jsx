import HeroSection from "../components/hero-section";
import SectionWrapper from "../components/section-wrapper";
import InfoCard from "../components/info-card";
import BulletList from "../components/bullet-list";
import TeamCard from "../components/team-card";
import FinalCta from "../components/final-cta";
import T from "../../../i18n/t";
import { ABOUT_CONTENT } from "../data/about-content";

const mapKeysToItems = (keys) =>
  keys.map((key) => ({
    key,
    label: <T key={key} k={key} />,
  }));

const AboutPage = () => (
  <div className="bg-slate-50">
    <HeroSection
      title={<T k={ABOUT_CONTENT.hero.title} />}
      subtitle={<T k={ABOUT_CONTENT.hero.subtitle} />}
      ctaLabel={<T k={ABOUT_CONTENT.hero.ctaLabel} />}
      ctaHref="/contact"
    />

    <SectionWrapper>
      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard
          title={<T k={ABOUT_CONTENT.mission.title} />}
          description={<T k={ABOUT_CONTENT.mission.description} />}
        />
        <InfoCard
          title={<T k={ABOUT_CONTENT.vision.title} />}
          description={<T k={ABOUT_CONTENT.vision.description} />}
        />
      </div>
    </SectionWrapper>

    <SectionWrapper title={<T k={ABOUT_CONTENT.problem.title} />}>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <BulletList items={mapKeysToItems(ABOUT_CONTENT.problem.items)} />
      </div>
    </SectionWrapper>

    <SectionWrapper title={<T k={ABOUT_CONTENT.solution.title} />}>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm sm:text-base text-gray-600">
            <T k={ABOUT_CONTENT.solution.description} />
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
            <T k="about.solution.benefitsTitle" />
          </h3>
          <div className="mt-4">
            <BulletList items={mapKeysToItems(ABOUT_CONTENT.solution.benefits)} />
          </div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper title={<T k={ABOUT_CONTENT.differentiators.title} />}>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <BulletList items={mapKeysToItems(ABOUT_CONTENT.differentiators.items)} />
      </div>
    </SectionWrapper>

    <SectionWrapper
      title={<T k={ABOUT_CONTENT.team.title} />}
      description={<T k={ABOUT_CONTENT.team.description} />}
    >
      <div className="max-w-md">
        <TeamCard
          name={ABOUT_CONTENT.team.person.name}
          role={<T k={ABOUT_CONTENT.team.person.role} />}
          description={<T k={ABOUT_CONTENT.team.person.description} />}
        />
      </div>
    </SectionWrapper>

    <SectionWrapper title={<T k={ABOUT_CONTENT.values.title} />}>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <BulletList items={mapKeysToItems(ABOUT_CONTENT.values.items)} />
      </div>
    </SectionWrapper>

    <FinalCta text={<T k={ABOUT_CONTENT.finalCta.text} />} />
  </div>
);

export default AboutPage;
