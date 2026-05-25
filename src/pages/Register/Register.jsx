import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import imgForm from "../../assets/icons/form.png";
import { useCreateUserMutation } from "../../redux/services/auth/authApiService";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await createUser(data).unwrap();
      if (res.success) {
        dispatch(
          setCredentials({
            user: res.user,
            token: res.token,
          }),
        );

        toast.success("Account Created Successfully 🚀");
        reset();

        navigate("/profile", { replace: true });
      }
    } catch (err) {
      toast.error(err?.data?.message || "Registration Failed");
    }
    console.log(data);
  };

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden

        bg-gradient-to-br
        from-[#edf7ee]
        via-[#f7fff8]
        to-[#dcefdc]

        px-5
        font-urbanist
      "
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-80px] w-96 h-96 bg-[#6a994e]/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-120px] right-[-80px] w-96 h-96 bg-[#a7c957]/20 blur-3xl rounded-full" />

      {/* GLASS SHINE */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 text-center pt-6">
        <div
          className="
            inline-flex
            items-center
            justify-center

            w-24 h-24
            rounded-[32px]

            bg-white/20
            backdrop-blur-3xl

            border border-white/30

            shadow-[0_10px_40px_rgba(106,153,78,0.22)]
          "
        >
          <div
            className="
              relative
              w-16 h-16
              rounded-2xl

     

              flex items-center justify-center
              
              text-white
              text-3xl
              font-black

              shadow-[0_10px_30px_rgba(106,153,78,0.45)]
            "
          >
            <img src={imgForm} className="w-full h-full" />
          </div>
        </div>

        <h1 className="mt-2 text-2xl font-black text-[#2f5233]">
          Create Account ✨
        </h1>
      </div>

      {/* FORM CARD */}
      <div
        className="
          relative
          z-10

          mt-3

          rounded-[38px]

          bg-white/20
          backdrop-blur-3xl

          border border-white/30

          shadow-[0_12px_60px_rgba(106,153,78,0.20)]

          overflow-hidden

          p-6
        "
      >
        {/* CARD GLOW */}
        <div className="absolute top-[-80px] left-[-60px] w-72 h-72 bg-[#6a994e]/10 blur-3xl rounded-full" />

        <div className="absolute bottom-[-80px] right-[-60px] w-72 h-72 bg-[#a7c957]/10 blur-3xl rounded-full" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 space-y-3"
        >
          {/* NAME */}
          <div>
            <input
              type="text"
              placeholder="Enter Full Name"
              {...register("name", {
                required: "Name is required",
              })}
              className="
                w-full
                h-12
                font-semibold
                rounded-2xl

                bg-white/25
                backdrop-blur-2xl

                border border-white/30

                px-5

                text-[#2f5233]
                placeholder:text-[#88a08c]

                outline-none

                shadow-[0_6px_20px_rgba(106,153,78,0.08)]

                focus:border-[#6a994e]/40
                focus:shadow-[0_0_30px_rgba(106,153,78,0.20)]

                transition-all
              "
            />

            {errors.name && (
              <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Enter Email Address"
              {...register("email", {
                required: "Email is required",
              })}
              className="
                w-full
                h-12
 font-semibold
                rounded-2xl

                bg-white/25
                backdrop-blur-2xl

                border border-white/30

                px-5

                text-[#2f5233]
                placeholder:text-[#88a08c]

                outline-none

                shadow-[0_6px_20px_rgba(106,153,78,0.08)]

                focus:border-[#6a994e]/40
                focus:shadow-[0_0_30px_rgba(106,153,78,0.20)]

                transition-all
              "
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className="
                  w-full
                  h-12
 font-semibold
                  rounded-2xl

                  bg-white/25
                  backdrop-blur-2xl

                  border border-white/30

                  px-5
                  pr-14

                  text-[#2f5233]
                  placeholder:text-[#88a08c]

                  outline-none

                  shadow-[0_6px_20px_rgba(106,153,78,0.08)]

                  focus:border-[#6a994e]/40
                  focus:shadow-[0_0_30px_rgba(106,153,78,0.20)]

                  transition-all
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2

                  text-[#6a994e]
                "
              >
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-400 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            disabled={isLoading}
            className="
              relative
              overflow-hidden

              w-full
              py-3

              rounded-2xl

              bg-gradient-to-r
              from-[#6a994e]
              to-[#4f772d]

              text-white
              font-bold
              text-lg

              shadow-[0_10px_30px_rgba(106,153,78,0.35)]
cursor-pointer
              transition-all
              duration-300

              hover:scale-[1.02]
            "
          >
            {/* SHINE */}
            <div className="absolute inset-0 bg-white/10" />

            <div className="relative z-10 flex items-center justify-center gap-2">
              {isLoading && <ImSpinner2 className="animate-spin" size={22} />}

              {isLoading ? "Creating..." : "Create Account"}
            </div>
          </button>
        </form>

        {/* FOOTER */}
        <p className="relative z-10 mt-6 text-center text-sm text-[#6f8f72]">
          Already have an account?
          <Link to="/login" className="text-[#4f772d] font-black ms-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
