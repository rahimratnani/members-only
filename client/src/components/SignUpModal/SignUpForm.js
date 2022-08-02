import XIcon from '../../assets/icons/XIcon.js';
import CircleCheckIcon from '../../assets/icons/CircleCheckIcon.js';
import CircleXIcon from '../../assets/icons/CircleXIcon.js';

export default function SignUpForm({
  signupSuccess,
  handleOnClose,
  handleSubmit,
  onSubmit,
  register,
  errors,
  setSignupSuccess,
  signupError,
}) {
  return signupSuccess ? (
    <div className="h-[250px] flex flex-col justify-center items-center space-y-5">
      <div className="flex justify-center items-center">
        <CircleCheckIcon className="h-14 w-14 fill-indigo-500" />
      </div>

      <div className="flex justify-center items-center">
        <p className="text-gray-700 font-bold text-xl">
          Signed Up Successfully!
        </p>
      </div>

      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={handleOnClose}
          className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  ) : signupSuccess === false ? (
    <div className="h-[250px] flex flex-col justify-center items-center space-y-5">
      <div className="flex justify-center items-center">
        <CircleXIcon className="h-14 w-14 fill-red-500" />
      </div>

      <div className="flex justify-center items-center">
        <p className="text-gray-700 font-bold text-xl">{signupError}</p>
      </div>

      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={() => setSignupSuccess(null)}
          className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Try Again
        </button>
      </div>
    </div>
  ) : (
    <>
      <div>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div>
            <label
              className="block text-sm font-medium text-gray-700 text-left"
              htmlFor="name"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                {...register('name')}
                type="text"
                id="name"
                autoComplete="name"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              {errors.name && (
                <p className="text-red-500 text-xs  text-left mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 text-left"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                {...register('email')}
                type="email"
                id="email"
                autoComplete="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              {errors.email && (
                <p className="text-red-500 text-xs  text-left mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 text-left"
              htmlFor="password"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                {...register('password')}
                type="password"
                id="password"
                autoComplete="new-password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              {errors.password && (
                <p className="text-red-500 text-xs  text-left mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 text-left"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                {...register('confirmPassword')}
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-xs  text-left mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-center items-center absolute right-4 top-4">
        <button
          onClick={handleOnClose}
          type="button"
          className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset rounded-md"
        >
          <XIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </>
  );
}
