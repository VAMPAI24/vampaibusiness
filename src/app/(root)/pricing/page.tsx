// "use client";
// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Image from "next/image";
// import NGN from "@/public/svgs/pricing/ngn.svg";
// import USD from "@/public/svgs/pricing/usd.svg";
// import GBP from "@/public/svgs/pricing/gbp.svg";
// import EUR from "@/public/svgs/pricing/eur.svg";
// import AED from "@/public/svgs/pricing/aed.svg";
// import { useGetPlanQuery } from "@/redux/features/pricing/pricingApi";
// import { BallsLoader } from "@/components/ui/BallsLoader";

// type Country = "NGN" | "EUR" | "USD" | "GBP" | "AED";
// type BillingCycle = "monthly" | "yearly";

// const countryFlags: Record<Country, string> = {
//   USD: USD,
//   GBP: GBP,
//   EUR: EUR,
//   NGN: NGN,
//   AED: AED,
// };

// const currencySymbols: Record<Country, string> = {
//   USD: "$",
//   GBP: "£",
//   EUR: "€",
//   NGN: "₦",
//   AED: "AED",
// };

// const Pricing = () => {
//   const [country, setCountry] = useState<Country>("NGN");
//   const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

//   const { data: plans, isLoading: planLoading } = useGetPlanQuery({
//     currency: country,
//   });

//   const getPrice = (fixedPrices: Record<string, number>) => {
//     const price = fixedPrices[country];
//     return billingCycle === "yearly" ? price * 10 : price;
//   };

//   return (
//     <div className="w-full max-w-5xl mx-auto p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold">Choose Your Payment Plan</h1>

//         <Select onValueChange={(value) => setCountry(value as Country)} value={country}>
//           <SelectTrigger className="w-32 flex items-center border border-gray-300 rounded-md px-3 py-2">
//             <SelectValue>
//               <div className="flex items-center gap-2">
//                 <Image src={countryFlags[country]} alt={`${country} flag`} width={20} height={20} />
//                 {country}
//               </div>
//             </SelectValue>
//           </SelectTrigger>
//           <SelectContent>
//             {Object.keys(countryFlags).map((c) => (
//               <SelectItem key={c} value={c}>
//                 <div className="flex items-center gap-2">
//                   <Image src={countryFlags[c as Country]} alt={`${c} flag`} width={20} height={20} />
//                   {c}
//                 </div>
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="flex justify-center mb-6">
//         <button
//           className={`px-4 py-2 rounded-l-lg ${billingCycle === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//           onClick={() => setBillingCycle("monthly")}
//         >
//           Monthly
//         </button>
//         <button
//           className={`px-4 py-2 rounded-r-lg ${billingCycle === "yearly" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//           onClick={() => setBillingCycle("yearly")}
//         >
//           Yearly
//         </button>
//       </div>

//       <div>
//         {planLoading && (
//           <div className="w-full h-[10em] flex flex-col items-center justify-center gap-[.5em]">
//             <BallsLoader />
//             <p className="text-[.875em] text-main-900 text-center">
//               Loading candidates...
//             </p>
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
//         {plans?.data.map((plan: any) => (
//           <Card
//             key={plan.productPlan}
//             className={`p-6 rounded-lg shadow-lg text-center border ${
//               plan.productPlan === "Enterprise Plan" ? "bg-blue-600 text-white" : "border-gray-200"
//             }`}
//           >
//             <h2 className="text-xl font-bold">{plan.productPlan}</h2>
//             <p className="text-3xl font-bold my-4">
//               {planLoading ? (
//                 <span className="inline-block w-24 h-8 bg-gray-200 animate-pulse">djfjdfjdfjfdjjjfdjfdjfdjfdj</span>
//               ) : (
//                 <>
//                   {currencySymbols[country]}
//                   {getPrice(plan.fixedPrices)}
//                 </>
//               )}
//             </p>
//             <p className="text-sm mb-4">{plan.productDescription}</p>
//             <ul className="space-y-2 text-sm mb-6">
//               {plan.productFeature.map((feature: any, index: any) => (
//                 <li key={index} className=" gap-2">
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//             <button
//               className={`w-full py-2 rounded-lg font-medium transition ${
//                 plan.productPlan === "Basic Plan" ? "mt-[105px]" : ""
//               } ${
//                 plan.productPlan === "Enterprise Plan"
//                   ? "bg-white text-blue-600"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               }`}
//             >
//               Purchase {plan.productPlan}
//             </button>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Pricing;

