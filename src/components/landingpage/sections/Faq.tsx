import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/landingpage";


const Faq = () => {
  return (
    <Container>
      <div className="space-y-4">
        <div className="text-[20px] lg:text-[40px] font-medium text-[#001633] w-full lg:w-[326px]">
          Frequently Asked Questions
        </div>
        <Accordion type="single" collapsible className="w-full">
          {/* FAQ Item 1 */}
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold text-sec-901 flex-1">
              <div className="flex gap-5 lg:gap-10">
                <span className="text-lg font-medium text-neutral-500">01</span>
                <span className="text-lg font-bold text-gray-700">
                  What is VampAI?
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <p className="text-sm mt-2 text-gray-600">
                VampAI is a Resume builder powered by Artificial Intelligence
                developed to empower ambitious professionals across the globe by
                crafting compelling CVs, unlocking their career potential, and
                securing jobs they love.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 2 */}
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold text-sec-901 flex-1">
              <div className="flex gap-5 lg:gap-10">
                <span className="text-lg font-medium text-neutral-500">02</span>
                <span className="text-lg font-bold text-gray-700">
                  Which of VampAI template is good for me?
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <p className="text-sm mt-2 text-gray-600">
                VampAI is a Resume builder powered by Artificial Intelligence
                developed to empower ambitious professionals across the globe by
                crafting compelling CVs, unlocking their career potential, and
                securing jobs they love.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 3 */}
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold text-sec-901 flex-1">
              <div className="flex gap-5 lg:gap-10">
                <span className="text-lg font-medium text-neutral-500">03</span>
                <span className="text-lg font-bold text-gray-700">
                  What makes a good Resume?
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <p className="text-sm mt-2 text-gray-600">
                VampAI is a Resume builder powered by Artificial Intelligence
                developed to empower ambitious professionals across the globe by
                crafting compelling CVs, unlocking their career potential, and
                securing jobs they love.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 4 */}
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold text-sec-901 flex-1">
              <div className="flex gap-5 lg:gap-10">
                <span className="text-lg font-medium text-neutral-500">04</span>
                <span className="text-lg font-bold text-gray-700">
                  Why should I tailor my Resume to each job application?
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <p className="text-sm mt-2 text-gray-600">
                VampAI is a Resume builder powered by Artificial Intelligence
                developed to empower ambitious professionals across the globe by
                crafting compelling CVs, unlocking their career potential, and
                securing jobs they love.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Container>
  );
};

export default Faq;
