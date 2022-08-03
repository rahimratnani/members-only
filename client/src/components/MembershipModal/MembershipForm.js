import XIcon from '../../assets/icons/XIcon.js';
import CircleCheckIcon from '../../assets/icons/CircleCheckIcon.js';
import CircleXIcon from '../../assets/icons/CircleXIcon.js';

export default function MembershipForm({
  handleOnClose,
  handleSubmit,
  onSubmit,
  register,
  errors,
  success,
  setSuccess,
  joiningError,
}) {
  return success ? (
    <div className="h-[200px] flex flex-col justify-center items-center space-y-4">
      <div className="flex justify-center items-center">
        <CircleCheckIcon className="h-14 w-14 fill-indigo-500" />
      </div>

      <div className="flex justify-center items-center">
        <p className="text-gray-700 font-bold text-xl">Welcome To The Club!</p>
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
  ) : success === false ? (
    <div className="h-[200px] flex flex-col justify-center items-center space-y-4">
      <div className="flex justify-center items-center">
        <CircleXIcon className="h-14 w-14 fill-red-500" />
      </div>

      <div className="flex justify-center items-center">
        <p className="text-gray-700 font-bold text-xl">{joiningError}</p>
      </div>

      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={() => setSuccess(null)}
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
              className="block text-xl font-bold text-gray-700 text-center"
              htmlFor="secret"
            >
              Enter The Secret
            </label>
            <div className="mt-6">
              <input
                {...register('secret')}
                type="text"
                id="secret"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              {errors.secret && (
                <p className="text-red-500 text-xs  text-left mt-1">
                  {errors.secret.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join
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
