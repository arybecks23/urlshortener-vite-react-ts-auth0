import { useAuth0 } from "@auth0/auth0-react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

type Props = {};

const DashboardNav = (props: Props) => {
  const { user, logout } = useAuth0();
  if (user) {
    return (
      <Disclosure as="nav" className="bg-sky-200">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <a href="/">
                      <img
                        className="h-8 w-8"
                        src="/images/logo.svg"
                        alt="Logo"
                      />
                    </a>
                  </div>
                </div>
                <div className="">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.picture}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <button
                              onClick={() =>
                                logout({
                                  returnTo: window.location.origin,
                                })
                              }
                              className={
                                "block px-4 py-2 text-sm text-gray-700"
                              }
                            >
                              Logout
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    );
  } else {
    return <></>;
  }
};

export default DashboardNav;
