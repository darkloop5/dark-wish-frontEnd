import React, { useState } from "react";
import {
  Bell,
  Clock3,
  Copy,
  Gift,
  Trophy,
  Wallet,
  CreditCard,
  LogOut,
} from "lucide-react";
import useAuthData from "../../hooks/useAuthData";
import { FiMail } from "react-icons/fi";
import { RiResetRightFill } from "react-icons/ri";
import toast from "react-hot-toast";
import { useResetUserDailyLimitMutation } from "../../redux/services/auth/authApiService";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useGetReceivedQuery } from "../../redux/services/received/ReceivedApiServices";
import { useGetUserTotalAmountQuery } from "../../redux/services/transaction/transactionApiService";
const Profile = () => {
  const [filter, setFilter] = useState("day");
  const { user } = useAuthData();
  const navigate = useNavigate();
  const [resetUserDailyLimit, { isLoading: resetLoading }] =
    useResetUserDailyLimitMutation();
  // total

  const {
    data: totalSend,
    isLoading,
    refetch,
  } = useGetUserTotalAmountQuery(user?.userId);

  
  const { data: receivedData, isLoading: totalLoading,refetch:ref } = useGetReceivedQuery(
    {
      userId: user?.userId || "",
      filter,
    },
    {
      skip: !user?.userId,
      refetchOnMountOrArgChange: true,
    },
  );
  const dispatch = useDispatch();
  const handleReset = () => {
    if (!user?.userId) {
      return toast.error("User not found");
    }

    Modal.confirm({
      title: "Are you sure?",
      content: "You want to reset daily limits?",
      centered: true,
      width: 300,
      okText: "Yes Reset",
      cancelText: "Cancel",

      okButtonProps: {
        style: {
          fontWeight: "bold",
          background: "linear-gradient(to bottom right, #6a994e, #4f772d)",
          border: "none",
          color: "white",
        },
      },

      cancelButtonProps: {
        style: {
          fontWeight: "bold",
        },
      },

      onOk: async () => {
        try {
          const res = await resetUserDailyLimit(user.userId).unwrap();

          if (res.success) {
            toast.success(res?.message || "Reset Done 🎉");
            await refetch();
            await ref
          }
        } catch (error) {
          console.log(error);
          toast.error(error?.data?.message || "Reset failed");
        }
      },
    });
  };


  const handleLogout = () => {
    console.log("tes");
    dispatch(logout()); //

    navigate("/logout");
  };
  return (
    <div
      className="
    min-h-screen
        overflow-hidden
        relative

        bg-gradient-to-br
        from-[#edf7ee]
        via-[#f7fff8]
        to-[#dcefdc]

        px-4
        py-6

        font-urbanist
      "
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-80px] w-96 h-96 bg-[#6a994e]/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-120px] right-[-80px] w-96 h-96 bg-[#a7c957]/20 blur-3xl rounded-full" />

      {/* GLASS SHINE */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

      {/* MAIN CARD */}
      <div
        className="
          relative
          z-10

          rounded-[38px]

          bg-white/20
          backdrop-blur-3xl

          border border-white/30

          shadow-[0_12px_60px_rgba(106,153,78,0.20)]

          overflow-hidden

          p-5
        "
      >
        {/* CARD GLOW */}
        <div className="absolute top-[-80px] left-[-60px] w-72 h-72 bg-[#6a994e]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-80px] right-[-60px] w-72 h-72 bg-[#a7c957]/10 blur-3xl rounded-full" />
        {/* TOP HEADER */}
        <div className="relative z-10 flex items-center justify-between">
          <h1 className="text-xl font-black text-[#2f5233]">My Profile</h1>

          <div className="flex items-center gap-3">
            {/* CLOCK */}
            <button
              className="
                relative

                w-12 h-12
                rounded-2xl

                bg-white/25
                backdrop-blur-2xl

                border border-white/30

                flex items-center justify-center

                shadow-[0_6px_20px_rgba(106,153,78,0.12)]
              "
            >
              <Clock3 size={22} className="text-[#4f772d]" />
            </button>

            {/* NOTIFICATION */}
            <button
              className="
                relative

                w-12 h-12
                rounded-2xl

                bg-white/25
                backdrop-blur-2xl

                border border-white/30

                flex items-center justify-center

                shadow-[0_6px_20px_rgba(106,153,78,0.12)]
              "
            >
              <Bell size={22} className="text-[#4f772d]" />

              <div
                className="
                  absolute
                  -top-1
                  -right-1

                  w-5 h-5
                  rounded-full

                  bg-[#6a994e]

                  text-white
                  text-[10px]
                  font-bold

                  flex items-center justify-center

                  shadow-[0_0_20px_rgba(106,153,78,0.6)]
                "
              >
                1
              </div>
            </button>
          </div>
        </div>
        {/* PROFILE SECTION */}
        <div className="relative z-10 flex items-center gap-4 mt-2">
          {/* IMAGE */}
          <div className="relative">
            <div
              className="
                w-24 h-24
                rounded-full

                p-[3px]

                bg-gradient-to-br
                from-[#6a994e]
                to-[#a7c957]

                shadow-[0_10px_30px_rgba(106,153,78,0.30)]
              "
            >
              <img
                src="https://i.ibb.co.com/2YFZpXGc/473e889a-f4ec-4f21-a9c6-1387c3e9c10.jpg"
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            {/* ONLINE DOT */}
            <div
              className="
                absolute
                bottom-1
                right-1

                w-5 h-5
                rounded-full

                bg-[#6a994e]

                border-2 border-white

                shadow-[0_0_20px_rgba(106,153,78,0.8)]
              "
            />
          </div>

          {/* USER INFO */}
          <div>
            {/* LEVEL */}

            <h2 className="mt-2 text-2xl font-black text-[#2f5233]">
              {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}
            </h2>

            <h2 className=" text-base font-semibold text-[#2f5233] flex items-center gap-2">
              <FiMail size={20} /> {user?.email}
            </h2>
          </div>
        </div>
        {/* BALANCE CARD */}
        <div
          className="
            relative
            z-10

            mt-3

            rounded-[18px]

            bg-gradient-to-br
            from-[#ffffff20]
            to-[#ffffff10]

            backdrop-blur-3xl

            border border-white/20

            shadow-[0_10px_40px_rgba(106,153,78,0.15)]

            p-4
          "
        >
          {/* INNER GLOW */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-[#6a994e]/10 blur-3xl rounded-full" />
          <div className="flex justify-between   ">
            <div className="">
              <p className="text-[#6f8f72] font-semibold">Today Received</p>
              <div className="flex items-center justify-between ">
                <h1 className="text-xl font-black text-red-500">
                  ৳ {receivedData?.totalAmount || 0}
                </h1>
              </div>{" "}
            </div>{" "}
            <div>
              <p className="text-[#6f8f72] font-semibold"> Today Send </p>
              <div className="flex items-center justify-between ">
                <h1 className="text-xl font-black text-red-500">
                  ৳ {totalSend?.totalAmount}
                </h1>
              </div>{" "}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            disabled={resetLoading}
            onClick={handleReset}
            className="h-11 cursor-pointer px-12 w-full mt-2  rounded-2xl bg-gradient-to-r from-[#6a994e] to-[#4f772d] text-white font-bold flex items-center justify-center gap-2 disabled:opacity-70 "
          >
            <RiResetRightFill size={20} />{" "}
            {resetLoading ? "Resetting..." : "Reset"}
          </button>
        </div>
        {/* MENU GRID */}
        {/* <div className="relative flex justify-between mt-3">
          {[
            {
              icon: Wallet,
              title: "Number",
              url: "/add-number"
            },
            {
              icon: Gift,
              title: "Offers",
              url: "details"
            },
            {
              icon: CreditCard,
              title: "Payouts",
            },
          ].map((item, index) => (
            <div
            onClick={() => {
              navigate(item?.url)
            }}
              key={index}
              className="
                group
            cursor-pointer
                rounded-[28px]

                bg-white/20
                backdrop-blur-2xl

                border border-white/30

                shadow-[0_10px_30px_rgba(106,153,78,0.12)]

                p-4

            hover:-translate-y-1
                hover:shadow-[0_15px_35px_rgba(106,153,78,0.22)]

                transition-all
              "
            >
              <div
                className="
                  w-10 h-10
                  mx-auto

                  rounded-2xl

                  bg-gradient-to-br
                  from-[#6a994e]
                  to-[#4f772d]

                  flex items-center justify-center

                  shadow-[0_10px_30px_rgba(106,153,78,0.30)]
                "
              >
                <item.icon size={24} className="text-white" />
              </div>

              <p className="mt-3 text-sm font-bold text-[#2f5233]">
                {item.title}
              </p>
            </div>
          ))}
        </div> */}
        <button
          onClick={handleLogout}
          onClick={handleLogout}
          className="relative z-50 h-11 cursor-pointer px-12 w-full mt-4 rounded-2xl 
  bg-gradient-to-r from-red-500 to-red-700 
  text-white font-bold flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
