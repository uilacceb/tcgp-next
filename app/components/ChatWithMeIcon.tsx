import Link from "next/link";

const ChatWithMeIcon = () => {
  return (
    <Link href="/search">
      <div className="w-fit flex flex-col items-start">
        <p className="font-bold text-xs md:text-xl ">Chat with me?</p>
        <img
          src="/icons/professor-oak.png"
          alt="Professor Oak"
          className="md:h-40 h-20 self-end"
        />
      </div>
    </Link>
  );
};

export default ChatWithMeIcon;
