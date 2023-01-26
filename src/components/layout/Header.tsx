import { useAuth0 } from "@auth0/auth0-react";
import { Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
type Props = {};

const Header = (props: Props) => {
  const [isShowing, setIsShowing] = useState(false);
  const { loginWithRedirect } = useAuth0();

  const navigation = [
    { name: "LOG IN", onClick: () => loginWithRedirect() },
    {
      name: "SIGN UP",
      onClick: () => loginWithRedirect({ screen_hint: "signup" }),
    },
  ];

  return (
    <>
      <div className="flex flex-row w-full place-content-between items-center bg-yellow-200 p-9">
        <div>
          <a href="/">
            <img src="/images/logo.svg" alt="logo" className="h-8 w-8" />
          </a>
          {/* <span className="font-bold text-xl">Logo</span> */}
        </div>
        <div className="w-7 inline-block md:hidden ">
          <Bars3Icon onClick={() => setIsShowing((isShowing) => !isShowing)} />
        </div>
        <div className="hidden md:inline-block">
          <ul>
            {navigation.map((item) => (
              <li
                key={item.name}
                className="inline-block pl-5 pr-5 py-4 last:border-2 last:border-gray-600 ml-4"
              >
                <button onClick={item.onClick}>{item.name} </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Transition show={isShowing}>
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-80"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-80"
          leaveTo="opacity-0"
          className="fixed top-0 right-0 h-full w-full bg-gray-800 p-10 py-16 font-bold z-40 md:hidden"
          onClick={() => setIsShowing((isShowing) => !isShowing)}
        ></Transition.Child>
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="fixed top-0 left-0 h-full w-4/5 bg-white p-10 py-16 font-bold z-40 md:hidden "
        >
          <XMarkIcon
            className="absolute w-7 top-9 right-9"
            onClick={() => setIsShowing((isShowing) => !isShowing)}
          />
          <ul>
            {navigation.map((item) => (
              <li key={item.name} className="py-9 text-xl underline">
                <button onClick={item.onClick}>{item.name} </button>
              </li>
            ))}
          </ul>
        </Transition.Child>
      </Transition>
    </>
  );
};
export default Header;
