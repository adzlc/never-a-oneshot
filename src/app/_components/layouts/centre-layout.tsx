export default async function CentreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center mt-4 w-full">
      {children}
    </div>
  );
}