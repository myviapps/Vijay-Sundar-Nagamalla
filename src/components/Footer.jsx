export default function Footer({ profile }) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>
        © {year} {profile.name} · Educator & Self-Taught AI Developer ·{' '}
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>
    </footer>
  );
}
