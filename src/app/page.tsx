import Link from "next/link";

const PROJECTS = [
  {
    title: "Kanban Board",
    url: "/kanban-board",
  },
];

export default function Home() {
  return (
    <div className="box my-6 is-border-2">
      <div className="block">
        <h1 className="title">React Projects</h1>
      </div>

      <div className="block">
        <ul>
          {PROJECTS.map(({ title, url }) => (
            <li key={title}>
              <Link href={url}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
