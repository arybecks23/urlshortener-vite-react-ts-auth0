import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";

type LinkData =
  | {
      _id: string;
      createdAt: string;
      shortenedUrl: string;
      originalUrl: string;
      description: string;
      clicks: number;
    }
  | undefined;

type UpdateUrlData = {
  id: string;
  description: string;
};
type DeleteURLData = {
  id: string;
};
type Props = {
  open: boolean;
  setOpen: (x: boolean) => void;
  data: LinkData | null;
  onSubmitUpdateURL: (data: UpdateUrlData) => void;
  onDeleteURL: (id: string) => void;
};

export default function EditUrlSlideOverPanel({
  open,
  setOpen,
  data = {
    _id: "",
    createdAt: "",
    shortenedUrl: "",
    originalUrl: "",
    description: "",
    clicks: 0,
  },
  onSubmitUpdateURL,
  onDeleteURL,
}: Props) {
  const [description, setDescription] = useState("");
  if (data)
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
                      onSubmitUpdateURL({
                        id: data._id,
                        description: description,
                      });
                      setOpen(false);
                      setDescription("");
                    }}
                  >
                    <div className="flex-1 h-0 overflow-y-auto">
                      <div className="py-6 px-4 bg-indigo-700 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            Edit URL
                          </Dialog.Title>
                          <div className="ml-3 h-7 flex items-center">
                            <button
                              type="button"
                              className="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300">
                            Get started by filling in the information below to
                            create your new project.
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="px-4 divide-y divide-gray-200 sm:px-6">
                          <div className="space-y-6 pt-6 pb-5">
                            <div className="px-4 py-5 sm:px-0 sm:py-0">
                              <dl className="space-y-8 sm:divide-y sm:divide-gray-200 sm:space-y-0">
                                <div className="sm:flex sm:px-0 sm:py-5 ">
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48 basis-1/3">
                                    Short URL
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                                    {data.shortenedUrl}
                                  </dd>
                                </div>
                                <div className="sm:flex sm:px-0 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48 basis-1/3">
                                    URL
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2 break-all">
                                    {data.originalUrl}
                                  </dd>
                                </div>
                                <div className="sm:flex sm:px-0 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48 basis-1/3">
                                    Clicks
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                                    <time dateTime="1982-06-23">
                                      {data.clicks}
                                    </time>
                                  </dd>
                                </div>
                                <div className="sm:flex sm:px-0 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48 basis-1/3">
                                    <label htmlFor="description">
                                      Description
                                    </label>
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2 basis-2/3">
                                    <textarea
                                      id="description"
                                      name="description"
                                      onChange={(e) =>
                                        setDescription(e.target.value)
                                      }
                                      rows={4}
                                      className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                                      defaultValue={data.description}
                                    />
                                  </dd>
                                </div>
                              </dl>
                            </div>
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
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
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
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
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
                                        Only members of this project would be
                                        able to access.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </fieldset> */}
                          </div>
                          <div className="pt-4 pb-6">
                            <div className="flex text-sm">
                              <a
                                href="#"
                                className="group inline-flex items-center font-medium text-red-600 hover:text-red-900"
                                onClick={() => onDeleteURL(data._id)}
                              >
                                <TrashIcon
                                  className="h-5 w-5 text-red-500 group-hover:text-red-900"
                                  aria-hidden="true"
                                />
                                <span className="ml-2">
                                  Permanently delete link
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
  else {
    return <></>;
  }
}
