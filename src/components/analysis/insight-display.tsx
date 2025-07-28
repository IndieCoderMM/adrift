"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  IconAffiliate,
  IconFileTypePdf,
  IconHeartbeat,
  IconHelpSquareRounded,
  IconSparkles,
  IconSquareCheck,
  IconStar,
  IconTimeline,
} from "@tabler/icons-react";
import React from "react";
import PDFRender from "./pdf-render";

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="border-border mb-6 rounded-lg border bg-white">
    <div className="border-border text-fg/80 flex items-center gap-2 border-b px-5 py-3">
      {icon}
      <h2 className="font-head text-fg text-base font-medium">{title}</h2>
    </div>
    <div className="text-fg/90 p-5 tracking-wide">{children}</div>
  </section>
);

const ListBlock = ({ items }: { items: string[] }) => (
  <ul className="ml-5 list-disc space-y-1 marker:text-zinc-400">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

const InsightDisplay = ({ insight }: { insight: AIEmotionInsight }) => {
  return (
    <main className="relative min-h-screen pb-20">
      <PDFDownloadLink
        document={<PDFRender insight={insight} />}
        fileName={`ai_insight_${new Date().toISOString()}.pdf`}
        className="bg-fg text-bg fixed right-4 bottom-4 flex cursor-pointer items-center justify-center rounded-full px-4 py-2 hover:brightness-125"
      >
        {({ loading }) =>
          loading ? (
            "Preparing..."
          ) : (
            <>
              <IconFileTypePdf className="mr-2 size-5" />
              Export PDF
            </>
          )
        }
      </PDFDownloadLink>
      <div className="max-w-3xl px-8">
        <header className="mb-12">
          <div className="mb-3 flex items-center gap-2">
            <IconSparkles className="text-fg size-9 stroke-1" />
            <h1 className="font-head text-4xl text-zinc-900">AI Insight</h1>
          </div>
          <p className="max-w-xl text-lg text-zinc-700">
            Reflect on your recent entries with guidance, insights, and
            personalized prompts to nurture your growth.
          </p>
        </header>

        <Section
          title="Emotional State"
          icon={<IconHeartbeat className="size-5" />}
        >
          <p>{insight.emotional_overview}</p>
        </Section>

        <Section
          title="Personal Highlights"
          icon={<IconStar className="size-5" />}
        >
          <ListBlock items={insight.personal_highlights} />
        </Section>

        <Section
          title="Emotional Dynamics"
          icon={<IconTimeline className="size-5" />}
        >
          <ListBlock items={insight.emotional_dynamics} />
        </Section>

        <Section
          title="Resilience Signals"
          icon={<IconAffiliate className="size-5" />}
        >
          <ListBlock items={insight.resilience_signals} />
        </Section>

        <Section
          title="Growth Opportunities"
          icon={<IconSquareCheck className="size-5" />}
        >
          <ListBlock items={insight.growth_opportunities} />
        </Section>

        <Section
          title="Follow-Up Questions"
          icon={<IconHelpSquareRounded className="size-5" />}
        >
          <ListBlock items={insight.follow_up_questions} />
        </Section>
      </div>
    </main>
  );
};

export default InsightDisplay;
