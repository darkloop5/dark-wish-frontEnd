import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthData from "../../hooks/useAuthData";
import { useGetTotalSendQuery } from "../../redux/services/transaction/transactionApiService";
import bkashIcon from "../../assets/icons/bkash.svg";
import nagadIcon from "../../assets/icons/nagad.png";
import rocketIcon from "../../assets/icons/rocket.png"
import { ArrowLeft, CreditCard, TrendingUp, Wallet } from "lucide-react";
const ListTransaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthData();

  const { accountNumber, walletType } = location.state || {};

  const { data, isLoading, isError } = useGetTotalSendQuery({
    userId: user?.userId,
    accountNumber,
    walletType,
  });

  const transactions = data?.data || [];

  // ======================
  // LOADING SKELETON
  // ======================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#edf7ee] via-[#f7fff8] to-[#dcefdc] p-4 space-y-3">
        <div className="h-6 w-40 bg-white/40 rounded-xl animate-pulse" />

        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-4 bg-white/20 backdrop-blur-2xl border border-white/30 shadow-[0_0_20px_rgba(106,153,78,0.15)] animate-pulse"
          >
            <div className="h-5 w-24 bg-white/40 rounded mb-2" />
            <div className="h-4 w-32 bg-white/30 rounded mb-2" />
            <div className="h-4 w-28 bg-white/30 rounded" />
          </div>
        ))}
      </div>
    );
  }

  // ======================
  // ERROR STATE
  // ======================
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#edf7ee] via-[#f7fff8] to-[#dcefdc]">
        <p className="text-red-500 font-bold">❌ Failed to load transactions</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf7ee] via-[#f7fff8] to-[#dcefdc] p-4">
      {/* HEADER */}
      <div className="sticky top-0 z-20 h-16 flex items-center justify-center bg-white/20 backdrop-blur-3xl border-b border-white/30">
        <button 
        onClick={() => {
            navigate(-1)
        }}
         className=" shadow-xl  cursor-pointer absolute left-4 w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-[#4f772d]">
          <ArrowLeft size={22} />
        </button>

        <h1 className="text-xl font-black text-[#2f5233]">History</h1>
      </div>
      {/* INFO CARD */}
      <div className="mb-3 rounded-2xl p-4 bg-white/20 backdrop-blur-2xl border border-white/30 shadow-[0_0_20px_rgba(106,153,78,0.2)] ">
        {/* ACCOUNT */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/30">
            <CreditCard className="w-4 h-4 text-[#4f772d]" />
          </div>

          <p className="text-sm text-gray-700">
            <span className="font-bold text-[#2f5233]">Account:</span>{" "}
            {accountNumber}
          </p>
        </div>

        {/* WALLET */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/30">
            <Wallet className="w-4 h-4 text-[#4f772d]" />
          </div>

          <p className="text-sm text-gray-700">
            <span className="font-bold text-[#2f5233]">Wallet:</span>{" "}
            {walletType}
          </p>
        </div>

        {/* TOTAL SEND */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/30 relative">
            <div className="absolute inset-0 rounded-full bg-[#6a994e]/20 blur-md" />
            <TrendingUp className="w-4 h-4 text-[#2f772d] relative z-10" />
          </div>

          <p className="text-sm text-gray-700">
            <span className="font-bold text-[#2f5233]">Total Send:</span>{" "}
            <span className="text-red-500 font-bold">
              ৳ {data?.totalSend || 0}
            </span>
          </p>
        </div>
      </div>

      {/* EMPTY STATE 😢 */}
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <div className="text-6xl">🥺</div>
          <h2 className="text-lg font-bold text-[#2f5233] mt-2">
            No Transactions Found
          </h2>
          <p className="text-sm text-gray-500">এখনো কোনো ট্রানজেকশন নেই</p>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-5 py-2 rounded-2xl bg-gradient-to-r from-[#6a994e] to-[#4f772d] text-white font-bold shadow-lg hover:scale-105 transition"
          >
            Go Back
          </button>
        </div>
      ) : (
        // ======================
        // TRANSACTION LIST
        // ======================
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className="relative overflow-hidden rounded-2xl p-4 
    bg-white/20 backdrop-blur-2xl 
    border border-white/30 
    shadow-[0_0_20px_rgba(106,153,78,0.25)] 
    hover:shadow-[0_0_30px_rgba(106,153,78,0.45)] 
    transition-all duration-300"
            >
              {/* glow stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6a994e] to-[#4f772d]" />

              {/* TOP SECTION */}
              <div className="flex items-center justify-between">
                {/* LEFT - ICON + INFO */}
                <div className="flex items-center gap-3">
                  {/* ICON WITH GLOW */}
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    {/* glow background */}
                    <div
                      className={`absolute inset-0 rounded-full blur-xl opacity-60 ${
                        tx.walletType === "bkash"
                          ? "bg-pink-400/40"
                          : "bg-orange-400/40"
                      }`}
                    />

                    {/* icon */}
                   {/* icon */}
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

                  {/* TEXT */}
                  <div>
                    <h2 className="text-lg font-black text-[#2f5233]">
                      ৳ {tx.amount}
                    </h2>

                    <p className="text-base text-gray-500 font-semibold">
                      {tx.transactionType === "send_money"
                        ? "Send Money"
                        : tx.transactionType === "cash_out"
                          ? "Cash Out"
                          : "Transaction"}
                    </p>
                  </div>
                </div>

                {/* RIGHT - WALLET TYPE */}
                <div className="text-right">
                  <p className="text-xs font-bold text-[#4f772d] uppercase">
                    {tx.walletType}
                  </p>

                  <p className="text-[16px] text-gray-500 font-semibold">
                    {tx.accountNumber}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListTransaction;
