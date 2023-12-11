"use client"


const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return <div className="h-screen bg-black text-white">error</div>;
};

export default Error;
