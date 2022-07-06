export default function Navbar() {
  return (
    <nav className="bg-gray-200 flex justify-between h-10 items-center px-4">
      <h1 className="text-2xl font-bold">Members Only</h1>

      <ul className="flex gap-4">
        <li>
          <a href="##">Messages</a>
        </li>
        <li>
          <a href="##">Sign In</a>
        </li>
        <li>
          <a href="##">Sign Up</a>
        </li>
      </ul>
    </nav>
  );
}
