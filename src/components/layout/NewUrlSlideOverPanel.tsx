import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { urlRegExp } from "../../utils/regEx";

type Props = {
  open: boolean;
  setOpen: (x: boolean) => void;
  onSubmitNewUrl: (data: NewUrlData) => void;
};
type NewUrlData = {
  url: string;
  description: string;
};
export default function NewUrlSlideOverPanel({
  open,
  setOpen,
  onSubmitNewUrl,
}: Props) {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setErrors("");
    }
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 pl-16 max-w-full right-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <form
                  className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (url === "") {
                      setErrors("URL cannot be blank");
                    } else if (!urlRegExp.test(url)) {
                      setErrors("Please enter a valid URL");
                    } else {
                      onSubmitNewUrl({
                        url: url,
                        description: description,
                      });
                      setOpen(false);
                      setUrl("");
                      setDescription("");
                    }
                  }}
                >
                  <div className="flex-1 h-0 overflow-y-auto">
                    <div className="py-6 px-4 bg-cyan-700 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">
                          New URL
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-cyan-700 rounded-md text-cyan-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-cyan-300">
                          Paste your long URL and make sure to add a description
                          for a future reference.
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="px-4 divide-y divide-gray-200 sm:px-6">
                        <div className="space-y-6 pt-6 pb-5">
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Your origin URL
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="project-name"
                                onChange={(e) => {
                                  setErrors("");
                                  setUrl(e.target.value);
                                }}
                                autoComplete="off"
                                id="project-name"
                                className="block w-full shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Description
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="description"
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="block w-full shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border border-gray-300 rounded-md"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          {/* Future feature */}
                          {/* <fieldset>
                            <legend className="text-sm font-medium text-gray-900">
                              Status
                            </legend>
                            <div className="mt-2 space-y-5">
                              <div className="relative flex items-start">
                                <div className="absolute flex items-center h-5">
                                  <input
                                    id="privacy-public"
                                    name="privacy"
                                    aria-describedby="privacy-public-description"
                                    type="radio"
                                    className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                                    defaultChecked
                                  />
                                </div>
                                <div className="pl-7 text-sm">
                                  <label
                                    htmlFor="privacy-public"
                                    className="font-medium text-gray-900"
                                  >
                                    Public access
                                  </label>
                                  <p
                                    id="privacy-public-description"
                                    className="text-gray-500"
                                  >
                                    Everyone with the link will see this
                                    project.
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div className="relative flex items-start">
                                  <div className="absolute flex items-center h-5">
                                    <input
                                      id="privacy-private-to-project"
                                      name="privacy"
                                      aria-describedby="privacy-private-to-project-description"
                                      type="radio"
                                      className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="privacy-private-to-project"
                                      className="font-medium text-gray-900"
                                    >
                                      Password protected
                                    </label>
                                    <p
                                      id="privacy-private-to-project-description"
                                      className="text-gray-500"
                                    >
                                      Only members of this project would be able
                                      to access.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset> */}
                          {errors !== "" ? (
                            <div className="rounded-md bg-red-50 p-4">
                              <div className="flex">
                                <div className="flex-shrink-0">
                                  <XCircleIcon
                                    className="h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                </div>

                                <div className="ml-3">
                                  <h3 className="text-sm font-medium text-red-800">
                                    There were some errors with your submission
                                  </h3>
                                  <div className="mt-2 text-sm text-red-700">
                                    <ul
                                      role="list"
                                      className="list-disc pl-5 space-y-1"
                                    >
                                      <li>{errors}</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
