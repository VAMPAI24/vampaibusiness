import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/landingpage";
import { FaqItems } from "@/lib/data";

const Faq = () => {
  return (
    <Container>
      <div className="space-y-4">
        <div className="text-[20px] lg:text-[40px] font-medium text-[#001633] w-full lg:w-[326px]">
          Frequently Asked Questions
        </div>
        <Accordion type="single" collapsible className="w-full">
          {FaqItems.map((faq, id) => (
            <AccordionItem value="item-1" key={id.toString()} >
              <AccordionTrigger className="text-lg font-semibold text-sec-901 flex-1">
                <div className="flex gap-5 lg:gap-10">
                  <span className="text-lg font-medium text-neutral-500">
                    {faq.id}
                  </span>
                  <span className="text-lg font-bold text-gray-700">
                    {faq.title}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <p className="text-sm mt-2 text-gray-600">{faq.body}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
};

export default Faq;
