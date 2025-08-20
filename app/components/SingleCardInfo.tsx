"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

type SingleCardInfoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClick?: () => void;
};

const SingleCardInfo = ({ src, alt, width, height }: SingleCardInfoProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={() => setOpen(true)}
        className="aspect-[7/10] md:w-[150px] lg:w-[200px] 
                      relative z-[1]"
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity "
        />

        <div className="fixed inset-0 z-10 ">
          <div className="flex justify-center items-center min-h-full ">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all"
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                onClick={() => setOpen(true)}
                className="aspect-[7/10] w-[200px] md:w-[300px] lg:w-[400px] 
                          relative z-[1]"
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SingleCardInfo;
