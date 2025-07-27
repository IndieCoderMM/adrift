import EntryView from "@/components/entry-view";

const EntryDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <main>
      <EntryView id={id} />
    </main>
  );
};

export default EntryDetail;
