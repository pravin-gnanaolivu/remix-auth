import { useParams } from "@remix-run/react";

export default function NotFound() {
  const params = useParams();
  return (
    <div className="flex">
      <div className="w-1/2 p-6">
        <img src="img/error/404.png" alt="404" className="w-50 h-50" />
      </div>
      <div className="flex justify-center flex-col p-6">
        <h1 className="text-4xl">
          The Page with the slug "{params.slug}" was not found. Sorry 😒
        </h1>
      </div>
    </div>
  );
}
