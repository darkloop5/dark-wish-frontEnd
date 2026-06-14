import Modal from "antd/es/modal/Modal";
import { ArrowLeft, Loader2, Plus, Wallet2 } from "lucide-react";
import React, { useState } from "react";
import useAuthData from "../../hooks/useAuthData";
import { Controller, useForm } from "react-hook-form";
import { Input, message, Select } from "antd";
import {
  useAddReceivedMutation,
  useGetReceivedQuery,
} from "../../redux/services/received/ReceivedApiServices";
import bkashIcon from "../../assets/icons/bkash.svg";
import nagadIcon from "../../assets/icons/nagad.png";
import rocketIcon from "../../assets/icons/rocket.png";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const Receive = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("day");
  const { user } = useAuthData();

  const [addReceived, { isLoading: addLoading }] = useAddReceivedMutation();
  const { data: receivedData, isLoading } = useGetReceivedQuery(
    {
      userId: user?.userId || "",
      filter,
    },
    {
      skip: !user?.userId,
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      walletType: "bkash",
      accountNumber: "",
      amount: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const payload = {
        accountNumber: formData.accountNumber,
        amount: Number(formData.amount),
        userId: user?.userId,
        walletType: formData.walletType,
      };

      const res = await addReceived(payload).unwrap();

      if (res?.success) {
        message.success("Received added successfully 🎉");

        reset({
          walletType: "bkash",
          accountNumber: "",
          amount: "",
        });

        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  const openModal = () => {
    reset({
      walletType: "bkash",
      accountNumber: "",
      amount: "",
    });

    setOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#edf7ee] via-[#f7fff8] to-[#dcefdc]">
      {/* GLOW */}
      <div className="absolute top-[-120px] right-[-100px] w-72 h-72 bg-[#6a994e]/20 blur-[100px] rounded-full"></div>

      <div className="absolute bottom-[-120px] left-[-100px] w-72 h-72 bg-[#4f772d]/20 blur-[100px] rounded-full"></div>

      {/* HEADER */}
      <div className="sticky top-0 z-20 h-16 flex items-center justify-center bg-white/20 backdrop-blur-3xl border-b border-white/30 px-4">
         <button onClick={() => navigate(-1)} className=" cursor-pointer absolute shadow-xl left-4 w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-[#4f772d]">
          <ArrowLeft size={22} />
        </button>

        <h1 className="text-xl font-black text-[#2f5233] tracking-wide">
          Receive
        </h1>

        <button
          onClick={openModal}
          className="absolute right-4 h-11 px-4 rounded-2xl cursor-pointer
          bg-gradient-to-r from-[#6a994e] to-[#4f772d]
          text-white font-bold text-sm flex items-center gap-2
          shadow-lg shadow-green-700/20 hover:scale-105 duration-300"
        >
          <Plus size={18} />
          Receive
        </button>
      </div>
      <div>
        <h1 className="text-xl font-black text-red-600 tracking-wide text-center pt-1">
          Total : ৳ {receivedData?.totalAmount || 0}
        </h1>
      </div>

      <div className="flex justify-center  mt-2">
        <div
          className="flex gap-2 p-1 rounded-2xl
    bg-white/20 backdrop-blur-3xl
    border border-white/30
    shadow-[0_8px_30px_rgb(0,0,0,0.08)]
    relative overflow-hidden"
        >
          {/* GLOW */}
          <div className="absolute inset-0 bg-[#6a994e]/10 blur-2xl" />

          {/* DAILY */}
          <button
            onClick={() => {
              setFilter("day");
            }}
            className={`relative px-5 cursor-pointer py-2 rounded-xl font-bold text-sm transition ${
              filter === "day"
                ? "bg-gradient-to-r from-[#6a994e] to-[#4f772d] text-white shadow-lg"
                : "text-[#2f5233]"
            }`}
          >
            Daily
          </button>

          {/* MONTHLY */}
          <button
            onClick={() => {
              setFilter("all");
            }}
            className={`relative px-5 py-2 cursor-pointer rounded-xl font-bold text-sm transition ${
              filter === "all"
                ? "bg-gradient-to-r from-[#6a994e] to-[#4f772d] text-white shadow-lg"
                : "text-[#2f5233]"
            }`}
          >
            All
          </button>
        </div>
      </div>

{isLoading && (
  <div className="space-y-3 mt-3">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="relative overflow-hidden rounded-3xl
        bg-white/20 backdrop-blur-2xl
        border border-white/30
        p-4"
      >
        {/* glow */}
        <div className="absolute inset-0 bg-[#6a994e]/10 blur-2xl" />

        <div className="relative flex items-center justify-between animate-pulse">
          
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#6a994e]/20" />

            <div className="space-y-2">
              <div className="w-20 h-3 bg-[#2f5233]/20 rounded-full" />
              <div className="w-28 h-2 bg-[#2f5233]/10 rounded-full" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-2 text-right">
            <div className="w-16 h-2 bg-[#2f5233]/10 rounded-full ml-auto" />
            <div className="w-12 h-2 bg-[#2f5233]/10 rounded-full ml-auto" />
          </div>
        </div>
      </div>
    ))}
  </div>
)}
      {/* CONTENT */}
      <div className="px-4 pt-2 pb-24">
        {/* LOADING */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-24 rounded-3xl
          bg-white/40 backdrop-blur-3xl
          border border-white/40
          animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && receivedData?.data?.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20
      rounded-[32px] bg-white/10 backdrop-blur-3xl
      border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
          >
            {/* EMOJI */}
            <div className="relative mb-2">
              <div className="absolute inset-0 bg-[#6a994e]/20 blur-3xl rounded-full" />

              <div className="relative text-7xl animate-bounce">😔</div>
            </div>

            <h2 className="text-base mb-2 font-black text-[#2f5233]">
              এখনো টাকা রিসিভ করা হয়নি
            </h2>

            {/* SUBMIT */}
            <button
              onClick={openModal}
              className="h-11 px-12  cursor-pointer rounded-2xl bg-gradient-to-r from-[#6a994e] to-[#4f772d] text-white font-bold flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {addLoading ? "Saving..." : "Add Receive"}
            </button>
          </div>
        )}

        {/* RECEIVE CARD */}
        {!isLoading &&
          receivedData?.data?.map((item) => (
            <div
              key={item?._id}
              className="relative mb-3 overflow-hidden
        rounded-3xl
        bg-white/35
        backdrop-blur-3xl
        border border-white/40
        shadow-xl p-4"
            >
              {/* GLOW */}
              <div
                className="absolute top-0 right-0 w-24 h-24
          bg-[#6a994e]/10 blur-3xl rounded-full"
              ></div>

              <div className="relative flex items-center justify-between">
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div
                      className={`absolute inset-0 rounded-full blur-xl ${
                        item.walletType === "bkash"
                          ? "bg-pink-400/40"
                          : "bg-orange-400/40"
                      }`}
                    />

                   <img
  src={
    item.walletType === "bkash"
      ? bkashIcon
      : item.walletType === "nagad"
      ? nagadIcon
      : rocketIcon
  }
  alt="wallet"
  className={`w-auto relative z-10 drop-shadow-lg ${
    item.walletType === "nagad" || item.walletType === "rocket"
      ? "h-auto"
      : "h-10"
  }`}
/>
                  </div>

                  <div>
                    <h2 className="font-black text-[#2f5233] text-lg">
                      ৳ {item?.amount}
                    </h2>

                    <p className="text-[#5c745f] font-semibold text-[15px]">
                      {item?.accountNumber}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <span
                    className="px-3 py-1 rounded-full
              bg-[#6a994e]/10
              text-[#4f772d]
              text-xs font-bold"
                  >
                    Received
                  </span>

                  <p className="text-xs text-[#7d8f80] mt-3 font-semibold">⏰ {item?.time}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* MODAL */}
      <Modal
        title={
          <span className="text-[#2f5233] font-black text-lg">Add Receive</span>
        }
        width={360}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* WALLET */}
          <div>
            <h2 className="font-bold text-sm mb-2 text-[#2f5233]">
              Wallet Type
            </h2>

            <Select
              value={watch("walletType")}
              onChange={(value) => setValue("walletType", value)}
              className="w-full"
              size="large"
            >
              <Option value="bkash">bKash</Option>
              <Option value="nagad">Nagad</Option>
              <Option value="rocket">Rocket</Option>
            </Select>
          </div>

          {/* ACCOUNT */}
          <div>
            <h2 className="font-bold text-sm mb-2 text-[#2f5233]">
              Account Number
            </h2>

            <Controller
              name="accountNumber"
              control={control}
              rules={{
                required: "Account required",
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "Invalid BD number",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="01XXXXXXXXX"
                  size="large"
                  maxLength={11}
                  className="rounded-2xl"
                />
              )}
            />

            {errors.accountNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.accountNumber.message}
              </p>
            )}
          </div>

          {/* AMOUNT */}
          <div>
            <h2 className="font-bold text-sm mb-2 text-[#2f5233]">Amount</h2>

            <input
              type="number"
              placeholder="Enter amount"
              {...register("amount", {
                required: "Amount is required",
                min: {
                  value: 1,
                  message: "Minimum amount is 1",
                },
              })}
              className="w-full px-4 py-3 rounded-2xl
              border border-gray-200
              bg-[#f9fffa]
              font-semibold
              focus:outline-none
              focus:ring-2
              focus:ring-[#6a994e]"
            />

            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={addLoading}
            className="h-12 w-full rounded-2xl
            bg-gradient-to-r from-[#6a994e] to-[#4f772d]
            text-white font-bold
            flex items-center justify-center gap-2
            shadow-lg shadow-green-700/20
            hover:scale-[1.02] duration-300
            cursor-pointer"
          >
            <Plus size={18} />

            {addLoading ? "Saving..." : "Add Receive"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Receive;
