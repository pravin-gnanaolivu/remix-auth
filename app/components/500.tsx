export const ErrorComponent = ({ error }: { error: Error }) => {
  return (
    <div className="flex">
      <div className="w-1/2 p-6">
        <img src="img/error/500.png" alt="404" className="w-50 h-50" />
      </div>
      <div className="flex justify-center flex-col p-6">
        <h1 className="text-4xl">{error.name}: </h1>
        <h1 className="text-4xl">{error.message}</h1>
      </div>
    </div>
  );
};
