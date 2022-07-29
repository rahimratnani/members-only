import HeartIcon from './../assets/icons/HeartIcon.js';
import GithubIcon from './../assets/icons/GithubIcon.js';

export default function Footer() {
  return (
    <div className="flex space-x-2 justify-center items-center py-8 bg-white font-medium absolute left-0 bottom-0 w-full text-center text-gray-700 text-sm sm:text-base border-t">
      <p>Made with </p>
      <span>
        <HeartIcon className="text-red-600" />
      </span>
      <p>by Rahim Ratnani.</p>
      <a
        href="##"
        className="flex justify-center items-center space-x-2 hover:underline"
      >
        <span>GitHub</span>
        <GithubIcon className="h-6 w-6 text-gray-800" />
      </a>
    </div>
  );
}
