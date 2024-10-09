/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

export const useForm = (obj: any) => {
  const [data, setData] = useState(obj);
  const [changes, setChanges] = useState(false);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
    setChanges(true);
  };

  // const handleValue = (name:string,value:selectData | MultiValue<selectData> | null)=>{
  const handleValue = <T>(name: string, value: T | null) => {
    // setData({...data, [name]: value?.value ? value.value:value})
    setData({ ...data, [name]: value });
    setChanges(true);
  };

  const handleUpload = (name: string, value?: File) => {
    setData({ ...data, [name]: value });
    setChanges(true);
  };

  return {
    data,
    changes,
    setChanges,
    handleInput,
    handleUpload,
    handleValue,
    setData,
  };
};
