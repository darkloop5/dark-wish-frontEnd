import { message, Modal, Select, Skeleton } from "antd";
import { ArrowLeft, ArrowRight, Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import bkashIcon from "../../assets/icons/bkash.svg";
import nagadIcon from "../../assets/icons/nagad.png";
import rocketIcon from "../../assets/icons/rocket.png";
import { useGetNumbersByUserQuery } from "../../redux/services/number/numberApiService ";
import {
  useAddTransactionMutation,
  useGetTransactionsQuery,
} from "../../redux/services/transaction/transactionApiService";
import useAuthData from "../../hooks/useAuthData";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GrFormAdd } from "react-icons/gr";

const Details = () => {
  const [open, setOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState(null);
  const [walletType, setWalletType] = useState(null);
  const { user } = useAuthData();
  const navigate = useNavigate();
  const userId = user?.userId;
  const { data, isLoading, refetch } = useGetNumbersByUserQuery(userId);

  const [addTransaction, { isLoading: addLoading }] =
    useAddTransactionMutation();
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
    },
  });

  const onSubmit = async (formData) => {
    const { transactionType, amount } = formData;

    // ======================
    // VALIDATION
    // ======================

    if (!accountNumber) {
      return message.error("একটি অ্যাকাউন্ট নাম্বার নির্বাচন করুন");
    }

    if (!walletType) {
      return message.error(" ওয়ালেট টাইপ নির্বাচন করুন (bKash / Nagad)");
    }

    if (!transactionType) {
      return message.error(" ট্রানজেকশন টাইপ নির্বাচন করুন");
    }

    if (!amount) {
      return message.error("অ্যামাউন্ট দেওয়া বাধ্যতামূলক");
    }

    const submitData = {
      walletType,
      accountNumber,
      transactionType,
      amount: Number(amount),
      userId,
    };

    try {
      const res = await addTransaction(submitData).unwrap();

      if (res?.success) {
        message.success({
          content: "ট্রানজেকশন সফলভাবে যোগ করা হয়েছে 🎉",
          duration: 2,
          style: {
            marginTop: "20vh",
            fontWeight: "bold",
          },
        });

        setWalletType(null);
        setAccountNumber(null);
        reset();
        setOpen(false);
        refetch();
      } else {
        message.error("ট্রানজেকশন যোগ করা যায়নি");
      }
    } catch (error) {
      message.error(
        error?.data?.message || "সার্ভার সমস্যা হয়েছে, আবার চেষ্টা করুন",
      );
    }
  };

  

  // ======================
  // OPEN MODAL
  // ======================
  const openModal = (accountNumber) => {
    setOpen(true);
    setAccountNumber(accountNumber);
  };

  const handletr = (tx) => {
    navigate(`/transaction/${tx._id}`, {
      state: {
        accountNumber: tx.accountNumber,
        walletType: tx.walletType,
      },
    });
  };
  const typesTR = [
    { value: "send_money", label: "Send Money" },
    { value: "cash_out", label: "Cash Out" },
  ];

 

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-[#edf7ee] via-[#f7fff8] to-[#dcefdc]">
      {/* HEADER */}
      <div className="sticky top-0 z-20 h-16 flex items-center justify-center bg-white/20 backdrop-blur-3xl border-b border-white/30">
        <button
          onClick={() => navigate(-1)}
          className=" cursor-pointer absolute shadow-xl left-4 w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-[#4f772d]"
        >
          <ArrowLeft size={22} />
        </button>

        <h1 className="text-xl font-black text-[#2f5233]">Transaction</h1>

        {/* <button
          onClick={openModal}
          className="absolute right-4 h-11 px-4 rounded-2xl cursor-pointer
                  bg-gradient-to-r from-[#6a994e] to-[#4f772d]
                  text-white font-bold text-sm flex items-center gap-2"
        >
          <Plus size={18} />
          Submit
        </button> */}
      </div>

      {/* TRANSACTION LIST */}
      {/* LOADING SKELETON */}
      {isLoading ? (
        <div className="px-4 pt-4 pb-24 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="relative p-4 rounded-2xl 
        bg-white/20 backdrop-blur-2xl
        border border-white/30
        shadow-[0_0_20px_rgba(106,153,78,0.2)]"
            >
              {/* glow line */}
              <div className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b from-[#6a994e] to-[#4f772d]" />

              <div className="pl-3 flex justify-between items-center">
                {/* LEFT */}
                <div className="space-y-2">
                  <Skeleton.Input
                    active
                    size="small"
                    style={{
                      width: 120,
                      height: 16,
                      borderRadius: 8,
                    }}
                  />
                  <Skeleton.Input
                    active
                    size="small"
                    style={{
                      width: 160,
                      height: 12,
                      borderRadius: 8,
                    }}
                  />
                </div>

                {/* RIGHT */}
                <div className="space-y-2 text-right">
                  <Skeleton.Input
                    active
                    size="small"
                    style={{
                      width: 80,
                      height: 18,
                      borderRadius: 8,
                    }}
                  />
                  <Skeleton.Input
                    active
                    size="small"
                    style={{
                      width: 100,
                      height: 12,
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="px-4 pt-4 pb-24 overflow-y-auto h-[calc(100vh-64px)]">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton.Input key={i} active block size="large" />
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {data?.data?.map((tx) => (
              <div
                key={tx._id}
                className="relative rounded-2xl py-3 px-3
      bg-white/20 backdrop-blur-2xl
      border border-white/30
      shadow-[0_0_20px_rgba(106,153,78,0.25)]
      hover:shadow-[0_0_30px_rgba(106,153,78,0.4)]
      transition-all duration-300"
              >
                {/* TOP SECTION */}
                <div className="flex justify-between items-center ">
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <div
                        className={`absolute inset-0 rounded-full blur-xl ${
                          tx.walletType === "bkash"
                            ? "bg-pink-400/40"
                            : tx.walletType === "nagad"
                              ? "bg-orange-400/40"
                              : "bg-blue-400/40"
                        }`}
                      />

                      <img
                        src={
                          tx.walletType === "bkash"
                            ? bkashIcon
                            : tx.walletType === "nagad"
                              ? nagadIcon
                              : rocketIcon
                        }
                        alt="wallet"
                        className="w-10 relative z-10 drop-shadow-lg"
                      />
                    </div>

                    <div>
                      <h2 className="font-bold text-[#2f5233]">
                        {tx.accountNumber}
                      </h2>
                      <p className="text-xs text-gray-500 capitalize">
                        {tx.walletType}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex items-center justify-end">
                    <div className="relative">
                      {/* glow layer */}
                      <div className="absolute inset-0 rounded-full bg-[#6a994e] blur-xl opacity-40 animate-pulse" />

                      {/* button */}
                      <div
                        onClick={() => {
                          handletr(tx);
                        }}
                        className="relative w-7 h-7 flex items-center justify-center rounded-full
      bg-gradient-to-br from-[#6a994e] to-[#4f772d]
      shadow-lg cursor-pointer hover:scale-110 transition"
                      >
                        <ArrowRight className="text-white w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 🔥 LIMIT SECTION (NEW) */}
                <div className=" grid grid-cols-2  text-xs text-gray-600 justify-between relative">
                  <div className="bg-white/30 rounded-lg p-2">
                    <p className="font-semibold">Send Today</p>
                    <p className="font-bold text-red-600 text-base">
                      ৳{tx.send_money_day || 0}
                    </p>
                  </div>

                  <div className="bg-white/30 rounded-lg p-2  ">
                    <p className="font-semibold">Send Month</p>
                    <p className="font-bold text-base  ">
                      ৳{tx.send_money_month || 0}
                    </p>
                  </div>

                  <div className="bg-white/30 rounded-lg p-2">
                    <p className="font-semibold ">Cashout Today</p>
                    <p className="font-bold text-base  text-red-600">
                      ৳{tx.cash_out_day || 0}
                    </p>
                  </div>

                  <div className="bg-white/30 rounded-lg p-2">
                    <p className="font-semibold">Cashout Month</p>
                    <p className="font-bold text-base ">
                      ৳{tx.cash_out_month || 0}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end h-2">
                  <div
                    onClick={() => {
                      openModal(tx.accountNumber);
                      setWalletType(tx.walletType);
                    }}
                    className="relative w-9 h-9 flex items-center justify-center rounded-full
      bg-gradient-to-br from-[#6a994e] to-[#4f772d]
      shadow-lg cursor-pointer hover:scale-110 transition"
                  >
                    <GrFormAdd className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* MODAL */}
      <Modal
        title={<span className="text-[#2f5233] font-bold"></span>}
        width={350}
        open={open}
        onCancel={() => {
          setOpen(false);
          accountNumber(null);
        }}
        footer={null}
        centered
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <h2 className="font-bold text-sm mb-1">
              Type 💸 (Send Money / Cash Out)
            </h2>
            <Select
              value={watch("transactionType")}
              onChange={(value) => setValue("transactionType", value)}
              className="w-full"
              size="large"
            >
              {typesTR.map((item) => (
                <Option key={item.value} value={item.value}>
                  <span className="font-semibold">{item.label}</span>
                </Option>
              ))}
            </Select>
          </div>

          {/* ACCOUNT */}
          <div>
            <h2 className="font-bold text-sm mb-1">Amount</h2>

            <input
              type=""
              placeholder="Enter amount"
              {...register("amount", {
                required: "Amount is required",
                min: {
                  value: 1,
                  message: "Minimum amount is 1",
                },
              })}
              className="w-full px-3 font-semibold py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6a994e]"
            />
          </div>
          {/* SUBMIT */}
          <button
            type="submit"
            disabled={addLoading}
            className="h-11 w-full cursor-pointer rounded-2xl bg-gradient-to-r from-[#6a994e] to-[#4f772d] text-white font-bold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {addLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Plus size={18} />
                Submit
              </>
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Details;
