import { Outlet, NavLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import { BiHome } from "react-icons/bi";
import { MdFormatListBulletedAdd, MdOutlinePlaylistAdd } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { LuReceipt } from "react-icons/lu";

const MainLayout = () => {
  return (
    <div
      className=" font-montserrat
        relative min-h-screen
        bg-gradient-to-br
        from-[#eef7f0]
        via-[#f7fffa]
        to-[#dff3e6]
        overflow-hidden
        flex justify-center
        md:items-center
        p-0 md:p-4
      "
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-80px] left-[-60px] w-96 h-96 bg-[#6a994e]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-[-80px] right-[-60px] w-96 h-96 bg-[#a7c957]/20 rounded-full blur-3xl pointer-events-none" />

      {/* APP FRAME */}
      <main
        className="
          relative
          w-full md:w-[400px]
          h-screen md:h-[720px]

          md:rounded-[40px]
          overflow-hidden

          bg-white/20
          backdrop-blur-3xl
          border border-white/30

          shadow-[0_10px_50px_rgba(106,153,78,0.25)]

          flex flex-col
        "
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none z-0" />

        {/* PAGE CONTENT */}
        <div
          className="
            relative
            flex-1
            overflow-y-auto
            pb-[120px]
            z-10
          "
        >
          <Outlet />
        </div>

        {/* FOOTER */}
        <div
          className="
          fixed
            bottom-5
            left-0
            w-full
            z-50

            bg-gradient-to-t
            from-[#6a994e]/10
            to-transparent

            backdrop-blur-[25px]

            px-3
            pb-3
          "
        >
          <div
            className="
              relative

              flex items-center justify-around

              py-3

              bg-white/15
              backdrop-blur-3xl

              border border-white/30

              rounded-[28px]

              shadow-[0_8px_35px_rgba(106,153,78,0.25)]

              overflow-hidden
            "
          >
            {/* INSIDE GLOW */}
            <div className="absolute -top-12 left-8 w-36 h-36 bg-[#6a994e]/20 blur-3xl rounded-full" />

            <div className="absolute -bottom-12 right-8 w-36 h-36 bg-[#a7c957]/20 blur-3xl rounded-full" />

            

            {/* BUY */}
            <NavItem
              to="/add-number"
              label="Add Number"
              icon={<MdOutlinePlaylistAdd size={20} />}
            />

           

            {/* SELL */}
            <NavItem
              to="/details"
              label="Transaction"
              icon={<TbListDetails size={20} />}
            />

             {/* HOME */}
            <NavItem
              to="/receive"
              label="Receive"
              icon={<LuReceipt  size={20} />}
            />

            {/* PROFILE */}
            <NavItem
              to="/profile"
              label="Profile"
              icon={<AiOutlineUser size={20} />}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ to, label, icon }) => {
  return (
    <NavLink
      to={to}
      className="group relative z-10 flex flex-col items-center gap-[4px]"
    >
      {({ isActive }) => (
        <>
          <div
            className={`
              relative
              w-11 h-11
              flex items-center justify-center

              border border-white/30

              transition-all duration-300

              ${
                isActive
                  ? `
                    rounded-full

                    bg-gradient-to-br
                    from-[#6a994e]
                    to-[#4f772d]

                    text-white
                    scale-110

                    shadow-[0_6px_22px_rgba(106,153,78,0.45)]
                  `
                  : `
                    rounded-2xl

                    bg-white/20
                    backdrop-blur-2xl

                    text-[#4f772d]

                    shadow-lg

                    group-hover:bg-[#6a994e]
                    group-hover:text-white
                    group-hover:scale-105
                  `
              }
            `}
          >
            {/* ICON GLOW */}
            <div className="absolute inset-0 rounded-full bg-white/10 blur-xl" />

            <span className="relative z-10">{icon}</span>
          </div>

          <span
            className={`text-[11px] font-semibold tracking-wide transition-all duration-300 ${
              isActive ? "text-[#4f772d]" : "text-[#7b9d6f]"
            }`}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default MainLayout;