"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import NGN from "@/public/svgs/pricing/ngn.svg";
import USD from "@/public/svgs/pricing/usd.svg";
import GBP from "@/public/svgs/pricing/gbp.svg";
import EUR from "@/public/svgs/pricing/eur.svg";
import AED from "@/public/svgs/pricing/aed.svg";
import { useGetPlanQuery } from "@/redux/features/pricing/pricingApi";
import { BallsLoader } from "@/components/ui/BallsLoader";
import CustomModal from "@/components/shared/CustomModal";
import StripeWidget from "@/components/common/StripeWidget";

type Country = "NGN" | "EUR" | "USD" | "GBP" | "AED";
type BillingCycle = "monthly" | "yearly";

const countryFlags: Record<Country, string> = {
  USD: USD,
  GBP: GBP,
  EUR: EUR,
  NGN: NGN,
  AED: AED,
};

const currencySymbols: Record<Country, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  NGN: "₦",
  AED: "AED",
};

const Pricing = () => {
  const [country, setCountry] = useState<Country>("NGN");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: plans,
    isLoading: planLoading,
    refetch,
  } = useGetPlanQuery({
    currency: country,
  });

  useEffect(() => {
    if (loading) {
      refetch().finally(() => setLoading(false));
    }
  }, [country, refetch, loading]);

  const getPrice = (fixedPrices: Record<string, number>) => {
    const price = fixedPrices[country];
    return billingCycle === "yearly" ? price * 10 : price;
  };

  //Modal Control
  const [openModal, setOpenModal] = useState({
    value: false,
    amount: 0,
    product: "",
    plan: "",
  });

  let closeModal = () =>
    // setOpenModal({
    //   value: false,
    //   amount: 0,
    //   product: "",
    //   plan: "",
    // });


    setOpenModal({
      value: false,
      amount: 0,
      product: "",
      plan: "",
    });

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <CustomModal
        isOpen={openModal.value}
        onClose={closeModal}
        className={"w-[95%] md:max-w-lg"}
      >
        <StripeWidget
          email="sagafex187@jomspar.com"
          // amount={openModal.amount * 100}
          amount={14000000}
          product="business_products"
          currency={country}
          paymentPlan="subscription"
          interval={billingCycle}
          business_platform="business_products"
          onClose={closeModal}
        />
      </CustomModal>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Choose Your Payment Plan</h1>

        <Select
          onValueChange={(value) => {
            setCountry(value as Country);
            setLoading(true);
          }}
          value={country}
        >
          <SelectTrigger className="w-32 flex items-center border border-gray-300 rounded-md px-3 py-2">
            <SelectValue>
              <div className="flex items-center gap-2">
                <Image
                  src={countryFlags[country]}
                  alt={`${country} flag`}
                  width={20}
                  height={20}
                />
                {country}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.keys(countryFlags).map((c) => (
              <SelectItem key={c} value={c}>
                <div className="flex items-center gap-2">
                  <Image
                    src={countryFlags[c as Country]}
                    alt={`${c} flag`}
                    width={20}
                    height={20}
                  />
                  {c}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-l-lg ${
            billingCycle === "monthly"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setBillingCycle("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg ${
            billingCycle === "yearly" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setBillingCycle("yearly")}
        >
          Yearly
        </button>
      </div>

      <div>
        {planLoading && (
          <div className="w-full h-[10em] flex flex-col items-center justify-center gap-[.5em]">
            <BallsLoader />
            <p className="text-[.875em] text-main-900 text-center">
              Loading candidates...
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {plans?.data.map((plan: any) => (
          <Card
            key={plan.productPlan}
            className={`p-6 rounded-lg shadow-lg text-center border ${
              plan.productPlan === "Enterprise Plan"
                ? "bg-blue-600 text-white"
                : "border-gray-200"
            }`}
          >
            <h2 className="text-xl font-bold">{plan.productPlan}</h2>
            <p className="text-3xl font-bold my-4">
              {loading ? (
                <span className="inline-block w-24 h-8 bg-gray-200 animate-pulse"></span>
              ) : (
                <>
                  {currencySymbols[country]}
                  {getPrice(plan.fixedPrices)}
                </>
              )}
            </p>
            <p className="text-sm mb-4">{plan.productDescription}</p>
            <ul className="space-y-2 text-sm mb-6">
              {plan.productFeature.map((feature: any, index: any) => (
                <li key={index} className=" gap-2">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 rounded-lg font-medium transition ${
                plan.productPlan === "Basic Plan" ? "mt-[105px]" : ""
              } ${
                plan.productPlan === "Enterprise Plan"
                  ? "bg-white text-blue-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() =>
                setOpenModal({
                  value: true,
                  amount: getPrice(plan.fixedPrices),
                  product: plan.productDescription,
                  plan: plan.productPlan,
                })
              }
            >
              Purchase {plan.productPlan}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
