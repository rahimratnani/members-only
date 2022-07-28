export default function Message({ message, auth }) {
  return (
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
  );
}
