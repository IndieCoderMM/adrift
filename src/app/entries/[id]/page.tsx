import EntryView from "@/components/entry-view";

const EntryDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      <EntryView id={id} />
    </div>
  );
};

export default EntryDetail;
