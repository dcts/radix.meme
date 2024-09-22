import CreateCoinForm from "@/components/CreateCoinForm";

const page = () => {
  return (
    <div className="font-[family-name:var(--font-geist-mono)]">
      <h1 className="mb-8 text-center max-w-sm text-2xl font-black">
        Create your token
      </h1>
      <CreateCoinForm />
    </div>
  );
};

export default page;
