import Image from "next/image";
import Logo from "@/public/svgs/auth/vamp-logo.svg";
import SignInForm from "@/components/auth/SignInForm";
import TextBox from "@/components/auth/TextBox";

const SignIn = () => {
  return (
    <div className="mx-auto flex flex-col py-10 px-6 lg:px-16 w-[600px]">
      <Image
        src={Logo}
        height={1000}
        width={1000}
        alt="patient"
        className="h-10 w-fit"     
      />

      <div className="mt-20">
        <TextBox
          title="Welcome back"
          description="Login to unlock the power of AI in finding top talent and transforming your hiring process."
          variant="mt-0 text-center justify-center items-center"
        />

        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
