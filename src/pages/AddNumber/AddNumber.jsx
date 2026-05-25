import React, { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Modal, Input, Spin, message, Select } from "antd";
import { useForm, Controller } from "react-hook-form";

import bkashIcon from "../../assets/icons/bkash.svg";
import nagadIcon from "../../assets/icons/nagad.png";
import {
  useAddNumberMutation,
  useDeleteNumberMutation,
  useGetOnlyNumbersByUserQuery,
} from "../../redux/services/number/numberApiService ";
import useAuthData from "../../hooks/useAuthData";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddNumber = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthData();

  const { data, isLoading } = useGetOnlyNumbersByUserQuery(user?.userId);
  const [addNumber, { isLoading: addLoading }] = useAddNumberMutation();
  const [deleteNumber] = useDeleteNumberMutation();
 const navigate = useNavigate()
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

  const walletType = watch("walletType");

  // ======================
  // OPEN MODAL
  // ======================
  const openModal = () => {
    reset({
      walletType: "bkash",
      accountNumber: "",
    });
    setOpen(true);
  };

  // ======================
  // ADD NUMBER
  // ======================
  const onSubmit = async (formData) => {
    try {
      const res = await addNumber({
        walletType: formData.walletType,
        accountNumber: formData.accountNumber,
        userId: user?.userId,
      }).unwrap();

      message.success(res?.message || "Number added successfully 🎉📱");
      reset();
      setOpen(false);
    } catch (error) {
      message.error(error?.data?.message || "Failed to add number ❌");
    }
  };

  // ======================
  // DELETE
  // ======================
  const handleDelete = (id) => {
    Modal.confirm({
      title: "আপনি কি নিশ্চিত? ⚠️",
      content: "এই নম্বরটি স্থায়ীভাবে মুছে ফেলতে চান 🗑️",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      width: 320,

      onOk: async () => {
        try {
          const res = await deleteNumber(id).unwrap();
          message.success(res?.message || "Deleted successfully 🗑️");
        } catch (error) {
          message.error(error?.data?.message || "Delete failed ❌");
        }
      },
    });
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-[#edf7ee] via-[#f7fff8] to-[#dcefdc]">
      {/* HEADER */}
      <div className="sticky top-0 z-20 h-16 flex items-center justify-center bg-white/20 backdrop-blur-3xl border-b border-white/30">
        <button onClick={() => navigate(-1)} className=" cursor-pointer absolute shadow-xl left-4 w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-[#4f772d]">
          <ArrowLeft size={22} />
        </button>

        <h1 className="text-xl font-black text-[#2f5233]">Number List</h1>

        <button
          onClick={openModal}
          className="absolute right-4 h-11 px-4 rounded-2xl cursor-pointer
          bg-gradient-to-r from-[#6a994e] to-[#4f772d]
          text-white font-bold text-sm flex items-center gap-2"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="p-4 space-y-4">
        {isLoading ? (
          // ======================
          // SKELETON LOADER
          // ======================
          [...Array(4)].map((_, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between rounded-3xl py-3 px-4
        bg-white/10 backdrop-blur-2xl border border-white/20
        shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-pulse"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                {/* NUMBER */}
                <div
                  className="w-10 h-10 rounded-2xl
            bg-gradient-to-br from-[#6a994e]/40 to-[#4f772d]/40"
                />

                {/* ICON */}
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full bg-[#6a994e]/20 blur-xl" />
                  <div className="w-12 h-12 rounded-full bg-white/40 relative z-10" />
                </div>

                {/* TEXT */}
                <div className="space-y-2">
                  <div className="h-4 w-24 rounded-full bg-[#6a994e]/20" />
                  <div className="h-3 w-32 rounded-full bg-[#4f772d]/10" />
                </div>
              </div>

              {/* DELETE BTN */}
              <div className="w-10 h-10 rounded-2xl bg-red-100/40" />
            </div>
          ))
        ) : data?.data?.length > 0 ? (
          // ======================
          // DATA LIST
          // ======================
          data?.data?.map((item, index) => (
            <div
              key={item._id}
              className="relative flex items-center justify-between rounded-3xl py-1 px-4 
bg-white/10 backdrop-blur-2xl border border-white/20 
shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
hover:scale-[1.02] transition-all duration-300
hover:shadow-[0_0_25px_rgba(106,153,78,0.25)]"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#6a994e] to-[#4f772d] text-white font-bold">
                  {index + 1}
                </div>

                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 rounded-full blur-xl ${
                      item.walletType === "bkash"
                        ? "bg-pink-400/40"
                        : "bg-orange-400/40"
                    }`}
                  />

                  <img
                    src={item.walletType === "bkash" ? bkashIcon : nagadIcon}
                    alt="wallet"
                    className={`w-auto relative z-10 drop-shadow-lg ${
                      item.walletType === "nagad" ? "h-auto" : "h-10"
                    }`}
                  />
                </div>

                <div>
                  <p className="font-bold text-[#2f5233] capitalize">
                    {item.walletType}
                  </p>

                  <p className="text-sm font-bold text-gray-600">
                    {item.accountNumber}
                  </p>
                </div>
              </div>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(item._id)}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/20 border border-white/30 text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 transition cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          // ======================
          // EMPTY STATE
          // ======================
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

            <h2 className="text-2xl font-black text-[#2f5233]">
              কোনো নাম্বার নেই
            </h2>

            <button
              onClick={openModal}
              className="mt-3 h-11 px-6 rounded-2xl cursor-pointer
        bg-gradient-to-r from-[#6a994e] to-[#4f772d]
        text-white font-bold shadow-[0_0_20px_rgba(106,153,78,0.35)]
        hover:scale-105 transition-all duration-300"
            >
              + Add Number
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      <Modal
        title={<span className="text-[#2f5233] font-bold">Add New Number</span>}
        width={350}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* WALLET TYPE (NORMAL SECTION) */}
          <div>
            <h2 className="font-bold text-sm mb-1">Wallet Type</h2>

            <Select
              value={watch("walletType")}
              onChange={(value) => setValue("walletType", value)}
              className="w-full"
              size="large"
            >
              <Option value="bkash">bKash</Option>
              <Option value="nagad">Nagad</Option>
            </Select>
          </div>

          {/* ACCOUNT */}
          <div>
            <h2 className="font-bold text-sm mb-1">Account Number</h2>

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
                />
              )}
            />

            {errors.accountNumber && (
              <p className="text-red-500 text-sm">
                {errors.accountNumber.message}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={addLoading}
            className="h-11 w-full rounded-2xl bg-gradient-to-r from-[#6a994e] to-[#4f772d] text-white font-bold flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            {addLoading ? "Saving..." : "Add Number"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddNumber;
