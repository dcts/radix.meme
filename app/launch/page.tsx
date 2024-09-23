import CreateCoinForm from "@/components/CreateCoinForm";

const page = () => {
  return (
    <div className="font-[family-name:var(--font-londrina-solid)]">
      <h1 className="mb-8 text-center max-w-sm text-4xl font-black">
        Create your token
      </h1>
      <CreateCoinForm />
    </div>
  );
};

export default page;
