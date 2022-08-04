import TrashIcon from '../../assets/icons/TrashIcon.js';

export default function Message({ message, auth }) {
  return (
    <article className="border rounded-md p-6 shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="capitalize font-bold text-xl text-gray-700 truncate">
          {message?.title}
        </h3>

        {auth?.isAuth && auth?.is_admin ? (
          <button
            type="button"
            disabled={false}
            className="rounded text-gray-700 p-1 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset disabled:cursor-not-allowed disabled:ring-2 disabled:ring-gray-400 disabled:text-gray-400"
          >
            <TrashIcon className="h-7 w-7" />
          </button>
        ) : null}
      </div>

      {auth?.isAuth && auth?.is_member ? (
        <div className="mt-2 space-y-1">
          <p className="text-gray-500 text-sm">
            by{' '}
            <span className="font-medium text-gray-800 capitalize">
              {message?.author.name}
            </span>
          </p>

          <p className="text-gray-500 text-sm">
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'full',
              timeStyle: 'short',
            }).format(new Date(message?.createdAt))}
          </p>
        </div>
      ) : null}

      <div className="pt-4 text-gray-900 text-base">
        <p>
          {message?.message
            ? message.message[0].toUpperCase() + message.message.slice(1)
            : ''}
        </p>
      </div>

      {!auth?.is_member && (
        <div className="pt-4 mt-4 border-t">
          <p className="text-gray-500 text-sm">
            <span className="text-gray-700 font-medium">Note: </span>Become a
            member to know who wrote this message and when.
          </p>
        </div>
      )}
    </article>
  );
}

/* 

<article className="border mb-4">
      <h3 className="font-bold text-lg">{message.title}</h3>

      <p>
        Created By:{' '}
        {auth?.is_member
          ? message?.author.name
          : 'Become a member to know who created this message!'}
      </p>

      <p>
        Created At:{' '}
        {new Intl.DateTimeFormat('en-US', {
          dateStyle: 'full',
          timeStyle: 'short',
        }).format(new Date(message.createdAt))}
      </p>

      <div className="mt-4">
        <p>{message.message}</p>
      </div>
    </article>
*/
