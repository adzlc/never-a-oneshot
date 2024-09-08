export default async function CentreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-7xl max-w-7xl grow flex-col sm:flex-row sm:py-6">
      {children}
    </div>
  );
}