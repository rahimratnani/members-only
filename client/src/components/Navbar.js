import { useContext } from 'react';
import { ModalContext } from '../context/modalContext.js';
import { UserContext } from '../context/userContext.js';
import useLogout from '../hooks/useLogout.js';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import MenuIcon from './../assets/icons/MenuIcon.js';
import XIcon from './../assets/icons/XIcon.js';
import ChevronRightIcon from '../assets/icons/ChevronRightIcon.js';

export default function Navbar() {
  const { setSignupModal, setLoginModal, setMembershipModal } =
    useContext(ModalContext);
  const {
    auth: { isAuth, is_member, name, email },
  } = useContext(UserContext);

  const logout = useLogout();

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Left side */}
              <div className="flex">
                {isAuth ? (
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                ) : null}
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="font-bold text-2xl text-gray-900">
                    <span className="text-indigo-500">Members</span> Only
                  </h1>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center">
                {isAuth ? (
                  <div className="flex space-x-4">
                    {!is_member ? (
                      <button
                        type="button"
                        onClick={() => setMembershipModal(true)}
                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Join Club
                      </button>
                    ) : null}

                    <button
                      type="button"
                      className="hidden relative md:inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      New Message
                    </button>
                  </div>
                ) : null}

                {!isAuth ? (
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setLoginModal(true)}
                      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Log In
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignupModal(true)}
                      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign Up
                    </button>
                  </div>
                ) : null}

                {isAuth ? (
                  <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-cente">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-white px-4 py-2 flex items-center text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Open user menu</span>
                          <p className="text-gray-900 text-sm font-medium">
                            Account
                          </p>

                          <ChevronRightIcon className="ml-3 rotate-90 text-gray-400 h-5 w-5" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="w-full">
                            <div className="py-2 mx-3">
                              <p className="text-xs text-gray-500 mb-2">
                                Signed in as
                              </p>
                              <p className="capitalize text-base font-medium truncate">
                                {name}
                              </p>
                              <p className="truncate text-sm text-gray-500">
                                {email}
                              </p>
                            </div>
                          </div>

                          <div className="w-full border-t border-gray-200">
                            <div className="py-2 mx-3">
                              <p className="text-xs text-gray-500 mb-2">
                                Membership status
                              </p>
                              <p className="capitalize text-base font-medium text-gray-900">
                                {is_member ? 'Member' : 'Not A Member'}
                              </p>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 flex justify-center items-center pt-3 pb-2">
                            <button
                              type="button"
                              onClick={() => logout()}
                              className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Log Out
                            </button>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {isAuth ? (
            <Disclosure.Panel className="md:hidden">
              <div className="p-2 ml-3">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  New Message
                </button>
              </div>

              <div className="p-2 mx-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Signed in as</p>
                  <p className="capitalize text-lg font-medium">{name}</p>
                  <p className="text-base text-gray-500">{email}</p>
                </div>
              </div>

              <div className="p-2 mx-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-2">
                    Membership status
                  </p>
                  <p className="capitalize text-base font-medium text-gray-900">
                    {is_member ? 'Member' : 'Not A Member'}
                  </p>
                </div>
              </div>

              <div className="p-2 mx-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => logout()}
                  className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log Out
                </button>
              </div>
            </Disclosure.Panel>
          ) : null}
        </>
      )}
    </Disclosure>
  );
}
