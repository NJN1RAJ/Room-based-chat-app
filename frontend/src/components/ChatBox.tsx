export default function ChatBox({ handleClick, reference }: any) {
  return (
    <div className="flex justify-center">
      <input
        ref={reference}
        type="text"
        placeholder="Type your message here"
        className="w-96 rounded-l-full p-2 mt-2 border-2 pl-4"
      />
      <button
        onClick={handleClick}
        className="bg-indigo-400 cursor-pointer hover:bg-indigo-600 rounded-r-full w-20 border-2 border-l-0 p-2 mt-2"
      >
        Send
      </button>
    </div>
  );
}
