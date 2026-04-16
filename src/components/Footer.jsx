export default function Footer({ profile }) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>
        © {year} {profile.name} · Educator & AI Developer ·{' '}
        <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a> ·{' '}
        <a href={`mailto:${profile.email}`}>Email</a>
      </p>
    </footer>
  );
}
