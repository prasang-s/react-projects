import HomeCTA from "./HomeCTA";

export default function ProjectContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode[];
}) {
  return (
    <div className="box my-6 is-shadowless">
      {/* title */}
      <div className="block is-flex is-align-items-center is-gap-2">
        <HomeCTA />
        <h1 className="title is-4">{title}</h1>
      </div>

      {children}
    </div>
  );
}
