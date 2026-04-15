export default function Footer({ profile }) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>
        © {year} {profile.name} · AI Developer · Full Stack Engineer ·{' '}
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>
    </footer>
  );
}
