import { formatDate } from "@/utils/day";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  section: {
    marginBottom: 8,
    backgroundColor: "#ffffff",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
    fontWeight: 600,
    color: "#111827",
  },
  title: {
    fontSize: 18,
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 12,
  },
  sectionBody: {
    padding: 10,
    fontSize: 11,
    color: "#1f2937",
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 2,
    fontSize: 11,
    lineHeight: 1.4,
    color: "#1f2937",
  },
});

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

const ListBlock = ({ items }: { items: string[] }) => (
  <View>
    {items.map((item, i) => (
      <Text key={i} style={styles.listItem}>
        • {item}
      </Text>
    ))}
  </View>
);

const PDFRender = ({ insight }: { insight: AIEmotionInsight }) => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Text style={styles.title}>
          Emotion Insight Report -{" "}
          {formatDate(new Date().toISOString(), "MMM DD, YYYY")}
        </Text>
        <Section title="Emotional State">
          <Text style={styles.listItem}>{insight.emotional_overview}</Text>
        </Section>

        <Section title="Personal Highlights">
          <ListBlock items={insight.personal_highlights} />
        </Section>

        <Section title="Emotional Dynamics">
          <ListBlock items={insight.emotional_dynamics} />
        </Section>

        <Section title="Resilience Signals">
          <ListBlock items={insight.resilience_signals} />
        </Section>

        <Section title="Growth Opportunities">
          <ListBlock items={insight.growth_opportunities} />
        </Section>

        <Section title="Follow-Up Questions">
          <ListBlock items={insight.follow_up_questions} />
        </Section>
      </Page>
    </Document>
  );
};

export default PDFRender;
